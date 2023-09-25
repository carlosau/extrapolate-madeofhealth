/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["madeofhealth.carlossouzatecnologia.workers.dev", "replicate.delivery"],
  },
  async redirects() {
    return [
      {
        source: "/launch",
        destination: "/",
        permanent: false,
      },
      {
        source: "/github",
        destination: "/",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "/",
        permanent: false,
      },
      {
        source: "/p",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
