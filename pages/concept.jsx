import { useEffect } from 'react';
import ImgDuoText from 'sections/ImgDuoText';
import ImgText from 'sections/ImgText';
import ImgFullText from 'sections/ImgFullText';
import { useBannerStore } from 'store/useBannerStore';
import SectionIcon from 'sections/sectionIcon';

export default function Concept() {
  const setBanner = useBannerStore((state) => state.setBanner);
  const resetBanner = useBannerStore((state) => state.resetBanner);

  useEffect(() => {
    setBanner({
      type: 'image',
      src: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
      title: 'Le Concept',
      subtitle:
        'Retraites bien-être pour femmes alliant yoga, spiritualité et ateliers créatifs dans un cadre apaisant',
    });
    return () => resetBanner();
  }, [setBanner, resetBanner]);

  return (
    <main className="page-concept">
      <ImgDuoText
        // className="right"
        imgSrc1="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg"
        imgAlt1="Maison Lutéa"
        imgSrc2="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-portrait-lutea_ppeoks"
        imgAlt2="Maison Lutéa"
        title="Reconnexion, douceur et sororité"
        text={
          <>
            LUTÉA propose des retraites bien-être pensées comme des{' '}
            <strong className="text-bold">bulles hors du temps</strong>. Dans un cadre intimiste,
            entre femmes, nous créons un espace de pause, d’écoute et de retour à soi. <br />
            <br />
            Chaque séjour mêle pratiques douces (yoga, pilates, méditation), ateliers créatifs,
            connexion à la nature et spiritualité accessible.
            <strong className="text-bold"> Loin du bruit, proche de l’essentiel.</strong>
          </>
        }
      />
      <ImgFullText
        className="right"
        imgSrc="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg"
        imgAlt="Maison Lutéa"
        title={<>Notre vision</>}
        text={
          <>
            Notre vision du bien-être va au-delà du physique. <br />
            Chez LUTÉA, nous croyons en un{' '}
            <strong className="text-bold">
              équilibre subtil entre le corps, l’esprit et l’émotionnel
            </strong>
            . <br />
            <br />
            Chaque retraite est pensée comme un espace de lenteur, de lien et de liberté intérieure.
            On y respire, on y crée, on y partage. Sans injonction, sans masque. Juste soi. <br />{' '}
            <br />
            C’est une{' '}
            <strong className="text-bold">
              reconnexion à l’essentiel, à travers des pratiques douces, des rituels simples, et la
              force du cercle féminin
            </strong>
            .
          </>
        }
      />
      <div className="section-author">
        <h2 className="section-author__title">Deux femmes, une vision</h2>
        <ImgText
          className="right"
          imgSrc="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-portrait-lutea_ppeoks"
          imgAlt="Maison Lutéa"
          title={<>Caroline, l’écoute du corps et du cœur</>}
          text={
            <>
              Ostéopathe depuis plus de 10 ans,{' '}
              <strong className="text-bold">
                Caroline place le corps au centre de son approche
              </strong>
              . <br /> <br />
              Elle guide les participantes avec une{' '}
              <strong className="text-bold">
                attention fine aux tensions, aux blocages et aux besoins physiologiques profonds
              </strong>
              . <br />
              Son regard de thérapeute apporte une dimension de conscience corporelle unique à
              chaque retraite. <br /> <br />
              Avec elle, on apprend à habiter son corps autrement, à lâcher ce qui pèse, et à faire
              de l’écoute de soi un véritable soin.
            </>
          }
        />
        <ImgText
          // className="right"
          imgSrc="https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-portrait-lutea_ppeoks"
          imgAlt="Maison Lutéa"
          title={<>Stéphanie Chaker</>}
          text={
            <>
              Coach sportive et professeure de pilates,{' '}
              <strong className="text-bold">
                Stéphanie incarne l’énergie du mouvement doux, conscient et aligné
              </strong>
              . <br /> <br />
              Elle accompagne les participantes dans des{' '}
              <strong className="text-bold">
                pratiques accessibles, respectueuses du rythme de chacune
              </strong>
              , avec générosité et enthousiasme.
              <br /> <br />
              Son approche mêle dynamisme, ancrage et bienveillance, pour un vrai retour à soi, à
              travers le corps.
            </>
          }
        />
      </div>
      <SectionIcon />
    </main>
  );
}
