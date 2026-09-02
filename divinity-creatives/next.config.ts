import type { NextConfig } from "next";

/** GitHub Pages serves a project site from /<repo>, and serves static files
 *  only — so the app is exported to plain HTML and every URL is prefixed.
 *  Both values are supplied by the deploy workflow; empty locally. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
