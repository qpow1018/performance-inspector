/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `@use "@/assets/variables" as *;`,
  },
};

export default nextConfig;
