import { useState } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import Image from 'next/image';
import data from '../data-card.json';
import Button from './Button';
import ModalRetraite from './retraite-gallery-card/ModalRetraite';

export default function BookingChooseRetreat() {
  const selectedRetreatId = useBookingStore((s) => s.selectedRetreatId);
  const setRetreatId = useBookingStore((s) => s.setRetreatId);
  const [selectedModal, setSelectedModal] = useState(null);

  const handleOpenModal = (card) => {
    setSelectedModal(card);
  };

  const handleCloseModal = () => {
    setSelectedModal(null);
  };

  return (
    <>
      <div className="booking-choose-retreat">
        <h2 className="booking-choose-retreat__title">Choisissez votre retraite</h2>
        <div className="booking-choose-retreat__cards">
          {data.map((card, idx) => (
            <div
              className={
                'booking-choose-retreat__card' +
                (selectedRetreatId === card.id ? ' booking-choose-retreat__card--selected' : '')
              }
              key={card.id + idx}
              onClick={() => setRetreatId(card.id)}
            >
              <h3 className="booking-choose-retreat__card-title">{card.titreCard}</h3>
              <div className="booking-choose-retreat__card-places-button">
                <p className="booking-choose-retreat__card-places">
                  {card.places} places restantes
                </p>

                <Button
                  label="Plus d’infos"
                  className="button-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(card);
                  }}
                />
              </div>
              <div className="booking-choose-retreat__card-img-wrapper">
                <Image
                  src={card.imageCard}
                  alt={card.altImageCard}
                  width={600}
                  height={600}
                  className="booking-choose-retreat__card-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalRetraite selected={selectedModal} onClose={handleCloseModal} />
    </>
  );
}
