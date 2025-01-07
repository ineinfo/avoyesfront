/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
    images: {
        domains: ['example.com'],
    },
    webpack(config, { isServer }) {
        // Add support for SVG as React components
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },

    // ✅ Setup Proxy to Handle HTTP APIs
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://your-http-api.com/:path*', // Replace with your actual HTTP API URL
            },
        ];
    },
};

export default nextConfig;
