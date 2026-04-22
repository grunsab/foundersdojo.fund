import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImageMosaic } from "../../components/image-mosaic";
import { PageHero } from "../../components/page-hero";
import { SectionHeading } from "../../components/section-heading";
import { SiteShell } from "../../components/site-shell";
import { siteContent } from "../../lib/site-content";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Community proof for Founder's Dojo Fund: company outcomes, South Park history, and the people-and-place context behind the residency."
};

export default function CommunityPage() {
  const content = siteContent.community;

  return (
    <SiteShell currentPath="/community">
      <PageHero {...content.hero} />

      <section className="section">
        <SectionHeading
          eyebrow="About the network"
          title="The community page in the export is the clearest statement of proof."
        />

        <div className="stack">
          {content.aboutParagraphs.map((paragraph) => (
            <p className="supporting-copy" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Selected outcomes"
          title="Companies and platforms that show the pattern."
        />

        <div className="card-grid">
          {content.companies.map((company) => (
            <a
              className="content-card project-card card-link"
              href={company.href}
              key={company.title}
              rel="noreferrer"
              target="_blank"
            >
              <p className="card-eyebrow">{company.category}</p>
              <h3>{company.title}</h3>
              <p>{company.body}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="History"
          title="A South Park office, a free-desk experiment, then a durable founder orbit."
        />

        <div className="stack">
          {content.historyParagraphs.map((paragraph) => (
            <p className="supporting-copy" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="The Dojo story"
          title="Programs, places, and themes that still shape the Fund."
        />

        <div className="card-grid">
          {content.archivePages.map((page) => (
            <Link className="page-card" href={page.href} key={page.title}>
              {page.image ? (
                <div className="page-card-image">
                  <Image alt={page.image.alt} fill sizes="(max-width: 900px) 100vw, 33vw" src={page.image.localPath} />
                </div>
              ) : null}
              <div className="page-card-copy">
                <h3>{page.title}</h3>
                <p>{page.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" id="archive-gallery">
        <SectionHeading
          eyebrow="Community gallery"
          title="A visual record of how the Dojo has operated in the world."
        />

        <ImageMosaic images={content.gallery} showCaptions />
      </section>

      <section className="section founder-section">
        <div className="cta-card">
          <p className="eyebrow">Why this page exists</p>
          <h2>{content.cta.title}</h2>
          <p>{content.cta.body}</p>
          <div className="hero-actions">
            {content.cta.actions.map((action) => (
              <Link className="button button-primary" href={action.href} key={action.href}>
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
