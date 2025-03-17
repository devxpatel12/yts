import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
   remotePatterns:[
    {
      protocol: 'https',
      hostname: 'via.placeholder.com',
    },
    {
      protocol: "https",
      hostname: "ik.imagekit.io", 
    }
   ]
  }
};

export default nextConfig;
