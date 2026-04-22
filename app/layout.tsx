import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://foundersdojo.fund";
const title = "Founder's Dojo Fund";
const description =
  "A June 2026 San Francisco residency from Founder's Dojo Fund for six high-potential companies with traction, impact, intensive mentorship, and post-program fund support.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${title}`
  },
  description,
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: title,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
