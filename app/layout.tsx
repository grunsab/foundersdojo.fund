import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://foundersdojo.fund";
const title = "Founder's Dojo Fund";
const description =
  "A modern relaunch for Founder's Dojo Fund: a San Francisco-born startup studio and global founder network connecting ideas, talent and capital.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
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
