/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(vert|frag|glsl)$/i,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "raw-loader",
        },
      ],
    })

    return config
  },
}

module.exports = nextConfig
