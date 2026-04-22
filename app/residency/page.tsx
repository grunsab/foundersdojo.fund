import type { Metadata } from "next";
import Link from "next/link";
import { ImageMosaic } from "../../components/image-mosaic";
import { PageHero } from "../../components/page-hero";
import { SectionHeading } from "../../components/section-heading";
import { SiteShell } from "../../components/site-shell";
import { siteContent } from "../../lib/site-content";

export const metadata: Metadata = {
  title: "Residency",
  description:
    "The Founder's Dojo Fund residency: one month in San Francisco for six companies with free stay, office space, stipend, intensive mentorship, and post-program syndication."
};

export default function ResidencyPage() {
  const content = siteContent.residency;

  return (
    <SiteShell currentPath="/residency">
      <PageHero {...content.hero} />

      <section className="section">
        <SectionHeading
          eyebrow="Offer"
          title="Six companies. One month. Full-team support."
        />

        <div className="card-grid card-grid-large">
          {content.offerCards.map((card) => (
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
          eyebrow="Founder fit"
          title="Who this is actually for."
        />

        <div className="card-grid">
          {content.founderFit.map((card) => (
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
          eyebrow="How the Dojo works"
          title="The older startup-program language turned into a sharper operating model."
        />

        <div className="card-grid card-grid-large">
          {content.operatingModel.map((card) => (
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
          eyebrow="Support"
          title="What founders actually get once they arrive."
        />

        <div className="card-grid card-grid-large">
          {content.supportCards.map((card) => (
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
          eyebrow="Proof pattern"
          title="The Fund already understands this kind of company."
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
          eyebrow="Imported media"
          title="The San Francisco environment is part of the offer."
        />

        <ImageMosaic images={content.gallery} />
      </section>

      <section className="section founder-section">
        <div className="cta-card">
          <p className="eyebrow">Residency rationale</p>
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
