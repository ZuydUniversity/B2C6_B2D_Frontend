/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',  /* build executable next.js webserver (instead of only static files) */
    env: {
        NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    },
};


export default nextConfig;
