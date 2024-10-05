/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tomesde-pub.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
