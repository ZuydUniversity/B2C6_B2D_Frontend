/** @type {import('next').NextConfig} */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Path to your .env.local file

// Check if BACKEND_BASE_URL is already set
if (!process.env.BACKEND_BASE_URL) {
    const envLocalPath = path.resolve(process.cwd(), '.env.local');

    console.log("[*] loading env vars")

    dotenv.config({ path: envLocalPath });
}

const nextConfig = {
    output: 'standalone'  /* build executable next.js webserver (instead of only static files) */
};


export default nextConfig;
