import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://foundersdojo.fund",
      lastModified: new Date()
    },
    {
      url: "https://foundersdojo.fund/residency",
      lastModified: new Date()
    },
    {
      url: "https://foundersdojo.fund/community",
      lastModified: new Date()
    },
    {
      url: "https://foundersdojo.fund/locations",
      lastModified: new Date()
    },
    {
      url: "https://foundersdojo.fund/initiatives",
      lastModified: new Date()
    }
  ];
}
