import type { Metadata } from "next";
import Link from "next/link";
import { ImageMosaic } from "../../components/image-mosaic";
import { PageHero } from "../../components/page-hero";
import { SectionHeading } from "../../components/section-heading";
import { SiteShell } from "../../components/site-shell";
import { siteContent } from "../../lib/site-content";

export const metadata: Metadata = {
  title: "Initiatives",
  description:
    "The decentralization and community-impact work around Founder's Dojo Fund, showing the kind of consequential companies and projects the residency wants close."
};

export default function InitiativesPage() {
  const content = siteContent.initiatives;

  return (
    <SiteShell currentPath="/initiatives">
      <PageHero {...content.hero} />

      <section className="section">
        <SectionHeading
          eyebrow="Pillars"
          title="The Dojo shows a worldview, not just a portfolio."
        />

        <div className="card-grid card-grid-large">
          {content.pillarCards.map((card) => (
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
          eyebrow="Selected initiatives"
          title="Projects and organizations that shape the Fund's taste."
        />

        <div className="card-grid">
          {content.projects.map((project) => (
            <a
              className="content-card project-card card-link"
              href={project.href}
              key={project.title}
              rel="noreferrer"
              target="_blank"
            >
              <p className="card-eyebrow">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.body}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="In the field"
          title="Advocacy, policy, and community work are part of the Dojo's operating DNA."
        />

        <ImageMosaic images={content.gallery} />
      </section>

      <section className="section founder-section">
        <div className="cta-card">
          <p className="eyebrow">Why this matters for founders</p>
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
