/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
      remotePatterns :[
        {
          protocol: "https",
          hostname: "imgfp.hotp.jp", 
          port: "",
          pathname: "/**",
        },
      ],
    },
  };
  
export default nextConfig;
  