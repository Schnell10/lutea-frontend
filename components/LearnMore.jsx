import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LearnMore({ isOpen, onClose, imageSrc, imageAlt, title, text }) {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Gérer l'ouverture
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  // Gérer la fermeture avec animation
  const handleClose = () => {
    setIsClosing(true);
    // Attendre que l'animation soit terminée avant de se démonter
    setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
      onClose();
    }, 400); // Durée de l'animation slideUp
  };

  // Fermer la modal avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Désactiver le scroll du body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fermer en cliquant sur l'overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`learn-more-overlay ${isClosing ? 'learn-more-overlay--closing' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={`learn-more-modal ${isClosing ? 'learn-more-modal--closing' : ''}`}>
        <button className="learn-more-close" onClick={handleClose}>
          ×
        </button>

        <div className="learn-more-content">
          {imageSrc && (
            <div className="learn-more-image">
              <Image src={imageSrc} alt={imageAlt || ''} width={300} height={200} />
            </div>
          )}

          {title && <h2 className="learn-more-title">{title}</h2>}

          {text && <div className="learn-more-text">{text}</div>}
        </div>
      </div>
    </div>
  );
}
