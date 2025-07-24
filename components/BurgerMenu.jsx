import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setClosing(false);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 400); // doit correspondre à la durée de l'animation slideUp
  };

  // Désactive le scroll du body quand la modale est ouverte
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Nettoyage si le composant est démonté alors que la modale est ouverte
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="burger-menu" onClick={handleOpen}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      {open && (
        <div className="burger-modal" onClick={handleClose}>
          <div
            className={`burger-modal__content${closing ? ' closing' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="burger-modal__close"
              onClick={handleClose}
              aria-label="Fermer le menu"
            >
              ✕
            </button>
            {/* Ici tu mets le contenu de ton menu */}
            <nav className="burger-modal__nav">
              <ul className="burger-modal__nav-main">
                <li onClick={handleClose}>
                  <Link href="/">Accueil</Link>
                </li>
                <li onClick={handleClose}>
                  <Link href="/concept">Le concept</Link>
                </li>
                <li onClick={handleClose}>
                  <Link href="/retraites">Les retraites</Link>
                </li>
                <li onClick={handleClose}>
                  <Link href="/galerie">Galerie</Link>
                </li>
              </ul>
              <hr className="burger-modal__separator" />
              <ul className="burger-modal__nav-secondary">
                <li onClick={handleClose}>
                  <Link href="/contact">Contact</Link>
                </li>
                <li onClick={handleClose}>
                  <Link href="/faq">FAQ</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
