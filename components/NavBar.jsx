import Link from 'next/link';
import { useEffect, useState } from 'react';
import BurgerMenu from './BurgerMenu';
import Button from './Button';
import SocialMenu from './SocialMenu';

export default function NavBar() {
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.95; // 95% de la hauteur de la fenêtre

      // Si on est entre 0 et 95vh, la navbar est transparente
      if (scrollPosition < threshold) {
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    };

    // Écouter l'événement scroll
    window.addEventListener('scroll', handleScroll);

    // Appeler une fois au montage pour définir l'état initial
    handleScroll();

    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isTransparent ? 'navbar--transparent' : ''}`}>
      <div className="navbar__offer">
        <p className="navbar__offer-text">Paiement en 2x ou 3x disponible</p>
        <Button className="button-gold" label="Réserver une retraite" href="/booking" />
      </div>
      <div className="navbar__usual">
        <div className="navbar__usual-left">
          <BurgerMenu />
        </div>
        <div className="navbar__usual-center">
          <Link href="/">
            <h2 className="name-lutea">Lutea</h2>
          </Link>
        </div>
        <div className="navbar__usual-right">
          <SocialMenu />
        </div>
      </div>
    </div>
  );
}
