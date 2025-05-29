import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@prisma/client', '@prisma/engines'],
  webpack(config, { webpack, isServer }) {
    if (isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp:
            /^(lokijs|mongodb-client-encryption|@aws-sdk\/credential-providers|@aws-sdk\/client-sso-oidc|snappy|aws4|mongodb-connection-string-url|kerberos|@mongodb-js\/zstd|gcp-metadata|socks|aws-crt|@azure\/msal-node|@azure\/identity|pg-native)$/,
        })
      );
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    };

    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
