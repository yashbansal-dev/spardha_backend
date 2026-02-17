/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/register-action',
                destination: 'http://localhost:5000/register',
            },
            {
                source: '/api/:path*',
                destination: 'http://localhost:5000/api/:path*',
            },
            {
                source: '/auth/:path*',
                destination: 'http://localhost:5000/auth/:path*',
            },
            {
                source: '/login',
                destination: 'http://localhost:5000/login',
            },
            {
                source: '/signup',
                destination: 'http://localhost:5000/signup',
            },

        ];
    },
};

export default nextConfig;
