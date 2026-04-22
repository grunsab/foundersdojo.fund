import Image from "next/image";
import Link from "next/link";
import type { ActionLink, ImportedImage } from "../lib/site-content";

type HeroSignal = {
  label: string;
  value: string;
};

function HeroAction({ action }: { action: ActionLink }) {
  if (action.external) {
    return (
      <a
        className="button button-secondary"
        href={action.href}
        rel="noreferrer"
        target="_blank"
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link className="button button-secondary" href={action.href}>
      {action.label}
    </Link>
  );
}

export function PageHero({
  actions,
  description,
  eyebrow,
  image,
  panelBody,
  panelItems,
  panelTitle,
  title
}: {
  actions: ActionLink[];
  description: string;
  eyebrow: string;
  image: ImportedImage;
  panelBody: string;
  panelItems: HeroSignal[];
  panelTitle: string;
  title: string;
}) {
  return (
    <section className="page-hero section">
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-description">{description}</p>

        <div className="hero-actions">
          {actions.map((action) => (
            <HeroAction action={action} key={action.href} />
          ))}
        </div>
      </div>

      <div className="page-hero-media">
        <div className="page-hero-image">
          <Image alt={image.alt} fill priority sizes="(max-width: 900px) 100vw, 40vw" src={image.localPath} />
        </div>

        <aside className="hero-panel">
          <p className="hero-panel-label">{panelTitle}</p>
          <p>{panelBody}</p>

          <div className="signal-grid">
            {panelItems.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
