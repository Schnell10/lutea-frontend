const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cloudinary autorisé pour <Image />
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'], // pour chargement plus rapide
  },
};

module.exports = nextConfig;
