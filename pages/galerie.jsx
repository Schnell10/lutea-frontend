import { useEffect } from 'react';
import { useBannerStore } from 'store/useBannerStore';
import GalleryImg from 'sections/GalleryImg';

export default function Galerie() {
  const setBanner = useBannerStore((state) => state.setBanner);
  const resetBanner = useBannerStore((state) => state.resetBanner);

  useEffect(() => {
    setBanner({
      type: 'image',
      src: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
      title: 'Galerie',
      subtitle: 'Toutes nos retraites bien-être : yoga, pilates, ateliers, nature et sororité',
    });
    return () => resetBanner();
  }, [setBanner, resetBanner]);

  return (
    <main className="page-galerie">
      <GalleryImg />
    </main>
  );
}
