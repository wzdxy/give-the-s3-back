/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json5$/,
      use: ['json5-loader']
    })
    return config
  }
}

module.exports = nextConfig
