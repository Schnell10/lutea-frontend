import { useState } from 'react';
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
  hrefButtonPrimary,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (onOpenModal) {
      onOpenModal();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <section className={`section-img-full-text section ${className}`.trim()}>
      {imgSrc && (
        <Image
          className="section-img-full-text__img"
          src={imgSrc}
          alt={imgAlt || ''}
          width={600}
          height={600}
        />
      )}
      <div className="section-img-full-text__content">
        {title && <h2 className="section-img-full-text__content-title">{title}</h2>}
        {text && <div className="section-img-full-text__content-text">{text}</div>}

        {/* Bouton "Voir plus" pour la modal */}
        {(modalTitle || modalText) && (
          <Button
            className="button-learn-more"
            label={learnMoreButtonText || 'Lire la suite'}
            onClick={handleOpenModal}
          />
        )}

        {/* Boutons côte à côte */}
        {(primaryButtonText || secondaryButtonText) && (
          <div className="section-img-full-text__content-buttons">
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
                href={hrefButtonPrimary}
              />
            )}
          </div>
        )}
      </div>

      {/* Modal LearnMore */}
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
