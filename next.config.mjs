/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rfdhytmendcqtjksrwwg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/shops/**",
      },
      {
        protocol: "https",
        hostname: "rfdhytmendcqtjksrwwg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/products/**",
      },
    ],
  },
};

export default nextConfig;
