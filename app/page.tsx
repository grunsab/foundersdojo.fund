import { siteContent } from "../lib/site-content";

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  description?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark">FD</span>
          <span className="brand-copy">
            <strong>Founder&apos;s Dojo Fund</strong>
            <span>foundersdojo.fund</span>
          </span>
        </a>

        <nav aria-label="Primary">
          {siteContent.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">{siteContent.hero.eyebrow}</p>
            <h1>{siteContent.hero.title}</h1>
            <p className="hero-description">{siteContent.hero.description}</p>

            <div className="hero-actions">
              <a className="button button-primary" href={siteContent.hero.primaryCta.href}>
                {siteContent.hero.primaryCta.label}
              </a>
              <a className="button button-secondary" href={siteContent.hero.secondaryCta.href}>
                {siteContent.hero.secondaryCta.label}
              </a>
            </div>
          </div>

          <aside className="hero-panel">
            <p className="hero-panel-label">{siteContent.hero.asideTitle}</p>
            <p>{siteContent.hero.asideBody}</p>

            <div className="signal-grid">
              <div>
                <span>6 spots</span>
                <p>The first batch launches in June 2026 with six residency companies.</p>
              </div>
              <div>
                <span>1 month</span>
                <p>Free stay in San Francisco, free office space, a stipend and intensive mentorship.</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="stats-strip" aria-label="Founder's Dojo Fund signals">
          {siteContent.stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>

        <section className="section manifesto" id="story">
          <div className="manifesto-copy">
            <SectionHeading
              eyebrow="Why this exists"
              title="The original Dojo made room for unusual founders. The fund turns that into a concentrated residency."
            />
            <p>
              The archived home page described the Dojo as a place where ideas, talent and capital
              could converge to make the impossible probable. The later materials sharpen that into
              something more specific: a long-running operating environment for builders who were
              independent, technically serious and usually a little allergic to standard startup
              institutions.
            </p>
            <p>
              This relaunch keeps that spirit but frames the current leadership directly. Founder&apos;s
              Dojo Fund is best understood as a founder-built network now run by David Grossblatt and
              Rishi Sachdev as equal managing partners, helping unusual people and ambitious
              projects find each other at the right moment.
            </p>
          </div>

          <div className="manifesto-accent">
            <div className="accent-card">
              <span>Then</span>
              <p>Too much office space. Too many gifted builders who needed a base.</p>
            </div>
            <div className="accent-card">
              <span>Now</span>
              <p>David and Rishi as equal managing partners across the network, studio and community.</p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="story-title">
          <SectionHeading
            eyebrow="Timeline"
            title="A room, a culture, then a network"
          />

          <div className="timeline">
            {siteContent.story.map((item) => (
              <article className="timeline-card" key={item.year}>
                <p className="timeline-year">{item.year}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="residency">
          <SectionHeading
            eyebrow="Main program"
            title="The Founder&apos;s Dojo Fund Residency"
          />

          <div className="card-grid card-grid-large">
            {siteContent.focusAreas.map((area) => (
              <article className="content-card" key={area.title}>
                <p className="card-eyebrow">{area.eyebrow}</p>
                <h3>{area.title}</h3>
                <p>{area.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="fit">
          <SectionHeading
            description={siteContent.projectIntro}
            eyebrow="Founder fit"
            title="The companies we want to help scale"
          />

          <div className="card-grid">
            {siteContent.projects.map((project) => (
              <article className="content-card project-card" key={project.name}>
                <p className="card-eyebrow">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section partners-section" id="partners">
          <SectionHeading
            eyebrow={siteContent.partners.eyebrow}
            title={siteContent.partners.title}
            description={siteContent.partners.description}
          />

          <div className="partner-grid">
            {siteContent.partners.profiles.map((partner) => (
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

        <section className="section network-section" id="support">
          <SectionHeading
            eyebrow="Support stack"
            title="What founders actually receive in the residency"
          />

          <div className="location-grid">
            {siteContent.locations.map((location) => (
              <article className="location-card" key={location.title}>
                <h3>{location.title}</h3>
                <p>{location.body}</p>
              </article>
            ))}
          </div>

          <div className="principles-grid">
            {siteContent.principles.map((principle) => (
              <article className="principle-card" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section founder-section" id="contact">
          <div className="cta-card">
            <p className="eyebrow">June 2026 batch</p>
            <h2>Six companies. One month in San Francisco. Full-team support.</h2>
            <p>
              We are looking for early-stage founders with meaningful outcomes already on the
              board, a company that is clearly making an impact, and a credible path to much larger
              scale if the right people get deeply involved. The residency includes free stay, free
              office space, a stipend, intensive mentorship, 2 percent economics and post-program
              syndication through the fund.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#fit">
                Review founder fit
              </a>
              <a className="button button-secondary" href="#residency">
                Review the residency
              </a>
              <a className="button button-secondary" href="#top">
                Back to top
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{siteContent.footer}</p>
      </footer>
    </>
  );
}
