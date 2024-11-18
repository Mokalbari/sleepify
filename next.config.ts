import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // domains: ["i.scdn.co", "randomuser.me"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
}

export default nextConfig
