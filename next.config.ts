import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "6jax627y1avwmget.public.blob.vercel-storage.com",
      "uploadthing.com",
      "dsd05nazui.ufs.sh"
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
  },
  experimental: {
	reactCompiler: true,
  }
};

export default nextConfig;
