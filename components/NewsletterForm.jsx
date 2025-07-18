import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { subscribeToBrevo } from '../lib/newsletter/subscribeBrevo';
import Link from 'next/link';
import validator from 'validator';
import { Mail, Sun, Leaf, Sprout } from 'lucide-react';

export default function NewsletterForm() {
  // States pour l'email, le consentement RGPD et les messages
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  // Référence au composant reCAPTCHA (invisible)
  const recaptchaRef = useRef(null);

  const isEmailValid = validator.isEmail(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consent) {
      setMessage("Merci d'accepter notre politique de confidentialité.");
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Exécution invisible du reCAPTCHA → génère un token
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      // Appel à notre fonction frontend → API backend
      const result = await subscribeToBrevo(email, token);
      setMessage(result.message);
      setEmail('');
      setConsent(false);
    } catch (err) {
      setMessage(err.message || 'Erreur lors de l’envoi');
    }

    setLoading(false);
  };

  return (
    <div className="section-newsletter">
      <div className="newsletter__container">
        <div className="newsletter-decor-icons">
          <Mail className="icon" />
          <Sprout className="icon" />
          <Leaf className="icon" />
          <Sun className="icon" />
          <Mail className="icon" />
          <Leaf className="icon" />
          <Sprout className="icon" />
        </div>
        <div className="newsletter__content">
          <h2 className="newsletter__content-title">Rejoignez la communauté LUTÉA</h2>
          <p className="newsletter__content-text">
            Recevez nos retraites en avant-première, nos conseils bien-être et toute l’actualité
            LUTÉA dans votre boîte mail.
          </p>
        </div>
        <form className="newsletter__form" onSubmit={handleSubmit}>
          <div className="newsletter__form-input-container">
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              required
              className="newsletter__form-input"
            />

            <button
              type="submit"
              disabled={loading || !consent || !email || !isEmailValid}
              className="newsletter__form-button"
            >
              {loading ? (
                <>
                  Envoi...
                  <span className="spinner" />
                </>
              ) : (
                'S’inscrire'
              )}
            </button>
          </div>

          <label className="newsletter__form-label">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="newsletter__form-checkbox"
            />
            <p className="newsletter__form-label-text">
              En m’inscrivant, j’accepte que mes informations soient traitées selon les
              <Link href="/cgu"> CGU</Link> et la
              <Link href="/politique-confidentialite"> Politique de Confidentialité</Link>.*
            </p>
          </label>

          {emailTouched && email && !isEmailValid && (
            <p className="newsletter__form-error">Veuillez entrer un email valide.</p>
          )}

          {/* reCAPTCHA invisible (badge reste en bas de l’écran) */}
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            size="invisible"
            ref={recaptchaRef}
          />

          {message && <p className="newsletter__form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
