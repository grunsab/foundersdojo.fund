export type NavItem = {
  href: string;
  label: string;
};

export type Stat = {
  label: string;
  value: string;
};

export type StoryBeat = {
  body: string;
  title: string;
  year: string;
};

export type FocusArea = {
  body: string;
  eyebrow: string;
  title: string;
};

export type ProjectSpotlight = {
  category: string;
  description: string;
  name: string;
};

export type LocationCard = {
  body: string;
  title: string;
};

export type Principle = {
  body: string;
  title: string;
};

export const siteContent = {
  currentSiteUrl: "https://www.foundersdojo.com/",
  navigation: [
    { href: "#story", label: "Story" },
    { href: "#focus", label: "Focus" },
    { href: "#projects", label: "Projects" },
    { href: "#rishi", label: "Rishi" },
    { href: "#network", label: "Network" },
    { href: "#founder", label: "Founder" }
  ] satisfies NavItem[],
  hero: {
    eyebrow: "Founded in San Francisco. Built for outliers.",
    title: "Ideas, talent and capital to make the impossible probable.",
    description:
      "Founders Dojo began in South Park in 2008 as a too-big office that turned into a free refuge for founders, technologists and operators who did not fit the usual startup script. What started as a collaborative studio became a global network for ventures, experiments and communities that need sharp people around them.",
    asideTitle: "What the Dojo is",
    asideBody:
      "Not a generic accelerator. Not just co-working. The Dojo is a founder-built environment for assembling talent, pressure-testing ideas, backing unusual projects and helping serious builders move straighter, faster and with less noise.",
    primaryCta: {
      href: "#projects",
      label: "See the project pattern"
    },
    secondaryCta: {
      href: "https://www.foundersdojo.com/our-community",
      label: "Visit the current network"
    }
  },
  stats: [
    { label: "Origin", value: "South Park, 2008" },
    { label: "Founder support", value: "200+ desks given away" },
    { label: "Reach", value: "Global Dojo community" },
    { label: "Operating model", value: "Studio, advisory and network" }
  ] satisfies Stat[],
  story: [
    {
      year: "2008",
      title: "A spare office turns into a founder magnet",
      body:
        "The Dojo started as extra room inside an ad-network office near South Park. Instead of shrinking the space, David Grossblatt and early collaborators kept it open and let talented builders work there. The room filled with internet founders, product people and technical misfits who traded proximity for momentum."
    },
    {
      year: "2010s",
      title: "From desks to a startup studio culture",
      body:
        "What looked like free desk space evolved into a real operating pattern: keep strong people close, let projects cross-pollinate and help teams get through the earliest stage without unnecessary ceremony. Over the next decade, hundreds of founders and makers passed through the Dojo orbit."
    },
    {
      year: "2015",
      title: "The outside world notices the ethos",
      body:
        "The Hustle profiled Grossblatt as the rumored real-world influence behind Erlich Bachman from Silicon Valley. The article made public what insiders already recognized: the Dojo had become a home for unusually independent founders who valued freedom, intensity and weird talent density over polished startup theater."
    },
    {
      year: "Now",
      title: "A broader network with sharper range",
      body:
        "Today the Dojo describes itself as a global community and project platform. The work spans startup formation, capital and advisory support, decentralization efforts, community initiatives and a network that now stretches well beyond the original San Francisco office."
    }
  ] satisfies StoryBeat[],
  focusAreas: [
    {
      eyebrow: "Start up program",
      title: "Formation first, growth second",
      body:
        "The Dojo's startup program is built around two phases: getting from idea to a real MVP, then building the systems and team required for growth. The operating principle is simple: achieve clarity, map the next move and avoid avoidable pain."
    },
    {
      eyebrow: "Decentralization initiative",
      title: "Open systems, user control and infrastructure bets",
      body:
        "Official Dojo materials place decentralization at the center of its modern thesis. The network supports projects working across open source software, policy, token design, community, launch and growth, with special emphasis on the right to a safer and freer internet."
    },
    {
      eyebrow: "Community initiatives",
      title: "Studio energy applied beyond venture outcomes",
      body:
        "The Dojo also directs talent and attention toward advocacy, legal access, education and mission-driven community work. That keeps the identity broader than pure startup finance and closer to a long-lived civic-tech network with founder instincts."
    }
  ] satisfies FocusArea[],
  projectIntro:
    "The official site positions the Dojo as a place where capital, talent and operators repeatedly gather around projects that should not have been easy to build. These are representative outcomes and affiliations mentioned in the current Dojo narrative.",
  projects: [
    {
      name: "Akash",
      category: "Decentralized cloud",
      description:
        "Cited by the Dojo as a major decentralization success story and one of the projects that helped define its current infrastructure thesis."
    },
    {
      name: "Quantstamp",
      category: "Blockchain security",
      description:
        "Presented as an example of the Dojo's long-running involvement with decentralization and security-oriented internet infrastructure."
    },
    {
      name: "The Hustle",
      category: "Media",
      description:
        "Referenced in Dojo materials as a notable company in the orbit, and the publication that later amplified the Dojo story to a much wider audience."
    },
    {
      name: "Scout Monitoring",
      category: "Infrastructure software",
      description:
        "Part of the Dojo origin story through early South Park collaborators and later highlighted as an incubated or advised company."
    },
    {
      name: "Talkdoc",
      category: "Health tech",
      description:
        "Named on the official community page as a Dojo-linked company focused on equal access to mental health services."
    },
    {
      name: "Native Co",
      category: "Consumer brand",
      description:
        "Used by the Dojo as proof that the network has touched both internet infrastructure bets and scaled consumer businesses."
    }
  ] satisfies ProjectSpotlight[],
  rishi: {
    eyebrow: "Current steward",
    title: "Rishi Sachdev",
    body:
      "Rishi Sachdev is the CEO and technical founder of TalkDoc, an AI-powered telehealth platform focused on Medicaid behavioral health in California. His public profile materials also place him as the CTO and technical co-founder of Rooster, with prior operating experience at Coinbase, Google Fiber and a Berkeley background in computer science and applied mathematics.",
    supporting:
      "The healthcare infrastructure behind that work runs deeper than software. Rishi's background includes Bay Area Doctors / Csolutions International, a family-run California clinician staffing operation tied to prison and government behavioral health work. His public profile materials describe that platform as scaling past $100M in combined revenue, while the operating history behind it helped mental health care reach hundreds of thousands of incarcerated patients.",
    highlights: [
      {
        label: "TalkDoc",
        value: "$1.8MM peak ARR"
      },
      {
        label: "Rooster",
        value: "Technical co-founder"
      },
      {
        label: "Healthcare infrastructure",
        value: "$100MM staffing base"
      },
      {
        label: "Operating range",
        value: "Google Fiber, Coinbase, Berkeley"
      },
      {
        label: "CA Medicaid",
        value: "10+ years in market"
      },
      {
        label: "Current role",
        value: "Stewarding this relaunch"
      }
    ] satisfies Stat[],
    links: [
      {
        href: "https://www.talkdoc.com/about",
        label: "View TalkDoc"
      },
      {
        href: "https://rishisachdev.net/",
        label: "View Rishi profile"
      }
    ] satisfies NavItem[]
  },
  locations: [
    {
      title: "San Francisco",
      body:
        "The Dojo still anchors its story in San Francisco. The current site places its main city presence alongside Archimedes Banya, framing the space as part work suite, part event venue and part social operating base for the network."
    },
    {
      title: "Lake Tahoe / Carson City",
      body:
        "The more recent relaunch materials expand the geography to Nevada, where the Dojo connects frontier mythology, deal-making culture and crypto infrastructure into a second outpost."
    },
    {
      title: "Everywhere Dojians gather",
      body:
        "The strongest through-line is not a building. It is the claim that alumni and collaborators continue to reconnect across the world, forming ad hoc crews around projects, ventures and movements."
    }
  ] satisfies LocationCard[],
  founder: {
    title: "David Grossblatt",
    eyebrow: "Founder and connective tissue",
    body:
      "Across the archive and current materials, Grossblatt shows up less as a polished frontman and more as the person who kept the room alive. The public story around him is consistent: freedom mattered more than startup cosplay, great people were worth making space for, and the right environment could turn drift into serious work.",
    supporting:
      "That ethos is what makes the Dojo different. It is not selling belonging through branding. It is offering a place, a network and a working style for founders who would rather build something improbable than fit neatly into someone else's institution."
  },
  principles: [
    {
      title: "Keep talent close",
      body:
        "The original Dojo insight was spatial before it was strategic: if strong people can stay in the same room, the right projects happen faster."
    },
    {
      title: "Trade polish for signal",
      body:
        "The Dojo story consistently favors real builders, real momentum and rough edges over prestige theater or startup pageantry."
    },
    {
      title: "Back unusual categories early",
      body:
        "From web-era founders to blockchain policy and decentralized infrastructure, the network tends to move where serious technical leverage is underpriced."
    }
  ] satisfies Principle[],
  footer:
    "This first version of foundersdojo.fund is a modern relaunch for Founders Dojo, stewarded by Rishi Sachdev and assembled from archived Dojo material, current official site copy and published reporting on the Dojo's origin story."
} as const;
