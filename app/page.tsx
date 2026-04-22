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
            <strong>Founders Dojo</strong>
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
              <a
                className="button button-secondary"
                href={siteContent.hero.secondaryCta.href}
                rel="noreferrer"
                target="_blank"
              >
                {siteContent.hero.secondaryCta.label}
              </a>
            </div>
          </div>

          <aside className="hero-panel">
            <p className="hero-panel-label">{siteContent.hero.asideTitle}</p>
            <p>{siteContent.hero.asideBody}</p>

            <div className="signal-grid">
              <div>
                <span>2008</span>
                <p>South Park origin with free space for founders who needed room to work.</p>
              </div>
              <div>
                <span>Now</span>
                <p>David Grossblatt and Rishi Sachdev operating as equal managing partners.</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="stats-strip" aria-label="Founders Dojo signals">
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
              eyebrow="Why it mattered"
              title="The Dojo became important because it made room for the wrong kind of founder."
            />
            <p>
              The archived home page described the Dojo as a place where ideas, talent and capital
              could converge to make the impossible probable. The later materials sharpen that into
              something more specific: a long-running operating environment for builders who were
              independent, technically serious and usually a little allergic to standard startup
              institutions.
            </p>
            <p>
              This relaunch keeps that spirit but frames the current leadership directly. Founders
              Dojo is best understood as a founder-built network now run by David Grossblatt and
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

        <section className="section" id="focus">
          <SectionHeading
            eyebrow="Current focus"
            title="Three ways the Dojo now shows up in the world"
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

        <section className="section" id="projects">
          <SectionHeading
            description={siteContent.projectIntro}
            eyebrow="Project pattern"
            title="Signals from the Dojo orbit"
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

        <section className="section network-section" id="network">
          <SectionHeading
            eyebrow="Places and people"
            title="The network is geographic, but the real asset is density"
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
            <p className="eyebrow">Next move</p>
            <h2>If you are building something improbable, start with the partners.</h2>
            <p>
              This site is the beginning of a cleaner digital home for the Dojo under David
              Grossblatt and Rishi Sachdev as equal managing partners. Until this domain becomes
              the primary hub, the live network and archival material remain at the current
              Founders Dojo site.
            </p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href={siteContent.currentSiteUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open foundersdojo.com
              </a>
              <a className="button button-secondary" href="#partners">
                Review the partner narrative
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
