/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	compiler: {
		styledComponents: true,
	},
	webpack: (
		config,
		{ buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
	) => {
		config.externals.push({ canvas: "commonjs canvas" });
		return config;
	},
};

export default nextConfig;
