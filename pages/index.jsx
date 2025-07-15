import { useEffect } from 'react';
import { useBannerStore } from 'store/useBannerStore';

export default function Home() {
  const setBanner = useBannerStore((state) => state.setBanner);
  const resetBanner = useBannerStore((state) => state.resetBanner);

  useEffect(() => {
    setBanner({
      type: 'image',
      src: 'https://res.cloudinary.com/docejfkog/image/upload/test-horizontal_zheyel.jpg',
      title: 'Maison LUTÉA',
      subtitle: 'Des retraites bien-être au cœur des Cévennes',
    });
    return () => resetBanner();
  }, [setBanner, resetBanner]);
  return <> </>;
}
