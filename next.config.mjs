/** @type {import('next').NextConfig} */

import path from 'path'
import dotenv from 'dotenv'

// Path to your .env.local file

// Check if BACKEND_BASE_URL is already set
if (!process.env.BACKEND_BASE_URL) {
    const envLocalPath = path.resolve(process.cwd(), '.env.local');

    console.log(`[*] loading env vars from: ${process.env.BACKEND_BASE_URL}`)

    dotenv.config({ path: envLocalPath });

    console.log(`[*] BACKEND_BASE_URL: ${process.env.BACKEND_BASE_URL}`)
}

const nextConfig = {
    output: 'standalone',  /* build executable next.js webserver (instead of only static files) */
    env: {
        BACKEND_BASE_URL: process.env.BACKEND_BASE_URL
    }
};


export default nextConfig;
