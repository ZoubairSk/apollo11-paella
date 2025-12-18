import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "node:path";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingRoot: path.join(__dirname),
};

export default withMDX(nextConfig);
