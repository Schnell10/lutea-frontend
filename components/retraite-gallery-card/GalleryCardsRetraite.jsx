import { useState } from 'react';
import CardRetraite from './cards-retraite/CardRetraite';
import ImgText from 'sections/ImgText';
import data from '../../data-card.json';

export default function GalleryCardsRetraite() {
  const [selected, setSelected] = useState(null);

  const handleOpen = (card) => setSelected(card);
  const handleClose = () => setSelected(null);

  return (
    <>
      <div className="gallery-cards-retreat">
        {data.map((card, idx) => (
          <CardRetraite
            key={card.id + idx}
            image={card.imageCard}
            altImage={card.altImageCard}
            titre={card.titreCard}
            places={card.places}
            nbJours={card.nbJours}
            dates={card.dates}
            prix={card.prix}
            texteModal={card.texteModal}
            onClick={() => handleOpen(card)}
          />
        ))}
      </div>

      {selected && (
        <div className="modal-retreat-overlay" onClick={handleClose}>
          <div className="modal-retreat" onClick={(e) => e.stopPropagation()}>
            <button className="modal-retreat__close" onClick={handleClose} aria-label="Fermer">
              ✕
            </button>
            <ImgText
              imgSrc={selected.imageModal}
              imgAlt={selected.altImageModal}
              title={selected.titreModal}
              // Remplacement de 'text' par un composant qui affiche le HTML
              text={<div dangerouslySetInnerHTML={{ __html: selected.texteModal }} />}
              primaryButtonText={selected.boutonReserverLabel}
              primaryButtonAction={() => alert('Réservation à implémenter')}
              secondaryButtonText={selected.boutonPdfLabel}
              secondaryButtonAction={() => window.open(selected.pdfUrl, '_blank')}
            />
          </div>
        </div>
      )}
    </>
  );
}
