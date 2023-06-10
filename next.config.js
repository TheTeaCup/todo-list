/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        SESSION_SECRET: process.env.SESSION_SECRET,
        REDIS_URL: process.env.REDIS_URL,
        CRYPTO_SECRET: process.env.CRYPTO_SECRET,
        SITESALT: process.env.SITESALT,
        SITEIV: process.env.SITEIV,
    }
}

module.exports = nextConfig
