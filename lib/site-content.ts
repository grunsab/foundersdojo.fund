import importedContent from "./generated/squarespace-import.json";

export type NavItem = {
  href: string;
  label: string;
};

export type ActionLink = {
  external?: boolean;
  href: string;
  label: string;
};

export type ImportedItem = (typeof importedContent)["items"][number];
export type ImportedImage = (typeof importedContent)["allImages"][number];

type Stat = {
  label: string;
  value: string;
};

type SimpleCard = {
  body: string;
  eyebrow?: string;
  title: string;
};

type CompanyCard = {
  body: string;
  category: string;
  href?: string;
  title: string;
};

type PageCard = {
  body: string;
  href: string;
  image?: ImportedImage;
  title: string;
};

type LocationCard = {
  badge: string;
  body: string;
  images: ImportedImage[];
  title: string;
};

type PartnerCard = {
  body: string;
  highlights: Stat[];
  links: ActionLink[];
  role: string;
  supporting: string;
  title: string;
};

function normalizeBrandCopy(value: string) {
  return value
    .replace(/\bFounders Dojo\b(?! Fund)/g, "Founder's Dojo Fund")
    .replace(/\bFounder'?s Dojo\b(?! Fund)/g, "Founder's Dojo Fund")
    .replace(/\bFounder’s Dojo\b(?! Fund)/g, "Founder's Dojo Fund")
    .replace(/\bfounding organization for this leading decentralization and blockchain advocacy organization\./i, "a founding force behind this leading decentralization and blockchain advocacy organization.")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function getImportedItem(slug: string) {
  const item = importedContent.items.find((candidate) => candidate.slug === slug);

  if (!item) {
    throw new Error(`Missing imported content item for slug: ${slug}`);
  }

  return item;
}

function getSection(item: ImportedItem, heading: string) {
  return item.sections.find((section) => section.heading === heading);
}

function getLink(item: ImportedItem, domainFragment: string) {
  return item.links.find((link) => link.href.includes(domainFragment))?.href;
}

function dedupeImages(images: ImportedImage[]) {
  const seen = new Set<string>();

  return images.filter((image) => {
    if (seen.has(image.id)) {
      return false;
    }

    seen.add(image.id);
    return true;
  });
}

function fallbackExcerpt(slug: string) {
  if (slug === "our-vision") {
    return "The visual material around the Dojo now supports the Fund's broader story about place, ambition, and the kind of builders it wants close.";
  }

  return "";
}

const homeSource = getImportedItem("home");
const startupSource = getImportedItem("dojo-start-up-program");
const communitySource = getImportedItem("our-community");
const sfSource = getImportedItem("dojo-san-francisco");
const tahoeSource = getImportedItem("dojo-lake-tahoe");
const vegasSource = getImportedItem("dojo-las-vegas");
const visionSource = getImportedItem("our-vision");
const decentralizationSource = getImportedItem("decentralization-initiative");
const communityInitiativesSource = getImportedItem("community-initiatives");

const publicArchivePages = importedContent.publicPageOrder.map((slug) => getImportedItem(slug));
const publicArchiveImages = dedupeImages(publicArchivePages.flatMap((page) => page.images));
const homeBridgeImage = homeSource.images[0];
const sfHeroImage = sfSource.images[2] ?? sfSource.images[0];
const communityHeroImage = communitySource.images[4] ?? communitySource.images[0];
const initiativesHeroImage = communityInitiativesSource.images[0] ?? decentralizationSource.images[0];

const companyCards: CompanyCard[] = [
  {
    title: "Native Co",
    category: "DTC exit",
    body: "The Dojo orbit helped shape Native Co before its sale to Procter & Gamble in a $100M outcome.",
    href: getLink(communitySource, "nativecos.com")
  },
  {
    title: "Akash",
    category: "Decentralized infrastructure",
    body: "Akash appears in the Dojo story as a category-defining decentralized cloud project with value measured above the billion-dollar mark.",
    href: getLink(communitySource, "akash.network")
  },
  {
    title: "Scout Monitoring",
    category: "Developer tooling",
    body: "Scout Monitoring is described as a leading distributed monitoring system that later sold to SolarWinds.",
    href: getLink(communitySource, "scoutapm.com")
  },
  {
    title: "Linjer",
    category: "Global consumer brand",
    body: "The Dojo story positions Linjer as a leading global fashion brand and one of the largest DTC operators in its category across the Pacific Rim.",
    href: getLink(communitySource, "linjer.co")
  },
  {
    title: "The Hustle",
    category: "Media exit",
    body: "The Hustle shows the Dojo's range beyond software, with the company eventually selling to HubSpot.",
    href: getLink(communitySource, "thehustle.co")
  },
  {
    title: "Quantstamp",
    category: "Web3 security",
    body: "Quantstamp appears across the community and decentralization material as proof that the Dojo has long been close to the open internet and security stack.",
    href: getLink(communitySource, "quantstamp.com")
  },
  {
    title: "TalkDoc",
    category: "Healthcare infrastructure",
    body: "TalkDoc is framed as a fast-growing mental tele-healthcare platform focused on expanding access to care.",
    href: getLink(communitySource, "talkdoc.com")
  },
  {
    title: "Product Hunt",
    category: "Early support",
    body: "Product Hunt was not founded in the Dojo, but the network supported Ryan Hoover's platform early and closely.",
    href: getLink(communitySource, "producthunt.com")
  }
];

const archivePageRoutes: Record<string, string> = {
  home: "/",
  "dojo-start-up-program": "/residency",
  "our-community": "/community",
  "dojo-san-francisco": "/locations",
  "dojo-lake-tahoe": "/locations",
  "dojo-las-vegas": "/locations",
  "decentralization-initiative": "/initiatives",
  "community-initiatives": "/initiatives",
  "our-vision": "/community"
};

const archivePageCards: PageCard[] = publicArchivePages.map((page) => ({
  title: page.title,
  href: archivePageRoutes[page.slug] ?? "/community",
  body: normalizeBrandCopy(page.excerpt || fallbackExcerpt(page.slug)),
  image: page.images[0]
}));

const partnerCards: PartnerCard[] = [
  {
    title: "David Grossblatt",
    role: "Managing partner",
    body:
      "Grossblatt built the original South Park Dojo environment and the operating culture behind it: keep unusual founders close, remove unnecessary drag, and let strong people create leverage together.",
    supporting:
      "That history still shapes the Fund's taste today, from the free-desk origin story to the companies, initiatives, and spaces that define what kind of founder community the partners want to build around.",
    highlights: [
      { label: "Original base", value: "South Park, 2008" },
      { label: "Operating edge", value: "Network and founder taste" },
      { label: "Public profile", value: "The Hustle feature" }
    ],
    links: [
      {
        href: "https://thehustle.co/the-real-erlich-bachman-of-silicon-valley/",
        label: "Read David's profile",
        external: true
      }
    ]
  },
  {
    title: "Rishi Sachdev",
    role: "Managing partner",
    body:
      "Sachdev brings operator, technical, and healthcare infrastructure depth to the Fund, spanning TalkDoc, Rooster, engineering leadership, and a staffing platform tied to $100MM gross revenue, $20MM revenue (post-paying clinicians), and care access for hundreds of thousands of incarcerated patients.",
    supporting:
      "That mix matters for the residency: the Fund is not designed as passive programming. It is built for direct partner involvement on product, growth, capital, hiring, and execution with founders who already have something real working.",
    highlights: [
      { label: "TalkDoc", value: "$1.8MM peak ARR" },
      { label: "Rooster", value: "Technical co-founder" },
      { label: "Healthcare platform", value: "$100MM gross / $20MM post-paying clinicians" }
    ],
    links: [
      {
        href: "https://www.talkdoc.com/about",
        label: "View TalkDoc",
        external: true
      },
      {
        href: "https://rishisachdev.net/",
        label: "View Rishi profile",
        external: true
      }
    ]
  }
];

const locationCards: LocationCard[] = [
  {
    title: "San Francisco",
    badge: "Residency base",
    body:
      "San Francisco is the active home of the residency program, with the first batch starting June 1, 2026. The Dojo story points to a 10,000-square-foot work and event environment with views, gathering space, and enough density to keep founders in the room with each other.",
    images: sfSource.images.slice(0, 4)
  },
  {
    title: "Lake Tahoe",
    badge: "Sprint and reset",
    body: normalizeBrandCopy(
      `${tahoeSource.excerpt} It is part of the current footprint for off-sites, heads-down sprints, and sharper working sessions away from the city.`
    ),
    images: tahoeSource.images.slice(0, 1)
  },
  {
    title: "Las Vegas",
    badge: "Experience and convening",
    body: normalizeBrandCopy(
      `${vegasSource.excerpt} We present it as part of the Fund's current broader footprint: a place for high-energy convenings, brand moments, and founder collisions around culture, risk, and hospitality.`
    ),
    images: vegasSource.images.slice(0, 1)
  }
];

const initiativeCards: CompanyCard[] = [
  {
    title: "Manifest Network",
    category: "Decentralization",
    body:
      "Manifest Network sits alongside Akash and Quantstamp as part of the Dojo's long-running commitment to decentralized infrastructure.",
    href: getLink(decentralizationSource, "manifest.network")
  },
  {
    title: "Akash",
    category: "Decentralization",
    body:
      "Akash stands as proof that the Dojo does not just admire open systems in theory; it has worked close to category builders inside that movement.",
    href: getLink(decentralizationSource, "akash.network")
  },
  {
    title: "Quantstamp",
    category: "Decentralization",
    body:
      "Quantstamp reinforces the Fund's bias toward security, open internet infrastructure, and technically serious founders.",
    href: getLink(decentralizationSource, "quantstamp.com")
  },
  {
    title: "Blockchain Advocacy Coalition",
    category: "Policy",
    body:
      "The community initiatives material describes the Dojo network as a founding force behind BAC's work on blockchain and decentralization policy in California, Wyoming, and Washington, D.C.",
    href: getLink(communityInitiativesSource, "blockadvocacy.org")
  },
  {
    title: "Open Door Legal",
    category: "Public-interest scale",
    body:
      "Open Door Legal appears as a long-running Dojo project and one of the clearest examples of impact-oriented work that still has operating rigor behind it.",
    href: getLink(communityInitiativesSource, "opendoorlegal.org")
  },
  {
    title: "Lincoln University",
    category: "Institutional partnership",
    body:
      "The Dojo material ties the network to mentorship, program development, and broader community engagement with Lincoln University in Oakland.",
    href: getLink(communityInitiativesSource, "lincolnuca.edu")
  }
];

const footerStats: Stat[] = [
  { label: "First batch", value: "June 1, 2026" },
  { label: "Batch size", value: "6 companies" },
  { label: "Cadence", value: "Every 2 months" },
  { label: "Residency", value: "2 months in SF" },
  { label: "Economics", value: "2% + syndication" }
];

export const brand = {
  name: "Founder's Dojo Fund",
  domain: "foundersdojo.fund"
} as const;

export const navigation: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/residency", label: "Residency" },
  { href: "/community", label: "Community" },
  { href: "/locations", label: "Locations" },
  { href: "/initiatives", label: "Initiatives" }
];

export const footerText =
  "Founder's Dojo Fund is a residency-led platform run by David Grossblatt and Rishi Sachdev, using the Dojo's history, current footprint, and operating network to help already-working companies scale into much larger impact.";

export const siteContent = {
  footerStats,
  home: {
    hero: {
      eyebrow: "Batches every two months. First batch starts June 1, 2026.",
      title: "A San Francisco residency program for founders already creating real outcomes.",
      description:
        "Founder's Dojo Fund is building a recurring San Francisco residency program for early-stage companies that already have traction, real impact, and clear leverage if the right operators, investors, advisors, and peers get deeply involved. Batches begin every two months, starting with a six-company inaugural batch on June 1, 2026.",
      image: sfHeroImage,
      panelTitle: "What accepted founders get",
      panelBody:
        "Each batch brings founders to San Francisco for two months with free stay, free office space, a stipend, and intensive mentorship from industry leaders, exited founders, respected venture capitalists, and angel investors. The Fund takes 2 percent, works closely during the program, and plans to syndicate every company after graduation.",
      panelItems: footerStats,
      actions: [
        { href: "/residency", label: "See the residency" },
        { href: "/community", label: "See the proof" }
      ] satisfies ActionLink[]
    },
    storyHeading: {
      eyebrow: "Why this works",
      title: "The Dojo already knows how to gather the right people around ambitious companies.",
      description:
        "The older Dojo material points to four useful truths: the network started in South Park in 2008, it kept unusual founders close to one another, it accumulated real outcomes across companies and initiatives, and San Francisco remains the right place to run intense two-month batches."
    },
    storyParagraphs: [
      normalizeBrandCopy(homeSource.paragraphs[0]),
      "The older startup-program language supplied the clearer operator frame: connect capital, talent, and wisdom to accomplish the amazing. The Fund now turns that into a more specific offer for founders who already have something working and need sharper leverage to scale."
    ],
    originCards: [
      {
        eyebrow: "Origin",
        title: "South Park, free desks, high talent density",
        body: normalizeBrandCopy(getSection(communitySource, "History")?.body[0] ?? "")
      },
      {
        eyebrow: "Operating model",
        title: "Capital, talent, and wisdom in one room",
        body: normalizeBrandCopy(startupSource.sections[1]?.body[0] ?? "")
      },
      {
        eyebrow: "Current shape",
        title: "Residency first, proof behind it",
        body: "The Fund now uses that history as an advantage: six companies at a time, two months in San Francisco, direct partner involvement, and a network that already understands how to help founders move faster."
      }
    ] satisfies SimpleCard[],
    residencyCards: [
      {
        eyebrow: "Included",
        title: "Free stay, free office space, stipend",
        body: "The residency removes living and workspace friction so founders can spend the two-month residency building instead of solving logistics."
      },
      {
        eyebrow: "Mentorship",
        title: "Operators, founders, VCs, and angels with real weight",
        body: "The program is built around direct access to people who have actually built, exited, invested, and helped companies scale."
      },
      {
        eyebrow: "Alignment",
        title: "2 percent, full-team support, syndication after graduation",
        body: "The economics are intentionally simple: tight alignment during the residency, then continued backing through the fund when the company earns it."
      }
    ] satisfies SimpleCard[],
    companies: companyCards.slice(0, 6),
    routeCards: [
      {
        title: "Residency",
        href: "/residency",
        body: "Program structure, founder fit, economics, and what founders actually receive during the two-month residency.",
        image: sfSource.images[1]
      },
      {
        title: "Community",
        href: "/community",
        body: "Company outcomes, South Park history, and the people-and-place context that make the residency credible.",
        image: communitySource.images[3]
      },
      {
        title: "Locations",
        href: "/locations",
        body: "San Francisco as the residency base, plus Tahoe and Las Vegas as part of the current footprint.",
        image: tahoeSource.images[0]
      },
      {
        title: "Initiatives",
        href: "/initiatives",
        body: "Decentralization, advocacy, nonprofit work, and the impact-oriented edge that shapes the Fund's taste.",
        image: initiativesHeroImage
      }
    ] satisfies PageCard[],
    footprintCards: locationCards,
    initiativeCards: initiativeCards.slice(0, 3),
    gallery: dedupeImages([
      homeBridgeImage,
      ...sfSource.images.slice(0, 2),
      ...communitySource.images.slice(0, 3),
      ...visionSource.images.slice(0, 1)
    ]),
    partners: partnerCards,
    quote: {
      text:
        startupSource.sections.find((section) => section.heading.includes("collaborative, start-up"))
          ?.heading ?? "It's a collaborative, start-up community and home to superstars who do amazing things.",
      attribution:
        startupSource.sections.find((section) => section.heading.includes("collaborative, start-up"))
          ?.body[0] ?? "Ryan Hoover, Founder of Product Hunt"
    },
    cta: {
      title: "The Fund is looking for companies that already matter and are ready to compound much faster.",
      body:
        "The right team already has outcomes on the board. The residency exists to compress the next stage of company building, not to create generic startup theater.",
      actions: [
        { href: "/residency", label: "Review founder fit" },
        { href: "/locations", label: "See the footprint" }
      ] satisfies ActionLink[]
    }
  },
  residency: {
    hero: {
      eyebrow: "Main program",
      title: "The Founder's Dojo Fund Residency",
      description:
        "The main program is a recurring two-month San Francisco residency with batches that begin every two months, starting with six companies on June 1, 2026. It is designed for founders who already have meaningful traction or impact and need sharper leverage across product, distribution, hiring, capital, positioning, and network access.",
      image: sfSource.images[0],
      panelTitle: "Residency terms",
      panelBody:
        "6 companies per batch. 2 months in San Francisco. Batches start every two months. Free stay. Free office space. Stipend. Intensive mentorship. 2 percent economics. Post-program syndication through the Fund.",
      panelItems: footerStats,
      actions: [
        { href: "/locations", label: "See the SF base" },
        { href: "/community", label: "See the proof" }
      ] satisfies ActionLink[]
    },
    offerCards: [
      {
        eyebrow: "Environment",
        title: "San Francisco with no operating drag",
        body: "Housing, office space, and a stipend are part of the program so founders can spend the full two-month residency in a tighter loop of work, feedback, and momentum."
      },
      {
        eyebrow: "Mentor access",
        title: "Industry leaders, exited founders, VCs, and angels",
        body: "The advisory layer is meant to be useful in practice, not ornamental. Founders should expect hard feedback, specific introductions, and decision-shaping context."
      },
      {
        eyebrow: "Fund model",
        title: "2 percent for concentrated help and long-term alignment",
        body: "The economics are intentionally lean because the Fund wants to keep backing companies after the residency instead of treating the two-month program as the end of the relationship."
      }
    ] satisfies SimpleCard[],
    founderFit: [
      {
        eyebrow: "Traction",
        title: "Already producing outcomes",
        body: "The best fit already has revenue, adoption, customer pull, distribution proof, or another credible signal that the company is working."
      },
      {
        eyebrow: "Impact",
        title: "Already making a decent dent",
        body: "The target founder can point to people, systems, or markets that are materially better because the company already exists."
      },
      {
        eyebrow: "Scale",
        title: "Ready for the next order of magnitude",
        body: "The residency is built for founders who need leverage, not generic startup encouragement."
      },
      {
        eyebrow: "Tempo",
        title: "Able to use pressure well",
        body: "A two-month residency only works if the team is ready for concentrated conversation, rapid iteration, and honest operator feedback."
      },
      {
        eyebrow: "Partner fit",
        title: "A company the partners can materially help",
        body: "The Fund wants situations where David, Rishi, the advisors, and the Dojo network can produce non-generic leverage."
      },
      {
        eyebrow: "Backability",
        title: "Strong enough to syndicate after graduation",
        body: "Every residency company is a candidate for continued backing through the Fund, which is why the bar is higher than a typical accelerator funnel."
      }
    ] satisfies SimpleCard[],
    operatingModel: [
      {
        eyebrow: "Dojo philosophy",
        title: "Capital, talent, and wisdom",
        body: normalizeBrandCopy(startupSource.sections[1]?.heading ?? "The Dojo connects capital, talent & wisdom to accomplish the amazing.")
      },
      {
        eyebrow: "How work gets done",
        title: "Vision, hypothesis, experimentation",
        body: normalizeBrandCopy(startupSource.sections[2]?.body[2] ?? startupSource.sections[2]?.body[0] ?? "")
      },
      {
        eyebrow: "Growth philosophy",
        title: "Straight, fast, and frictionless",
        body: "The older startup-program copy is blunt about the intended style: achieve clarity, map the simplest path to the next objective, and keep avoidable pain low."
      }
    ] satisfies SimpleCard[],
    supportCards: [
      {
        eyebrow: "Partner time",
        title: "Direct involvement from David and Rishi",
        body: "The program is designed around direct managing-partner time rather than broad but shallow programming."
      },
      {
        eyebrow: "Network access",
        title: "A community that already knows how to help companies move",
        body: normalizeBrandCopy(getSection(communitySource, "About Us")?.body[2] ?? "")
      },
      {
        eyebrow: "After the residency",
        title: "Graduation is the start of the next relationship",
        body: "The Fund intends to syndicate strong companies after the residency, making each cohort part of a longer support arc instead of a one-off batch experience."
      }
    ] satisfies SimpleCard[],
    companies: companyCards.slice(0, 4),
    gallery: dedupeImages([
      ...sfSource.images.slice(0, 4),
      ...communitySource.images.slice(0, 2),
      ...startupSource.images.slice(0, 3)
    ]),
    cta: {
      title: "Each batch is deliberately small so every company gets real partner time.",
      body:
        "Six spots is a design choice, not a scarcity gimmick. The June 1, 2026 inaugural batch sets the pattern: a cohort small enough that each founder actually feels the weight of the team, advisors, and network around them.",
      actions: [
        { href: "/community", label: "See the company pattern" },
        { href: "/initiatives", label: "See the impact thesis" }
      ] satisfies ActionLink[]
    }
  },
  community: {
    hero: {
      eyebrow: "Archive proof",
      title: "A founder network with real outcomes behind it.",
      description:
        "The community story is the clearest proof layer for the Fund: company outcomes, a long founder history in South Park, and a body of real people-and-place evidence that shows the Dojo as an actual working environment rather than a slogan.",
      image: communityHeroImage,
      panelTitle: "Why this matters",
      panelBody:
        "The residency matters more when founders can see the underlying pattern: strong people staying close, real outcomes emerging from the network, and a culture that values intensity, ambition, and unusually capable builders.",
      panelItems: [
        { label: "Origin", value: "South Park, 2008" },
        { label: "Company pattern", value: "Operators and outcomes" },
        { label: "Network shape", value: "Hundreds of Dojans" },
        { label: "Program now", value: "Residency-first" }
      ] satisfies Stat[],
      actions: [
        { href: "/residency", label: "Back to the residency" },
        { href: "#archive-gallery", label: "See the community" }
      ] satisfies ActionLink[]
    },
    aboutParagraphs: (getSection(communitySource, "About Us")?.body ?? []).map(normalizeBrandCopy),
    companies: companyCards,
    historyParagraphs: (getSection(communitySource, "History")?.body ?? [])
      .slice(0, 3)
      .map(normalizeBrandCopy),
    archivePages: archivePageCards,
    gallery: publicArchiveImages,
    cta: {
      title: "This history matters because it shows pattern recognition, not nostalgia.",
      body:
        "For founders considering the residency, the point of the history is simple: this network has already been close to meaningful companies, serious operators, and unusual talent for a long time.",
      actions: [
        { href: "/residency", label: "See founder fit" },
        { href: "/locations", label: "See the footprint" }
      ] satisfies ActionLink[]
    }
  },
  locations: {
    hero: {
      eyebrow: "Current footprint",
      title: "San Francisco, Lake Tahoe, and Las Vegas in one operating network.",
      description:
        "San Francisco is the base for the residency program, with the first batch starting June 1, 2026, while Lake Tahoe and Las Vegas expand the Fund's current footprint with different working modes: sprinting, convening, and founder collisions in environments that are distinct on purpose.",
      image: sfHeroImage,
      panelTitle: "Why this matters",
      panelBody:
        "The residency is not an abstract remote program. Place matters. The different Dojo environments make that clear and help explain why the Fund can host founders in ways that feel more immersive than a standard batch.",
      panelItems: [
        { label: "SF role", value: "Residency base" },
        { label: "Tahoe role", value: "Sprint base" },
        { label: "Vegas role", value: "Convening node" },
        { label: "Program lens", value: "Place creates leverage" }
      ] satisfies Stat[],
      actions: [
        { href: "/residency", label: "See the program" },
        { href: "/community", label: "See the community" }
      ] satisfies ActionLink[]
    },
    locations: locationCards,
    modeCards: [
      {
        eyebrow: "Residency",
        title: "San Francisco for the residency batches",
        body: "The main program lives in San Francisco because that is where the Dojo's founder history, advisor access, and dense collision potential are strongest."
      },
      {
        eyebrow: "Sprints",
        title: "Tahoe for focused working sessions",
        body: "Tahoe gives teams a quieter mode without leaving the broader Fund footprint."
      },
      {
        eyebrow: "Conventions",
        title: "Las Vegas for energy and convening",
        body: "Las Vegas fits moments where hospitality, experience design, and large-scale gatherings are part of the work."
      }
    ] satisfies SimpleCard[],
    gallery: dedupeImages([
      ...sfSource.images,
      ...tahoeSource.images,
      ...vegasSource.images
    ]),
    cta: {
      title: "San Francisco is the batch base. The wider footprint expands how the network works.",
      body:
        "The three-location story is not there for ornament. It gives the Fund multiple contexts for getting founders together at the right level of intensity.",
      actions: [
        { href: "/residency", label: "Review the residency" },
        { href: "/initiatives", label: "Review the impact thesis" }
      ] satisfies ActionLink[]
    }
  },
  initiatives: {
    hero: {
      eyebrow: "Impact and infrastructure",
      title: "The Fund's taste extends beyond startup growth for its own sake.",
      description:
        "The older Dojo material makes the worldview visible: decentralization, advocacy, legal access, institutional partnership, and projects that have a credible public-interest edge. That does not replace the residency. It explains what kind of founder the Fund wants close.",
      image: initiativesHeroImage,
      panelTitle: "Themes in the network",
      panelBody:
        "Privacy, security, open infrastructure, community advocacy, legal access, and large-scale public benefit all show up repeatedly in the Dojo's initiatives and partnerships.",
      panelItems: [
        { label: "Decentralization", value: "Manifest, Akash, Quantstamp" },
        { label: "Advocacy", value: "BAC" },
        { label: "Legal access", value: "Open Door Legal" },
        { label: "Institutional work", value: "Lincoln University" }
      ] satisfies Stat[],
      actions: [
        { href: "/residency", label: "See founder fit" },
        { href: "/community", label: "See the broader proof" }
      ] satisfies ActionLink[]
    },
    pillarCards: [
      {
        eyebrow: "Decentralization initiative",
        title: "Private, secure, community-owned infrastructure",
        body: normalizeBrandCopy(decentralizationSource.paragraphs[0])
      },
      {
        eyebrow: "Community initiatives",
        title: "Impact work with operating seriousness",
        body: normalizeBrandCopy(communityInitiativesSource.paragraphs[0])
      },
      {
        eyebrow: "Residency implication",
        title: "The Fund prefers founders with actual stakes in the world",
        body: "The target company is already producing outcomes and can plausibly scale into much larger impact with the Fund's network, advice, and follow-on support."
      }
    ] satisfies SimpleCard[],
    projects: initiativeCards,
    gallery: dedupeImages([
      ...decentralizationSource.images,
      ...communityInitiativesSource.images,
      ...visionSource.images.slice(0, 3)
    ]),
    cta: {
      title: "The best residency candidates already care about consequential problems.",
      body:
        "The Fund is not only looking for good startup mechanics. It is looking for founders whose work already matters and can matter much more with the right leverage around them.",
      actions: [
        { href: "/residency", label: "See the residency" },
        { href: "/community", label: "See the company outcomes" }
      ] satisfies ActionLink[]
    }
  }
} as const;
