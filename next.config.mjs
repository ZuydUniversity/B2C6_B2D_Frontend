/** @type {import('next').NextConfig} */

import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

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
