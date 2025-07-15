import NavBar from 'components/NavBar';
import { useBannerStore } from '../../store/useBannerStore';
import Banner from 'sections/Banner';

export default function Header() {
  const banner = useBannerStore((state) => state.banner);

  return (
    <header>
      <NavBar />
      {banner && (
        <Banner type={banner.type} src={banner.src}>
          <h2>{banner.title}</h2>
          <h1>{banner.subtitle}</h1>
        </Banner>
      )}
    </header>
  );
}
