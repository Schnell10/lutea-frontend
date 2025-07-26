import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useBannerStore } from 'store/useBannerStore';
import BookingChooseRetreat from '../components/BookingChooseRetreat';
import BookingCalendar from '../components/BookingCalendar';
import BookingSelectNumber from '../components/BookingSelectNumber';
import BookingConfirmation from '../components/BookingConfirmation';
import BookingPayment from '../components/BookingPayment';
import { useBookingStore } from '../store/useBookingStore';
import validator from 'validator';

const steps = [
  { label: 'Retraite', component: BookingChooseRetreat },
  { label: 'Date', component: BookingCalendar },
  { label: 'Participants', component: BookingSelectNumber },
  { label: 'Confirmation', component: BookingConfirmation },
  { label: 'Paiement', component: BookingPayment },
];

export default function Booking() {
  const router = useRouter();
  const setBanner = useBannerStore((state) => state.setBanner);
  const resetBanner = useBannerStore((state) => state.resetBanner);
  const [step, setStep] = useState(0);
  const pageBookingRef = useRef(null);

  // Sélections du store
  const selectedRetreatId = useBookingStore((s) => s.selectedRetreatId);
  const selectedDate = useBookingStore((s) => s.selectedDate);
  const selectedPeople = useBookingStore((s) => s.selectedPeople);
  const participants = useBookingStore((s) => s.participants);
  const setDate = useBookingStore((s) => s.setDate);
  const setPeople = useBookingStore((s) => s.setPeople);
  const setParticipants = useBookingStore((s) => s.setParticipants);
  const setRetreatId = useBookingStore((s) => s.setRetreatId);

  // Gestion du paramètre d'URL pour pré-sélectionner la retraite
  useEffect(() => {
    console.log(
      'URL Effect - router.isReady:',
      router.isReady,
      'query.retreat:',
      router.query.retreat,
      'selectedRetreatId:',
      selectedRetreatId
    );

    if (router.isReady && router.query.retreat) {
      const retreatId = router.query.retreat; // Utiliser la chaîne directement
      console.log('Setting retreat ID:', retreatId);
      setRetreatId(retreatId);
      setStep(1); // Aller directement à l'étape 2 (sélection de date)
    }
  }, [router.isReady, router.query.retreat, setRetreatId]);

  // Sécurisation du tunnel : vérifier que les étapes précédentes sont complétées
  useEffect(() => {
    if (router.isReady) {
      console.log(
        'Security check - step:',
        step,
        'retreatId:',
        selectedRetreatId,
        'date:',
        selectedDate,
        'people:',
        selectedPeople
      );

      // Étape 1+ : Vérifier qu'une retraite est sélectionnée
      if (step >= 1 && !selectedRetreatId) {
        console.log('Security: No retreat selected, going back to step 0');
        setStep(0);
        return;
      }

      // Étape 2+ : Vérifier qu'une date est sélectionnée
      if (step >= 2 && !selectedDate) {
        console.log('Security: No date selected, going back to step 1');
        setStep(1);
        return;
      }

      // Étape 3+ : Vérifier qu'un nombre de participants est sélectionné ET que le premier participant a des coordonnées valides
      if (step >= 3) {
        if (!selectedPeople) {
          console.log('Security: No participants selected, going back to step 2');
          setStep(2);
          return;
        }

        const firstParticipant = participants[0];
        const isFirstParticipantValid =
          firstParticipant &&
          firstParticipant.nom.trim() &&
          firstParticipant.prenom.trim() &&
          firstParticipant.email.trim() &&
          validator.isEmail(firstParticipant.email);

        if (!isFirstParticipantValid) {
          console.log('Security: Invalid participant data, going back to step 2');
          setStep(2);
          return;
        }
      }
    }
  }, [router.isReady, step, selectedRetreatId, selectedDate, selectedPeople, participants]);

  useEffect(() => {
    setBanner({
      type: 'image',
      src: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
      title: 'Réserver',
    });
    return () => resetBanner();
  }, [setBanner, resetBanner]);

  // Scroll vers le haut quand l'étape change
  useEffect(() => {
    if (pageBookingRef.current) {
      const yOffset = -120; // Offset pour remonter un peu plus haut
      const element = pageBookingRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [step]);

  // Fonction pour réinitialiser les étapes suivantes
  const resetFollowingSteps = (currentStep) => {
    if (currentStep < 1) {
      setDate(null);
      setPeople(null);
      setParticipants([]);
    } else if (currentStep < 2) {
      setPeople(null);
      setParticipants([]);
    } else if (currentStep < 3) {
      setParticipants([]);
    }
  };

  // Validation de l'étape courante
  const isStepValid = () => {
    if (step === 0) return !!selectedRetreatId;
    if (step === 1) return !!selectedDate;
    if (step === 2) {
      // Vérifie qu'on a sélectionné un nombre de personnes ET que le premier participant a rempli ses coordonnées
      const firstParticipant = participants[0];
      const isFirstParticipantValid =
        firstParticipant &&
        firstParticipant.nom.trim() &&
        firstParticipant.prenom.trim() &&
        firstParticipant.email.trim() &&
        validator.isEmail(firstParticipant.email);

      return !!selectedPeople && isFirstParticipantValid;
    }
    // Pour Confirmation et Paiement, on laisse toujours passer (ou tu peux ajouter une validation spécifique)
    return true;
  };

  // Navigation vers une étape (seulement vers les étapes précédentes ou actuelles)
  const goToStep = (targetStep) => {
    // Sécurisation : empêcher l'accès aux étapes futures
    if (targetStep > step) {
      console.log('Security: Attempting to access future step', targetStep, 'from step', step);
      return;
    }

    // Si on va à l'étape 0 (retraite), on réinitialise tout sauf la retraite
    if (targetStep === 0) {
      resetFollowingSteps(0);
    }
    // Si on va à l'étape 1 (date), on réinitialise les étapes 2, 3, 4
    else if (targetStep === 1) {
      resetFollowingSteps(1);
    }
    setStep(targetStep);
  };

  // Navigation précédente
  const goToPreviousStep = () => {
    const previousStep = Math.max(0, step - 1);
    // Si on va à l'étape 0 (retraite), on réinitialise tout sauf la retraite
    if (previousStep === 0) {
      resetFollowingSteps(0);
    }
    // Si on va à l'étape 1 (date), on réinitialise les étapes 2, 3, 4
    else if (previousStep === 1) {
      resetFollowingSteps(1);
    }
    setStep(previousStep);
  };

  const StepComponent = steps[step].component;

  return (
    <main className="page-booking" ref={pageBookingRef}>
      <div className="booking-container">
        <div className="booking-steps">
          {steps.map((s, idx) => (
            <div
              key={s.label}
              className={`booking-step${idx === step ? ' booking-step--active' : ''}${idx < step ? ' booking-step--done' : ''}`}
              onClick={() => goToStep(idx)}
              style={{ cursor: idx <= step ? 'pointer' : 'default' }}
            >
              <span className="booking-step__number">{idx + 1}</span>
              <span className="booking-step__label">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="booking-step-content">
          <StepComponent />
        </div>
        <div className={`booking-step-actions ${step > 0 ? 'both-button-active' : ''}`}>
          {step > 0 && (
            <button className="booking-step__btn" onClick={goToPreviousStep}>
              Précédent
            </button>
          )}
          <button
            className="booking-step__btn booking-step__btn--primary"
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1 || !isStepValid()}
          >
            Suivant
          </button>
        </div>
      </div>
    </main>
  );
}
