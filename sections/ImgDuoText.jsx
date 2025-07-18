import { useState } from 'react';
import Image from 'next/image';
import Button from '../components/Button';
import LearnMore from '../components/LearnMore';

export default function ImgDuoText({
  imgSrc1,
  imgAlt1,
  imgSrc2,
  imgAlt2,
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
  hrefButtonSecondary,
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
    <section className={`section-img-duo-text section ${className}`.trim()}>
      <div className="section-img-duo-text__container">
        <div className="section-img-duo-text__img-duo-container">
          <div className="section-img-duo-text__img-duo-container-supperpose">
            {imgSrc1 && (
              <Image
                className="section-img-duo-text__img section-img-duo-text__img--top-right"
                src={imgSrc1}
                alt={imgAlt1 || ''}
                width={400}
                height={400}
              />
            )}
            {imgSrc2 && (
              <Image
                className="section-img-duo-text__img section-img-duo-text__img--bottom-left"
                src={imgSrc2}
                alt={imgAlt2 || ''}
                width={300}
                height={300}
              />
            )}
          </div>
        </div>
        <div className="section-img-duo-text__content">
          {title && <h2 className="section-img-duo-text__content-title">{title}</h2>}
          {text && <div className="section-img-duo-text__content-text">{text}</div>}

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
            <div className="section-img-duo-text__content-buttons">
              {secondaryButtonText && (
                <Button
                  className="button-secondary"
                  label={secondaryButtonText}
                  onClick={secondaryButtonAction}
                  href={hrefButtonSecondary}
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
      </div>
    </section>
  );
}
