import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
