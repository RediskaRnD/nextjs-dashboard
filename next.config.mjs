/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    ppr: 'incremental'
  }, webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  }
}

export default nextConfig;
