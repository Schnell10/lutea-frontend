import { useEffect } from 'react';
import { useBannerStore } from 'store/useBannerStore';
import ImgText from '../sections/ImgText';
import ImgDuoText from 'sections/ImgDuoText';
import ImgFullText from 'sections/ImgFullText';

export default function Home() {
  const setBanner = useBannerStore((state) => state.setBanner);
  const resetBanner = useBannerStore((state) => state.resetBanner);

  useEffect(() => {
    setBanner({
      type: 'image',
      src: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
      title: 'Bienvenue',
      subtitle: 'Des retraites bien-être au cœur des Cévennes',
    });
    return () => resetBanner();
  }, [setBanner, resetBanner]);

  return (
    <main className="page-home">
      <ImgText
        // className="right"
        imgSrc={[
          'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-portrait-lutea_ppeoks',
          'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
          'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-portrait-lutea_ppeoks',
          'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
        ]}
        imgAlt={[
          'Maison Lutea - vue 1',
          'Maison Lutea - vue 2',
          'Maison Lutea - vue 3',
          'Maison Lutea - vue 4',
        ]}
        title={
          <>
            Retraites entre femmes,
            <br />
            en pleine nature
          </>
        }
        text={
          <>
            Nos retraites bien-être <strong className="text-bold">entre femmes</strong> vous
            invitent à ralentir, respirer et vous reconnecter.
            <br />
            <br />
            Dans des lieux naturels inspirants, vous vivez une expérience alliant{' '}
            <strong className="text-bold">
              yoga, pilates, alimentation consciente, ostéopathie et développement personnel
            </strong>
            , pour retrouver énergie et sérénité.
          </>
        }
        modalImageSrc="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg"
        modalImageAlt="Vue détaillée de la maison"
        modalText={
          <>
            Pensées pour les femmes en quête de mieux-être,{' '}
            <strong className="text-bold">
              les retraites LUTEA sont une parenthèse pour se recentrer et prendre soin de soi, en
              douceur
            </strong>
            .
            <br />
            <br />
            Guidées par des professionnelles passionnées, elles favorisent le lien, la reconnexion
            et la transformation intérieure.
          </>
        }
        learnMoreButtonText="Découvrir la suite"
      />
      <ImgFullText
        className="right"
        imgSrc="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg"
        imgAlt="Maison Lutea"
        title={<>L’essence de LUTEA</>}
        text={
          <>
            Lutea est né de{' '}
            <strong className="text-bold">
              l’envie de deux professionnelles d’unir leurs expertises pour créer un espace dédié
              aux femmes
            </strong>
            , où le soin, l’écoute et la nature sont au cœur de chaque intention. <br /> <br />
            Chaque détail a été pensé pour offrir un cadre ressourçant, aligné avec les besoins du
            corps, de l’esprit et du moment présent.
          </>
        }
        primaryButtonText="Découvrer le concept"
        hrefButtonPrimary="/concept"
      />
      <ImgDuoText
        className="right"
        imgSrc1="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg"
        imgAlt1="Maison Lutea"
        imgSrc2="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-portrait-lutea_ppeoks"
        imgAlt2="Maison Lutea"
        title="Nos retraites bien-être"
        text={
          <>
            Chaque retraite LUTEA est une expérience différente, avec son atmosphère, ses ateliers
            et son rythme.{' '}
            <strong className="text-bold">
              Yoga, pilates, création, nutrition, nature, temps pour soi…
            </strong>{' '}
            <br />
            <br />
            Les thèmes varient, l’intention reste la même : vous offrir une vraie pause.{' '}
            <strong className="text-bold">Formule tout inclus</strong>, petit groupe, cadre
            apaisant. Vous n’avez qu’à vous laisser porter.
          </>
        }
        primaryButtonText="Réserver une retraite"
        hrefButtonPrimary="/booking"
        secondaryButtonText="Voir le détail des retraites"
        hrefButtonSecondary="/retraites"
      />
    </main>
  );
}
