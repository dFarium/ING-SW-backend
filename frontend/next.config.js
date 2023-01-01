/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    API_URL: process.env.SERVIDOR,
    SECRET_KEY:process.env.SECRET_KEY
  }
}
