import { useBookingStore } from '../store/useBookingStore';
import Image from 'next/image';
import data from '../data-card.json';

export default function BookingChooseRetreat() {
  const selectedRetreatId = useBookingStore((s) => s.selectedRetreatId);
  const setRetreatId = useBookingStore((s) => s.setRetreatId);

  return (
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
            <p className="booking-choose-retreat__card-places">{card.places} places restantes</p>
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
  );
}
