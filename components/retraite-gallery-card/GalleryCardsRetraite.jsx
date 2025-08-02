import { useState } from 'react';
import CardRetraite from './cards-retraite/CardRetraite';
import ModalRetraite from './ModalRetraite';
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
            onClick={() => handleOpen(card)}
          />
        ))}
      </div>

      <ModalRetraite selected={selected} onClose={handleClose} />
    </>
  );
}
