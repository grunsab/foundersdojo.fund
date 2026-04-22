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

export type PartnerProfile = {
  body: string;
  highlights: Stat[];
  links: NavItem[];
  role: string;
  supporting: string;
  title: string;
};

export const siteContent = {
  navigation: [
    { href: "#story", label: "Story" },
    { href: "#residency", label: "Residency" },
    { href: "#fit", label: "Founder Fit" },
    { href: "#partners", label: "Partners" },
    { href: "#support", label: "Support" },
    { href: "#contact", label: "Contact" }
  ] satisfies NavItem[],
  hero: {
    eyebrow: "June 2026 inaugural batch. Six companies.",
    title: "A one-month San Francisco residency for founders already creating real outcomes.",
    description:
      "Founder's Dojo Fund is building a June 2026 residency program for early-stage companies that already have meaningful traction and clear impact, and are ready to scale much harder with the right environment. We will select six teams for one month in San Francisco, then surround them with capital, mentorship, operator support and a fund model designed to keep backing them after graduation.",
    asideTitle: "What accepted founders get",
    asideBody:
      "Free stay in San Francisco for one month. Free office space. A stipend. Intensive mentorship from respected operators, industry leaders, exited founders, venture capitalists and angel investors. We take 2% and put the full weight of our team behind helping the company scale.",
    primaryCta: {
      href: "#residency",
      label: "See the residency"
    },
    secondaryCta: {
      href: "#fit",
      label: "See founder fit"
    }
  },
  stats: [
    { label: "Launch", value: "June 2026" },
    { label: "Batch size", value: "6 companies" },
    { label: "Residency", value: "1 month in SF" },
    { label: "Fund model", value: "2% + syndication" }
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
      title: "The residency becomes the main program",
      body:
        "Today the fund is led by David Grossblatt and Rishi Sachdev as equal managing partners, and the main program is a June 2026 San Francisco residency for six companies. The goal is not to help founders start from zero, but to take companies with real outcomes and help them break into much larger impact."
    }
  ] satisfies StoryBeat[],
  focusAreas: [
    {
      eyebrow: "Batch 01",
      title: "Six founders. One month. June 2026.",
      body:
        "The inaugural residency begins in June 2026 with six spots. We are deliberately keeping the batch small so every company gets serious partner time, daily operating support and real access to the wider Dojo network."
    },
    {
      eyebrow: "What founders get",
      title: "Free stay, free office space, stipend and real intensity",
      body:
        "Accepted teams get one month in San Francisco with housing, office space and a stipend covered. The point is to remove distraction, compress feedback loops and let founders spend the month fully focused on building and scaling."
    },
    {
      eyebrow: "Mentorship and fund support",
      title: "Advisors who have built, exited and invested at the highest level",
      body:
        "Every residency company gets intensive mentorship from industry leaders, exited founders, respected venture capitalists and angel investors. We take 2%, offer the full support of our team during the residency, and plan to syndicate every company through the fund after graduation."
    }
  ] satisfies FocusArea[],
  projectIntro:
    "The ideal company for the residency is already doing something that matters. We are not looking for raw ideas. We are looking for founders with proof, momentum and a credible path to dramatically larger impact if they are given the right environment and leverage.",
  projects: [
    {
      name: "Already producing outcomes",
      category: "Traction",
      description:
        "The strongest fit already has customers, users, revenue, adoption or some other clear evidence that the product is solving a real problem."
    },
    {
      name: "Making a real dent already",
      category: "Impact",
      description:
        "We want founders who are already making a decent impact and can point to the people, systems or markets that are materially better because the company exists."
    },
    {
      name: "Ready to scale beyond the current plateau",
      category: "Scale",
      description:
        "The residency is for companies that do not need generic startup motivation. They need sharper distribution, positioning, hiring, product leverage, financing or network effects to unlock the next order of magnitude."
    },
    {
      name: "Able to use intense founder pressure well",
      category: "Tempo",
      description:
        "One month in San Francisco only works if the team is ready for concentrated feedback, fast iteration and a high-trust, high-honesty environment."
    },
    {
      name: "A fit for direct partner involvement",
      category: "Support model",
      description:
        "We want companies where David, Rishi, the advisor bench and the wider Dojo network can create meaningful leverage instead of offering generic office hours."
    },
    {
      name: "Worth backing after graduation",
      category: "Fund thesis",
      description:
        "Every residency company is a candidate for syndication through the fund after the program. That only works if the company is strong enough that we genuinely want to keep backing it."
    }
  ] satisfies ProjectSpotlight[],
  partners: {
    eyebrow: "Managing partners",
    title: "David Grossblatt and Rishi Sachdev lead the Dojo together.",
    description:
      "The residency works because it combines founder taste, operator depth, investor access and a support model built around real leverage. David carries the original San Francisco Dojo culture and network memory; Rishi extends the platform through company building, healthcare infrastructure and technical execution.",
    profiles: [
      {
        title: "David Grossblatt",
        role: "Managing partner",
        body:
          "Grossblatt built the original Dojo environment in South Park and shaped the culture that made it matter: give sharp, unconventional founders real room to work, keep talent close and let the right projects collide without institutional drag.",
        supporting:
          "That role is not just historical. The current Dojo still draws much of its identity from David's network, taste and long-term presence inside the founder community, which is why the right framing is managing partner rather than distant founder emeritus.",
        highlights: [
          {
            label: "Dojo roots",
            value: "South Park, 2008"
          },
          {
            label: "Public profile",
            value: "Real-life Erlich story"
          },
          {
            label: "Core edge",
            value: "Network, culture, founder taste"
          }
        ],
        links: [
          {
            href: "https://thehustle.co/the-real-erlich-bachman-of-silicon-valley/",
            label: "Read David's profile"
          }
        ]
      },
      {
        title: "Rishi Sachdev",
        role: "Managing partner",
        body:
          "Sachdev brings operator and technical depth to the partnership. He is the CEO and technical founder of TalkDoc, and was also the CTO and technical co-founder of Rooster, with prior operating experience at Coinbase, Google Fiber and a Berkeley background in computer science and applied mathematics.",
        supporting:
          "The healthcare infrastructure behind that work runs deeper than software. Rishi's background includes Bay Area Doctors / Csolutions International, a family-run California clinician staffing operation tied to prison and government behavioral health work, with public profile materials describing more than $100M in combined revenue and care delivery reaching hundreds of thousands of incarcerated patients.",
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
            label: "Healthcare platform",
            value: "$100MM staffing base"
          }
        ],
        links: [
          {
            href: "https://www.talkdoc.com/about",
            label: "View TalkDoc"
          },
          {
            href: "https://rishisachdev.net/",
            label: "View Rishi profile"
          }
        ]
      }
    ] satisfies PartnerProfile[]
  },
  locations: [
    {
      title: "Free stay in San Francisco",
      body:
        "Each company receives one month of free stay in San Francisco so the team can work in proximity, build momentum quickly and use the city itself as part of the program."
    },
    {
      title: "Free office space and stipend",
      body:
        "We provide office space and a stipend so founders can spend the month focused on the company instead of carrying unnecessary operating drag while they are in residency."
    },
    {
      title: "An advisor bench with real weight",
      body:
        "The support system includes industry leaders, exited founders, respected venture capitalists and active angel investors who can help founders tighten strategy and accelerate the right introductions."
    }
  ] satisfies LocationCard[],
  principles: [
    {
      title: "Full-team support during the residency",
      body:
        "This is not light-touch programming. Founders get the concentrated help of the managing partners and the broader team for the full month."
    },
    {
      title: "2% for aligned, practical help",
      body:
        "We take 2% because the program is designed to be genuinely useful, highly involved and tightly aligned with the companies we believe can create outsized outcomes."
    },
    {
      title: "Syndication after graduation",
      body:
        "Graduation is not the end of the relationship. Every company in the residency is one we intend to syndicate through the fund if the work and company quality justify it."
    }
  ] satisfies Principle[],
  footer:
    "Founder's Dojo Fund is building a June 2026 residency for six early-stage companies with real outcomes, offering one month in San Francisco, full-team support, intensive mentorship and fund syndication after graduation."
} as const;
