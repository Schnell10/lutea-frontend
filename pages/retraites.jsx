import { useEffect } from 'react';
import { useBannerStore } from 'store/useBannerStore';
import ImgText from '../sections/ImgText';
import ImgDuoText from 'sections/ImgDuoText';
import GalleryCardsRetraite from 'components/retraite-gallery-card/GalleryCardsRetraite';

export default function Retraites() {
  const setBanner = useBannerStore((state) => state.setBanner);
  const resetBanner = useBannerStore((state) => state.resetBanner);

  useEffect(() => {
    setBanner({
      type: 'image',
      src: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
      title: 'Les retraites',
      subtitle:
        'Découvrez nos retraites bien-être pour femmes, entre pratiques douces et reconnexion à soi',
    });
    return () => resetBanner();
  }, [setBanner, resetBanner]);

  return (
    <main className="page-retraites">
      <ImgText
        // className="right"
        imgSrc="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-portrait-lutea_ppeoks"
        imgAlt="Maison Lutéa"
        title={<>Ralentir, ressentir, se relier</>}
        text={
          <>
            Les retraites LUTÉA sont pensées comme des{' '}
            <strong className="text-bold">bulles hors du quotidien</strong>.
            <br />
            En petit groupe, dans un cadre naturel, chaque séjour mêle yoga, pilates, méditation,
            ateliers créatifs, repas bienveillants et temps pour soi. <br />
            <br />
            Pas deux retraites ne se ressemblent, mais toutes partagent la même intention : vous
            offrir un{' '}
            <strong className="text-bold">
              moment de douceur, de recentrage, et de lien entre femmes
            </strong>
            .
          </>
        }
      />
      <ImgDuoText
        className="right"
        imgSrc1="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg"
        imgAlt1="Maison Lutéa"
        imgSrc2="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-portrait-lutea_ppeoks"
        imgAlt2="Maison Lutéa"
        title="Des lieux choisis avec soin"
        text={
          <>
            Chaque retraite LUTÉA prend vie dans un lieu différent, mais toujours avec la même
            exigence :
            <strong className="text-bold">
              un cadre naturel, ressourçant, intime, propice au lâcher-prise
            </strong>
            .
            <br />
            <br />
            Pas de centre figé ni de lieu unique, ce qui compte, c’est
            <strong className="text-bold">
              l’énergie du lieu, la beauté de l’environnement, et la sensation d’être au bon
              endroit, au bon moment
            </strong>
            .
          </>
        }
        modalText={
          <>
            Du Sud de la France aux portes des Cévennes, en passant peut-être demain par des
            destinations plus lointaines, nous sélectionnons des
            <strong className="text-bold"> maisons, villas ou domaines à taille humaine</strong>,
            pour vous offrir confort, calme et immersion.
          </>
        }
      />
      <ImgText
        // className="right"
        imgSrc="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-portrait-lutea_ppeoks"
        imgAlt="Maison Lutéa"
        title={<>Une cuisine saine et pleine de saveurs</>}
        text={
          <>
            L’alimentation fait partie intégrante de l’expérience LUTÉA. <br />
            <br />
            <strong className="text-bold">Tous les repas sont inclus dans le séjour</strong>, pensés
            pour nourrir le corps sans l’alourdir : une cuisine de saison, végétarienne en majorité,
            à base de produits locaux et soigneusement sélectionnés.
          </>
        }
        learnMoreButtonText="Plus d'infos"
        modalText={
          <>
            Nos menus sont équilibrés, colorés, accessibles, et surtout préparés avec amour.
            <br /> Ils accompagnent naturellement les pratiques bien-être proposées et respectent
            les besoins de chacune. <br /> <br />
            <strong className="text-bold">Manger bien, c’est aussi prendre soin de soi.</strong>
          </>
        }
      />

      <section className="section-retreats">
        <div className="section-retreats__container">
          <h2 className="section-retreats__title">Toutes les retraites LUTÉA</h2>
          <GalleryCardsRetraite />
        </div>
      </section>
    </main>
  );
}
