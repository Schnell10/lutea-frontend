import { useState, useRef } from 'react';
import validator from 'validator';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactForm() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    message: '',
    rgpd: false,
  });
  const [status, setStatus] = useState(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState('');
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isEmailValid = validator.isEmail(form.email);
  const isFormValid =
    form.nom.trim() &&
    form.prenom.trim() &&
    isEmailValid &&
    form.telephone.trim() &&
    form.message.trim() &&
    form.rgpd;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setRecaptchaError('');
    let token = '';
    try {
      token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
    } catch (err) {
      setStatus('error');
      setRecaptchaError('Erreur reCAPTCHA, veuillez réessayer.');
      return;
    }
    const res = await fetch('/api/resend/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, token }),
    });
    if (res.ok) {
      setStatus('success');
      setForm({ nom: '', prenom: '', email: '', telephone: '', message: '', rgpd: false });
      setEmailTouched(false);
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-form__row">
        <input
          type="text"
          name="nom"
          placeholder="Nom*"
          value={form.nom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom*"
          value={form.prenom}
          onChange={handleChange}
          required
        />
      </div>
      <div className="contact-form__row">
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={form.email}
          onChange={handleChange}
          onBlur={() => setEmailTouched(true)}
          required
        />
        <input
          type="tel"
          name="telephone"
          placeholder="Téléphone*"
          value={form.telephone}
          onChange={handleChange}
          required
        />
      </div>
      {emailTouched && form.email && !isEmailValid && (
        <div className="contact-form__error">L'adresse email n'est pas valide.</div>
      )}
      <textarea
        name="message"
        placeholder="Votre message*"
        value={form.message}
        onChange={handleChange}
        required
      />
      <div className="contact-form__row contact-form__row--checkbox">
        <label className="contact-form__checkbox-label">
          <input type="checkbox" name="rgpd" checked={form.rgpd} onChange={handleChange} required />
          <p className="contact-form__checkbox-label-text">
            En soumettant ce formulaire, j’accepte le traitement de mes données selon les{' '}
            <Link href="/cgu" target="_blank">
              CGU
            </Link>{' '}
            et la{' '}
            <Link href="/politique-confidentialite" target="_blank">
              Politique de Confidentialité
            </Link>
            .
          </p>
        </label>
      </div>
      <button type="submit" disabled={!isFormValid || status === 'loading'}>
        Envoyer
        {status === 'loading' && (
          <span
            className="spinner"
            style={{
              marginLeft: '0.5rem',
              verticalAlign: 'middle',
              display: 'inline-block',
              width: 20,
              height: 20,
            }}
          />
        )}
      </button>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        size="invisible"
        ref={recaptchaRef}
      />
      {recaptchaError && <div className="contact-form__error">{recaptchaError}</div>}
      {status === 'success' && (
        <div className="newsletter__form-message newsletter__form-message--success">
          Message envoyé ✅
        </div>
      )}
      {status === 'error' && (
        <div className="newsletter__form-message newsletter__form-message--error">
          Erreur. Veuillez réessayer.
        </div>
      )}
    </form>
  );
}
