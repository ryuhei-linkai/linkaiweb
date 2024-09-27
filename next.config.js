/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config, { isServer }) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make pdfjs work
    
    if (!isServer) {
      config.watchOptions = {
        poll: 1000,      // ポーリング間隔をミリ秒単位で設定
        aggregateTimeout: 300,  // 変更後、再ビルドまでの待機時間
      }
    }
    
    return config;
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
};

module.exports = nextConfig;