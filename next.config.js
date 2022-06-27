/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    TWITTER_API_KEY: process.env.TWITTER_API_KEY,
    TWITTER_API_SECRET: process.env.TWITTER_API_SECRET,
    TWITTER_OAUTH_CLIENT_ID: process.env.TWITTER_OAUTH_CLIENT_ID,
    TWITTER_OAUTH_CLIENT_SECRET: process.env.TWITTER_OAUTH_CLIENT_SECRET,
    TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: ['pbs.twimg.com'],
  }
}

module.exports = nextConfig
