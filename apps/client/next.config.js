/** @type {import('next').NextConfig} */

const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ]
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()]
        }

        return config
    },
};

module.exports = nextConfig;
