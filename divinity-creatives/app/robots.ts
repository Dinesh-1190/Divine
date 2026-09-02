import type { MetadataRoute } from "next";

// Required by `output: "export"` — these are emitted as static files.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://divinitycreatives.com"}/sitemap.xml`,
  };
}
