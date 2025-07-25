import ContactForm from 'components/ContactForm';
import { useEffect } from 'react';
import { useBannerStore } from 'store/useBannerStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope as faEnvelopeRegular } from '@fortawesome/free-regular-svg-icons';

export default function Contact() {
  const setBanner = useBannerStore((state) => state.setBanner);
  const resetBanner = useBannerStore((state) => state.resetBanner);

  useEffect(() => {
    setBanner({
      type: 'image',
      src: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
      title: 'Contact',
      subtitle:
        'Formulaire de contact pour en savoir plus sur les retraites bien-être féminines LUTÉA',
    });
    return () => resetBanner();
  }, [setBanner, resetBanner]);

  return (
    <main className="page-contact">
      <div className="page-contact__container">
        <h2 className="page-contact__title">Un message, une question ?</h2>
        <div className="page-contact__content">
          <div className="page-contact__content-left">
            <p className="page-contact__content-text">
              Nous sommes <span className="text-bold">à votre écoute pour toute demande </span>
              concernant les retraites, les programmes, les réservations ou les collaborations .
              <br />
              <br />
              <strong className="text-bold"> Vous pouvez nous contacter ici</strong> ou via nos
              canaux habituels :
            </p>
            <div className="page-contact__contact-links">
              <div className="page-contact__contact-link">
                <a href="mailto:contact@lutea.fr" className="page-contact__contact-mail">
                  <FontAwesomeIcon icon={faEnvelopeRegular} />
                  contact@lutea.fr
                </a>
              </div>
              <div className="page-contact__contact-link">
                <a
                  href="https://instagram.com/lutea.retraites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="page-contact__contact-insta"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                  @lutea.retraites
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </main>
  );
}
