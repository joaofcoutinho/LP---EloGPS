import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite paths com caracteres especiais nos arquivos estáticos
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
