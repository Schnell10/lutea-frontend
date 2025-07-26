import { useBookingStore } from '../store/useBookingStore';
import data from '../data-card.json';
import { Calendar, Users, MapPin, Clock, Euro } from 'lucide-react';
import Link from 'next/link';

export default function BookingConfirmation() {
  const selectedRetreatId = useBookingStore((s) => s.selectedRetreatId);
  const selectedDate = useBookingStore((s) => s.selectedDate);
  const selectedPeople = useBookingStore((s) => s.selectedPeople);
  const participants = useBookingStore((s) => s.participants);

  const retreat = data.find((r) => r.id === selectedRetreatId);
  const prixUnitaire = retreat?.prix || 0;
  const prixTotal = prixUnitaire * selectedPeople;

  // Trouve le bloc de dates sélectionné
  const selectedBlock = retreat?.dates.find(({ start, end }) => {
    if (!selectedDate) return false;
    const selectedDateStr = selectedDate.toLocaleDateString('en-CA'); // Format YYYY-MM-DD
    return selectedDateStr >= start && selectedDateStr <= end;
  });

  // Formate les dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Date non définie';
    // Ajouter T00:00:00 pour éviter les problèmes de timezone
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="booking-confirmation">
      <h2 className="booking-confirmation__title">Récapitulatif de votre réservation</h2>

      <div className="booking-confirmation__content">
        {/* Section récapitulatif */}
        <div className="booking-confirmation__summary">
          <h3 className="booking-confirmation__subtitle">Détails de la retraite</h3>

          <div className="booking-confirmation__retreat-info">
            <div className="booking-confirmation__retreat-header">
              <h4 className="booking-confirmation__retreat-title">{retreat?.titreCard}</h4>
            </div>

            <div className="booking-confirmation__retreat-details">
              <div className="booking-confirmation__detail-item">
                <Calendar size={18} />
                <span>
                  Du <strong className="text-bold">{formatDate(selectedBlock?.start)}</strong> au{' '}
                  <strong className="text-bold">{formatDate(selectedBlock?.end)}</strong>
                </span>
              </div>

              <div className="booking-confirmation__detail-item">
                <Users size={18} />
                <span>
                  <strong className="text-bold">{selectedPeople}</strong> participant
                  {selectedPeople > 1 ? 's' : ''}
                </span>
              </div>

              <div className="booking-confirmation__detail-item">
                <Clock size={18} />
                <span>
                  <strong className="text-bold">{retreat?.nbJours}</strong> jour
                  {retreat?.nbJours > 1 ? 's' : ''}
                </span>
              </div>

              <div className="booking-confirmation__detail-item">
                <Euro size={18} />
                <span>
                  <strong className="text-bold">{prixUnitaire}€</strong> par personne
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section participants */}
        <div className="booking-confirmation__participants">
          <h3 className="booking-confirmation__subtitle">Participants</h3>

          <div className="booking-confirmation__participants-list">
            {participants.map((participant, index) => (
              <div key={index} className="booking-confirmation__participant">
                <div className="booking-confirmation__participant-number">
                  Participant {index + 1}
                </div>
                <div className="booking-confirmation__participant-info">
                  <div className="booking-confirmation__participant-name">
                    {participant.prenom} {participant.nom}
                  </div>
                  <div className="booking-confirmation__participant-email">{participant.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section prix */}
        <div className="booking-confirmation__price">
          <h3 className="booking-confirmation__subtitle">Prix</h3>

          <div className="booking-confirmation__price-details">
            <div className="booking-confirmation__price-line">
              <span>
                {prixUnitaire}€ × {selectedPeople}
              </span>
              <span>{prixTotal}€</span>
            </div>
            <div className="booking-confirmation__price-total">
              <span>Total</span>
              <span>
                <strong className="text-bold">{prixTotal}€</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Section mentions légales */}
        <div className="booking-confirmation__legal">
          <h3 className="booking-confirmation__subtitle">Mentions légales</h3>

          <div className="booking-confirmation__legal-content">
            <p>
              En procédant au paiement, vous acceptez nos{' '}
              <Link href="/cgv" target="_blank" className="booking-confirmation__link">
                Conditions Générales de Vente
              </Link>{' '}
              et notre{' '}
              <Link
                href="/politique-confidentialite"
                target="_blank"
                className="booking-confirmation__link"
              >
                Politique de Confidentialité
              </Link>
              .
            </p>

            <p>
              Vos données personnelles seront traitées conformément à notre politique de
              confidentialité pour la gestion de votre réservation et l'amélioration de nos
              services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
