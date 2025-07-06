/** @type {import('next').NextConfig} */

const isGithubPages = process.env.NODE_ENV === 'production';
const repoName = 'ResearchProject2';



const nextConfig = {
  output: 'export',
  devIndicators: false,
  trailingSlash: true,
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
};

export default nextConfig;
