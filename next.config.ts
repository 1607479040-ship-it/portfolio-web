import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  basePath,
  trailingSlash: Boolean(basePath),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
