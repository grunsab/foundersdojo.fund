import { createHash } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const SOURCE_FILE = path.join(
  repoRoot,
  "content library",
  "Squarespace-Wordpress-Export-04-22-2026.xml"
);
const OUTPUT_FILE = path.join(repoRoot, "lib", "generated", "squarespace-import.json");
const MEDIA_DIR = path.join(repoRoot, "public", "media", "squarespace");

const PUBLIC_PAGE_TITLES = new Set([
  "Home",
  "Dojo Lake Tahoe",
  "Dojo San Francisco",
  "Our Community",
  "Dojo Start Up Program",
  "Our Vision",
  "Decentralization Initiative",
  "Community Initiatives",
  "Dojo Las Vegas"
]);

const EXCLUDED_PUBLIC_TITLES = new Set(["Web Site Terms and Conditions of Use"]);

const NAMED_ENTITIES = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"'
};

function decodeHtml(value) {
  return value.replace(/&(#x?[0-9a-fA-F]+|\w+);/g, (_, entity) => {
    if (entity[0] === "#") {
      const raw = entity[1]?.toLowerCase() === "x" ? entity.slice(2) : entity.slice(1);
      const codePoint = Number.parseInt(raw, entity[1]?.toLowerCase() === "x" ? 16 : 10);

      if (Number.isFinite(codePoint)) {
        return String.fromCodePoint(codePoint);
      }

      return _;
    }

    return NAMED_ENTITIES[entity] ?? _;
  });
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function cleanInlineHtml(value) {
  return decodeHtml(
    value
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|section|article|h[1-6])>/gi, "\n")
      .replace(/<li[^>]*>/gi, "- ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function extractTag(item, tagName) {
  const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = item.match(new RegExp(`<${escaped}>([\\s\\S]*?)</${escaped}>`));
  return match ? decodeHtml(match[1].trim()) : "";
}

function extractCdataTag(item, tagName) {
  const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = item.match(
    new RegExp(`<${escaped}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${escaped}>`)
  );
  return match ? match[1].trim() : "";
}

function extractBlocks(html) {
  const tokenPattern = /<(h[1-6]|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const paragraphs = [];
  const headings = [];
  const sections = [];
  let currentSection = {
    heading: "Intro",
    level: 0,
    body: []
  };

  for (const match of html.matchAll(tokenPattern)) {
    const tagName = match[1].toLowerCase();
    const text = cleanInlineHtml(match[2]);

    if (!text) {
      continue;
    }

    if (tagName.startsWith("h")) {
      headings.push(text);

      if (currentSection.heading || currentSection.body.length > 0) {
        sections.push(currentSection);
      }

      currentSection = {
        heading: text,
        level: Number.parseInt(tagName.slice(1), 10),
        body: []
      };
      continue;
    }

    paragraphs.push(text);
    currentSection.body.push(text);
  }

  if (currentSection.heading || currentSection.body.length > 0) {
    sections.push(currentSection);
  }

  const filteredSections = sections.filter((section) => {
    if (section.heading === "Intro") {
      return section.body.length > 0;
    }

    return section.heading || section.body.length > 0;
  });

  return { headings, paragraphs, sections: filteredSections };
}

function extractLinks(html) {
  const links = [];
  const linkPattern = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;

  for (const match of html.matchAll(linkPattern)) {
    const href = decodeHtml(match[1].trim());
    const label = cleanInlineHtml(match[2]);

    if (!href) {
      continue;
    }

    links.push({
      href,
      label: label || href
    });
  }

  return dedupeBy(links, (link) => `${link.href}|${link.label}`);
}

function looksLikeImageUrl(url) {
  return /images\.squarespace-cdn\.com/i.test(url) || /\.(avif|gif|jpe?g|png|svg|webp)(\?|$)/i.test(url);
}

function normalizeImageUrl(url) {
  const cleaned = decodeHtml(url)
    .replace(/&quot;/g, "")
    .replace(/["']/g, "")
    .replace(/[),;]+$/g, "")
    .replace(/\?.*$/g, "")
    .trim();

  if (!looksLikeImageUrl(cleaned)) {
    return "";
  }

  return cleaned.replace(/^http:\/\//i, "https://");
}

function extractImages(value) {
  const urls = value.match(/https?:\/\/[^\s"'<>]+/g) ?? [];
  const images = [];

  for (const url of urls) {
    const normalized = normalizeImageUrl(url);

    if (normalized) {
      images.push(normalized);
    }
  }

  return dedupeBy(images, (value) => value);
}

function dedupeBy(values, keySelector) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    const key = keySelector(value);

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(value);
  }

  return result;
}

function buildAltText(fileBaseName, sourceTitle) {
  const cleanedBase = fileBaseName
    .replace(/\+/g, " ")
    .replace(/[_-]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  return `${cleanedBase || "Archive photo"} from ${sourceTitle}`;
}

function buildImageRecord(url, sourceTitle) {
  const imageUrl = new URL(url);
  const decodedBaseName = decodeURIComponent(path.basename(imageUrl.pathname));
  const extension = path.extname(decodedBaseName).toLowerCase() || ".jpg";
  const nameWithoutExtension = decodedBaseName.slice(0, Math.max(decodedBaseName.length - extension.length, 1));
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 12);
  const safeBaseName = slugify(nameWithoutExtension) || "archive-image";
  const fileName = `${hash}-${safeBaseName}${extension}`;

  return {
    id: hash,
    sourceUrl: url,
    fileName,
    alt: buildAltText(nameWithoutExtension, sourceTitle),
    localPath: `/media/squarespace/${fileName}`
  };
}

async function fileExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function downloadImage(asset) {
  const outputPath = path.join(MEDIA_DIR, asset.fileName);

  if (await fileExists(outputPath)) {
    return { ...asset, downloaded: false };
  }

  const response = await fetch(asset.sourceUrl, {
    headers: {
      "user-agent": "foundersdojo-fund-importer"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${asset.sourceUrl}: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await writeFile(outputPath, Buffer.from(arrayBuffer));

  return { ...asset, downloaded: true };
}

async function main() {
  await mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await mkdir(MEDIA_DIR, { recursive: true });

  const xml = await readFile(SOURCE_FILE, "utf8");
  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  const imageRegistry = new Map();
  const items = [];

  for (const itemXml of itemMatches) {
    const title = extractTag(itemXml, "title");
    const type = extractTag(itemXml, "wp:post_type");
    const slug = PUBLIC_PAGE_TITLES.has(title)
      ? slugify(title)
      : extractTag(itemXml, "wp:post_name") || slugify(title);
    const author = extractCdataTag(itemXml, "dc:creator") || extractCdataTag(itemXml, "wp:post_author");
    const rawHtml = extractCdataTag(itemXml, "content:encoded");
    const { headings, paragraphs, sections } = extractBlocks(rawHtml);
    const links = extractLinks(rawHtml);
    const images = extractImages(`${rawHtml}\n${itemXml}`).map((url) => {
      if (!imageRegistry.has(url)) {
        imageRegistry.set(url, buildImageRecord(url, title || "Founder's Dojo Fund"));
      }

      return imageRegistry.get(url);
    });
    const excerpt = paragraphs.slice(0, 2).join(" ").trim();
    const includePublic =
      type === "page" && PUBLIC_PAGE_TITLES.has(title) && !EXCLUDED_PUBLIC_TITLES.has(title);
    const isFillerPost =
      type === "post" && /^Blog Post Title/i.test(slug || "") && excerpt.includes("Confidence doesn't always arrive");

    items.push({
      id: createHash("sha1").update(`${type}:${slug}:${title}`).digest("hex").slice(0, 12),
      title,
      slug,
      type,
      author,
      includePublic,
      isFillerPost,
      excerpt,
      headings,
      paragraphs,
      sections,
      links,
      images: images.map((image) => ({
        id: image.id,
        localPath: image.localPath,
        alt: image.alt,
        fileName: image.fileName,
        sourceUrl: image.sourceUrl
      }))
    });
  }

  const downloadFailures = [];
  const downloadedImages = [];

  for (const asset of imageRegistry.values()) {
    try {
      const result = await downloadImage(asset);
      downloadedImages.push({
        id: result.id,
        localPath: result.localPath,
        alt: result.alt,
        fileName: result.fileName,
        sourceUrl: result.sourceUrl
      });
    } catch (error) {
      downloadFailures.push({
        sourceUrl: asset.sourceUrl,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  const summary = {
    itemCount: items.length,
    pageCount: items.filter((item) => item.type === "page").length,
    postCount: items.filter((item) => item.type === "post").length,
    attachmentCount: items.filter((item) => item.type === "attachment").length,
    publicPageCount: items.filter((item) => item.includePublic).length,
    imageCount: imageRegistry.size,
    downloadedImageCount: downloadedImages.length,
    failedImageCount: downloadFailures.length
  };

  const payload = {
    sourceFile: path.relative(repoRoot, SOURCE_FILE),
    generatedAt: new Date().toISOString(),
    summary,
    publicPageOrder: items.filter((item) => item.includePublic).map((item) => item.slug),
    items,
    allImages: downloadedImages,
    downloadFailures
  };

  await writeFile(OUTPUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(
    `Imported ${summary.itemCount} items, downloaded ${summary.downloadedImageCount}/${summary.imageCount} images.`
  );

  if (downloadFailures.length > 0) {
    console.warn(`Image download failures: ${downloadFailures.length}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
