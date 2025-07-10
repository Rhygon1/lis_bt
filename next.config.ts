import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
		unoptimized: true
  },
  experimental: {
	reactCompiler: true,
  }
};

export default nextConfig;
