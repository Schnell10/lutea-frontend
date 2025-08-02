import { useState, useEffect } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import data from '../data-card.json';
import validator from 'validator';
import { Plus, Minus, User } from 'lucide-react';

export default function BookingSelectNumber() {
  const selectedRetreatId = useBookingStore((s) => s.selectedRetreatId);
  const selectedPeople = useBookingStore((s) => s.selectedPeople);
  const setPeople = useBookingStore((s) => s.setPeople);
  const participants = useBookingStore((s) => s.participants);
  const addParticipant = useBookingStore((s) => s.addParticipant);
  const updateParticipant = useBookingStore((s) => s.updateParticipant);
  const removeParticipant = useBookingStore((s) => s.removeParticipant);

  const [emailTouched, setEmailTouched] = useState({});

  const retreat = data.find((r) => r.id === selectedRetreatId);
  const prixUnitaire = retreat?.prix || 0;
  const placesDisponibles = retreat?.places || 1;
  const prixTotal = prixUnitaire * (selectedPeople || 1);

  // Initialise le nombre de personnes et le premier participant au chargement
  useEffect(() => {
    if (!selectedPeople) {
      setPeople(1);
    }
  }, [selectedPeople, setPeople]);

  // Initialise le premier participant si nécessaire
  useEffect(() => {
    if (selectedPeople && participants.length === 0) {
      addParticipant({ nom: '', prenom: '', email: '' });
    }
  }, [selectedPeople, participants.length, addParticipant]);

  const handlePeopleChange = (newCount) => {
    if (newCount >= 1 && newCount <= placesDisponibles) {
      setPeople(newCount);

      // Ajuste le nombre de participants si on diminue
      if (newCount < participants.length) {
        // Supprime des participants si nécessaire (garder le premier)
        while (participants.length > newCount) {
          removeParticipant(participants.length - 1);
        }
      }
    }
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipant = { ...participants[index], [field]: value };
    updateParticipant(index, updatedParticipant);
  };

  const handleEmailBlur = (index) => {
    setEmailTouched((prev) => ({ ...prev, [index]: true }));
  };

  const isEmailValid = (email) => {
    return validator.isEmail(email);
  };

  const addParticipantForm = () => {
    if (participants.length < selectedPeople) {
      addParticipant({ nom: '', prenom: '', email: '' });
    }
  };

  const removeParticipantForm = (index) => {
    if (index > 0 && participants.length > 1) {
      // Ne pas supprimer le premier
      removeParticipant(index);
      // Supprime aussi l'état touched pour cet email
      setEmailTouched((prev) => {
        const newTouched = { ...prev };
        delete newTouched[index];
        return newTouched;
      });
    }
  };

  return (
    <div className="booking-select-number">
      <h2 className="booking-select-number__title">Nombre de participants</h2>

      <div className="booking-select-number__content">
        {/* Section gauche : Sélection nombre + prix */}
        <div className="booking-select-number__left">
          <div className="booking-select-number__counter">
            <button
              type="button"
              className="booking-select-number__counter-btn"
              onClick={() => handlePeopleChange((selectedPeople || 1) - 1)}
              disabled={(selectedPeople || 1) <= 1}
            >
              <Minus size={20} />
            </button>

            <span className="booking-select-number__counter-value">{selectedPeople || 1}</span>

            <button
              type="button"
              className="booking-select-number__counter-btn"
              onClick={() => handlePeopleChange((selectedPeople || 1) + 1)}
              disabled={(selectedPeople || 1) >= placesDisponibles}
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="booking-select-number__price">
            <div className="booking-select-number__price-detail">
              <span>{prixUnitaire}€</span>
              <span>× {selectedPeople || 1}</span>
            </div>
            <div className="booking-select-number__price-total">
              <span>Total : {prixTotal}€</span>
            </div>
            <div className="booking-select-number__price-info">
              <span>{placesDisponibles} places disponibles</span>
            </div>
          </div>

          <p className="booking-select-number__price-payment">
            <span>Paiement en 2x ou 3x disponible</span>
          </p>
        </div>

        {/* Section droite : Formulaires participants */}
        <div className="booking-select-number__right">
          <h3 className="booking-select-number__subtitle">Coordonnées des participants</h3>

          <div className="booking-select-number__forms">
            {/* Premier formulaire obligatoire */}
            {participants.length > 0 && (
              <div className="booking-select-number__form">
                <div className="booking-select-number__form-header">
                  <User size={18} />
                  <span>Participant 1 (obligatoire)</span>
                </div>

                <div className="booking-select-number__form-fields">
                  <input
                    type="text"
                    placeholder="Prénom *"
                    value={participants[0].prenom}
                    onChange={(e) => handleParticipantChange(0, 'prenom', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nom *"
                    value={participants[0].nom}
                    onChange={(e) => handleParticipantChange(0, 'nom', e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={participants[0].email}
                    onChange={(e) => handleParticipantChange(0, 'email', e.target.value)}
                    onBlur={() => handleEmailBlur(0)}
                    required
                  />
                  {emailTouched[0] &&
                    participants[0].email &&
                    !isEmailValid(participants[0].email) && (
                      <div className="booking-select-number__error">
                        L'adresse email n'est pas valide.
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* Formulaires supplémentaires (facultatifs) */}
            {participants.slice(1).map((participant, index) => (
              <div key={index + 1} className="booking-select-number__form">
                <div className="booking-select-number__form-header">
                  <User size={18} />
                  <span>Participant {index + 2} (facultatif)</span>
                  <button
                    type="button"
                    className="booking-select-number__form-remove"
                    onClick={() => removeParticipantForm(index + 1)}
                  >
                    <Minus size={16} />
                  </button>
                </div>

                <div className="booking-select-number__form-fields">
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={participant.prenom}
                    onChange={(e) => handleParticipantChange(index + 1, 'prenom', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={participant.nom}
                    onChange={(e) => handleParticipantChange(index + 1, 'nom', e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={participant.email}
                    onChange={(e) => handleParticipantChange(index + 1, 'email', e.target.value)}
                    onBlur={() => handleEmailBlur(index + 1)}
                  />
                  {emailTouched[index + 1] &&
                    participant.email &&
                    !isEmailValid(participant.email) && (
                      <div className="booking-select-number__error">
                        L'adresse email n'est pas valide.
                      </div>
                    )}
                </div>
              </div>
            ))}

            {/* Bouton pour ajouter des participants supplémentaires */}
            {selectedPeople > 1 && participants.length < selectedPeople && (
              <button
                type="button"
                className="booking-select-number__add-btn"
                onClick={addParticipantForm}
              >
                <Plus size={18} />
                Ajouter les coordonnées d'un autre participant (facultatif)
              </button>
            )}

            {/* Message d'information */}
            {selectedPeople > 1 && participants.length === 1 && (
              <div className="booking-select-number__info">
                <p>
                  Vous pouvez ajouter les coordonnées des autres participants si vous le souhaitez
                  (facultatif).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
