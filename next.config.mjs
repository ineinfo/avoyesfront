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

        // Remove custom CSS handling for client-side builds

        return config;
    },
};

export default nextConfig;
