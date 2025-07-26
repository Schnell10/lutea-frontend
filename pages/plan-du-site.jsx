import Link from 'next/link';
import { useMemo, useEffect } from 'react';
import { useBannerStore } from 'store/useBannerStore';

// Liste manuelle des pages à exclure
const EXCLUDED = ['_app.jsx', '404.jsx', 'api', 'plan-du-site.jsx'];

function getPageName(filename) {
  if (filename === 'index.jsx') return 'Accueil';
  if (filename === 'mentionsLegales.jsx') return 'Mentions légales';
  if (filename === 'politique-confidentialite.jsx') return 'Politique de confidentialité';
  if (filename === 'cgu.jsx') return 'CGU';
  if (filename === 'cgv.jsx') return 'CGV';
  if (filename === 'plan-du-site.jsx') return 'Plan du site';
  // Capitalise le nom du fichier sans extension
  return filename
    .replace('.jsx', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function PlanDuSite() {
  const setBanner = useBannerStore((state) => state.setBanner);
  const resetBanner = useBannerStore((state) => state.resetBanner);

  useEffect(() => {
    setBanner({
      type: 'image',
      src: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
      title: 'Plan de site',
    });
    return () => resetBanner();
  }, [setBanner, resetBanner]);

  const pages = useMemo(
    () => [
      'index.jsx',
      'concept.jsx',
      'retraites.jsx',
      'booking.jsx',
      'galerie.jsx',
      'faq.jsx',
      'contact.jsx',
      'cgu.jsx',
      'cgv.jsx',
      'mentionsLegales.jsx',
      'cookie.jsx',
      'politique-confidentialite.jsx',
      'plan-du-site.jsx',
    ],
    []
  );

  return (
    <main className="page-sitemap">
      <div className="page-sitemap__container">
        <ul className="page-sitemap__list">
          {pages
            .filter((f) => !EXCLUDED.includes(f))
            .map((filename) => {
              let href = '/' + (filename === 'index.jsx' ? '' : filename.replace('.jsx', ''));
              if (filename === 'mentionsLegales.jsx') href = '/mentionsLegales';
              if (filename === 'politique-confidentialite.jsx') href = '/politique-confidentialite';
              if (filename === 'cgu.jsx') href = '/cgu';
              if (filename === 'cgv.jsx') href = '/cgv';
              if (filename === 'cookie.jsx') href = '/cookie';
              return (
                <li className="page-sitemap__item" key={filename}>
                  <Link href={href} className="page-sitemap__link">
                    {getPageName(filename)}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </main>
  );
}
