import Image from "next/image";
import Link from "next/link";
import { ImageMosaic } from "../components/image-mosaic";
import { PageHero } from "../components/page-hero";
import { SectionHeading } from "../components/section-heading";
import { SiteShell } from "../components/site-shell";
import { siteContent } from "../lib/site-content";

function ExternalCompanyLink({
  body,
  category,
  href,
  title
}: {
  body: string;
  category: string;
  href?: string;
  title: string;
}) {
  const content = (
    <>
      <p className="card-eyebrow">{category}</p>
      <h3>{title}</h3>
      <p>{body}</p>
    </>
  );

  if (!href) {
    return <article className="content-card project-card">{content}</article>;
  }

  return (
    <a className="content-card project-card card-link" href={href} rel="noreferrer" target="_blank">
      {content}
    </a>
  );
}

export default function Home() {
  const content = siteContent.home;

  return (
    <SiteShell currentPath="/">
      <PageHero {...content.hero} />

      <section className="stats-strip" aria-label="Founder's Dojo Fund signals">
        {siteContent.footerStats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="section">
        <SectionHeading {...content.storyHeading} />

        <div className="two-column">
          <div className="stack">
            {content.storyParagraphs.map((paragraph) => (
              <p className="supporting-copy" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="quote-card">
            <p className="card-eyebrow">Archive quote</p>
            <h3>{content.quote.text}</h3>
            <p>{content.quote.attribution}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="What carried over"
          title="The older Dojo material clarified what the Fund should keep."
        />

        <div className="card-grid card-grid-large">
          {content.originCards.map((card) => (
            <article className="content-card" key={card.title}>
              {card.eyebrow ? <p className="card-eyebrow">{card.eyebrow}</p> : null}
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Residency program"
          title="The main offer is clear now."
          description="The older startup-program material gave the Fund language and operating principles. The current site turns that into a cleaner founder offer."
        />

        <div className="card-grid card-grid-large">
          {content.residencyCards.map((card) => (
            <article className="content-card" key={card.title}>
              {card.eyebrow ? <p className="card-eyebrow">{card.eyebrow}</p> : null}
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Proof"
          title="The Dojo points to real outcomes, not just vibes."
        />

        <div className="card-grid">
          {content.companies.map((company) => (
            <ExternalCompanyLink key={company.title} {...company} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Explore the site"
          title="The site is organized around the strongest parts of the Dojo story."
        />

        <div className="card-grid">
          {content.routeCards.map((card) => (
            <Link className="page-card" href={card.href} key={card.title}>
              {card.image ? (
                <div className="page-card-image">
                  <Image alt={card.image.alt} fill sizes="(max-width: 900px) 100vw, 33vw" src={card.image.localPath} />
                </div>
              ) : null}
              <div className="page-card-copy">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Current footprint"
          title="Three locations, with San Francisco as the residency base."
        />

        <div className="feature-grid">
          {content.footprintCards.map((location) => (
            <article className="feature-card" key={location.title}>
              <p className="card-eyebrow">{location.badge}</p>
              <h3>{location.title}</h3>
              <p>{location.body}</p>
              <ImageMosaic images={location.images} />
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Taste"
          title="The Fund likes companies and projects with real stakes in the world."
        />

        <div className="card-grid">
          {content.initiativeCards.map((card) => (
            <ExternalCompanyLink key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="section partners-section">
        <SectionHeading
          eyebrow="Managing partners"
          title="David Grossblatt and Rishi Sachdev lead the Fund together."
        />

        <div className="partner-grid">
          {content.partners.map((partner) => (
            <article className="partner-card" key={partner.title}>
              <p className="card-eyebrow">{partner.role}</p>
              <h3>{partner.title}</h3>
              <p>{partner.body}</p>
              <p>{partner.supporting}</p>

              <div className="partner-highlights">
                {partner.highlights.map((highlight) => (
                  <article className="stat-card" key={highlight.label}>
                    <p>{highlight.label}</p>
                    <strong>{highlight.value}</strong>
                  </article>
                ))}
              </div>

              <div className="hero-actions">
                {partner.links.map((link) => (
                  <a
                    className="button button-secondary"
                    href={link.href}
                    key={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Scenes from the Dojo"
          title="The people, rooms, and moments behind the network."
        />

        <ImageMosaic images={content.gallery} />
      </section>

      <section className="section founder-section">
        <div className="cta-card">
          <p className="eyebrow">June 2026 batch</p>
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
