/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    TWITTER_OAUTH_CLIENT_ID: process.env.TWITTER_OAUTH_CLIENT_ID,
    TWITTER_OAUTH_CLIENT_SECRET: process.env.TWITTER_OAUTH_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  }
}

module.exports = nextConfig
