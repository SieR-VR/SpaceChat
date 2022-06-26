/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STREAM_API_KEY: process.env.STREAM_API_KEY,
  }
}

module.exports = nextConfig
