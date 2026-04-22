import Link from "next/link";
import { brand, footerText, navigation, siteContent } from "../lib/site-content";

export function SiteShell({
  children,
  currentPath
}: Readonly<{
  children: React.ReactNode;
  currentPath: string;
}>) {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand-mark">FD</span>
          <span className="brand-copy">
            <strong>{brand.name}</strong>
            <span>{brand.domain}</span>
          </span>
        </Link>

        <nav aria-label="Primary">
          {navigation.map((item) => (
            <Link
              className={item.href === currentPath ? "is-active" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="footer-copy">
          <p className="eyebrow">Founder&apos;s Dojo Fund</p>
          <p>{footerText}</p>
        </div>

        <div className="footer-stats">
          {siteContent.footerStats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </footer>
    </>
  );
}
