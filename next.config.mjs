/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
  sassOptions: {
    additionalData: `@use "@/assets/variables" as *;`,
  },
};

export default nextConfig;
