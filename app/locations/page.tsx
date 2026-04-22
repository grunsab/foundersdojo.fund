import type { Metadata } from "next";
import Link from "next/link";
import { ImageMosaic } from "../../components/image-mosaic";
import { PageHero } from "../../components/page-hero";
import { SectionHeading } from "../../components/section-heading";
import { SiteShell } from "../../components/site-shell";
import { siteContent } from "../../lib/site-content";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "The current Founder's Dojo Fund footprint across San Francisco, Lake Tahoe, and Las Vegas, with San Francisco as the base for monthly residency batches beginning June 1, 2026."
};

export default function LocationsPage() {
  const content = siteContent.locations;

  return (
    <SiteShell currentPath="/locations">
      <PageHero {...content.hero} />

      <section className="section">
        <SectionHeading
          eyebrow="Current footprint"
          title="Three distinct working contexts inside one network."
        />

        <div className="feature-grid">
          {content.locations.map((location) => (
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
          eyebrow="Why three places"
          title="Each location creates a different kind of founder leverage."
        />

        <div className="card-grid card-grid-large">
          {content.modeCards.map((card) => (
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
          eyebrow="Spaces and atmosphere"
          title="The places matter because the program is meant to feel lived-in, not generic."
        />

        <ImageMosaic images={content.gallery} />
      </section>

      <section className="section founder-section">
        <div className="cta-card">
          <p className="eyebrow">Residency base</p>
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
