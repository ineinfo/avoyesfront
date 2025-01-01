/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['example.com'], // Specify external image domains here if needed
    },
    webpack(config) {
        // Add support for importing SVG files as React components
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        // Add support for importing CSS files
        config.module.rules.push({
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        });

        return config;
    },
};

export default nextConfig;
