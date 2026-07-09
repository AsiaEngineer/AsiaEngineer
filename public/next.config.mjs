/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Ganti xxxx dengan project ref Supabase kamu setelah Storage aktif di Tahap 3.
        hostname: 'xxxx.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
