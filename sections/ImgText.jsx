import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '../components/Button';
import LearnMore from '../components/LearnMore';

export default function ImgText({
  imgSrc,
  imgAlt,
  title,
  text,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
  onOpenModal,
  modalImageSrc,
  modalImageAlt,
  modalTitle,
  modalText,
  learnMoreButtonText,
  className = '',
}) {
  const isArray = Array.isArray(imgSrc);
  const images = isArray ? imgSrc : [imgSrc];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState(null);
  const autoSlideRef = useRef();

  // Gestion du défilement automatique
  useEffect(() => {
    if (!isArray || images.length <= 1 || isHovered || isTransitioning) return;
    autoSlideRef.current = setInterval(() => {
      triggerNext();
    }, 6000);
    return () => clearInterval(autoSlideRef.current);
    // eslint-disable-next-line
  }, [images.length, isArray, isHovered, isTransitioning]);

  // Lance la transition vers l'image suivante
  const triggerNext = () => {
    if (isTransitioning) return;
    setNextIndex((currentIndex + 1) % images.length);
    setIsTransitioning(true);
  };
  // Lance la transition vers l'image précédente
  const triggerPrev = () => {
    if (isTransitioning) return;
    setNextIndex((currentIndex - 1 + images.length) % images.length);
    setIsTransitioning(true);
  };

  // Fin de la transition : on change l'image courante
  useEffect(() => {
    if (!isTransitioning || nextIndex === null) return;
    const timeout = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
      setNextIndex(null);
    }, 1500); // 1.5s pour correspondre à la transition CSS
    return () => clearTimeout(timeout);
  }, [isTransitioning, nextIndex]);

  // Stoppe l'auto-slide au survol
  const handleMouseEnter = () => {
    setIsHovered(true);
    clearInterval(autoSlideRef.current);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOpenModal = () => {
    if (onOpenModal) {
      onOpenModal();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <section className={`section-img-text section ${className}`.trim()}>
      {images[0] && (
        <div
          className="section-img-text__slider-wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="section-img-text__img-wrapper">
            {/* Image courante (dessous, s'obscurcit) */}
            <div className="img-transition-stack">
              <Image
                className={`section-img-text__img${isTransitioning ? ' img-darken' : ''}`}
                src={images[currentIndex]}
                alt={Array.isArray(imgAlt) ? imgAlt[currentIndex] : imgAlt || ''}
                width={600}
                height={600}
              />
              {isTransitioning && <span className="img-darken-overlay" />}
              {/* Image suivante (au-dessus, fade-in) */}
              {isTransitioning && nextIndex !== null && (
                <Image
                  className="section-img-text__img img-fade-in"
                  src={images[nextIndex]}
                  alt={Array.isArray(imgAlt) ? imgAlt[nextIndex] : imgAlt || ''}
                  width={600}
                  height={600}
                />
              )}
            </div>
            {/* Points d'indicateur positionnés sur l'image */}
            {isArray && images.length > 1 && (
              <div className="slider-dots">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`slider-dot${idx === (nextIndex !== null ? nextIndex : currentIndex) ? ' slider-dot--active' : ''}`}
                  />
                ))}
              </div>
            )}
            {/* Flèches visibles seulement au hover */}
            {isArray && images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Image précédente"
                  onClick={triggerPrev}
                  className="slider-btn slider-btn--prev"
                  tabIndex={isHovered ? 0 : -1}
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Image suivante"
                  onClick={triggerNext}
                  className="slider-btn slider-btn--next"
                  tabIndex={isHovered ? 0 : -1}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <div className="section-img-text__content">
        {title && <h2 className="section-img-text__content-title">{title}</h2>}
        {text && <div className="section-img-text__content-text">{text}</div>}
        {(modalTitle || modalText) && (
          <Button
            className="button-learn-more"
            label={learnMoreButtonText || 'Lire la suite'}
            onClick={handleOpenModal}
          />
        )}
        {(primaryButtonText || secondaryButtonText) && (
          <div className="section-img-text__content-buttons">
            {secondaryButtonText && (
              <Button
                className="button-secondary"
                label={secondaryButtonText}
                onClick={secondaryButtonAction}
              />
            )}
            {primaryButtonText && (
              <Button
                className="button-primary"
                label={primaryButtonText}
                onClick={primaryButtonAction}
              />
            )}
          </div>
        )}
      </div>
      {isModalOpen && (
        <LearnMore
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageSrc={modalImageSrc}
          imageAlt={modalImageAlt}
          title={modalTitle}
          text={modalText}
        ></LearnMore>
      )}
    </section>
  );
}
