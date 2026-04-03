module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.dicebear.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.zeptonow.com",
				pathname: "/**",
			},
		],
	},
};
