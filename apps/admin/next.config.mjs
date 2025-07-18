/** @type {import("next").NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com'
			}
			// {
			//   protocol: "https",
			//   hostname: "lh3.googleusercontent.com",
			//   port: ""
			// },
			// {
			//   protocol: "https",
			//   hostname: "avatars.githubusercontent.com",
			//   port: ""
			// },
			// {
			//   protocol: "https",
			//   hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
			//   port: ""
			// }
		]
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
}

export default nextConfig
