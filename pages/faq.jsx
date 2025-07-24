import { useEffect } from 'react';
import { useBannerStore } from 'store/useBannerStore';
import Accordion from 'components/Accordion';

const items = [
  {
    question: 'Qui peut participer à une retraite LUTÉA ?',
    reponse:
      'Nos retraites sont exclusivement réservées aux femmes, quel que soit l’âge ou la condition physique. Que vous soyez jeune maman, femme active, en reconversion ou simplement en quête de bien-être, vous êtes la bienvenue.',
  },
  {
    question: 'Faut-il avoir un bon niveau en yoga ou pilates pour participer ?',
    reponse:
      'Pas du tout ! Tous les niveaux sont les bienvenus. Nos intervenantes adaptent les séances pour que chacune évolue à son rythme, dans un cadre bienveillant.',
  },
  {
    question: 'Puis-je venir seule ?',
    reponse:
      'Oui, absolument. De nombreuses participantes viennent seules pour s’offrir un moment pour elles. Nos retraites favorisent les échanges, mais respectent aussi les besoins de calme et d’intimité.',
  },
  {
    question: 'Que comprend la formule "all inclusive" ?',
    reponse:
      'Tout est compris : hébergement, repas sains et locaux, activités (yoga, pilates, ateliers créatifs), collations, matériel, etc. Vous n’avez qu’à poser vos valises et vous laisser porter.',
  },
  {
    question: 'Comment réserver ma place ?',
    reponse:
      'Les réservations se font directement via le formulaire de contact ou notre lien Calendly (indiqué sur chaque retraite). Un acompte peut être demandé pour valider votre inscription.',
  },
  {
    question: 'Où ont lieu les retraites ?',
    reponse:
      'Les retraites se déroulent dans les Cévennes, à seulement 45 minutes de Montpellier, dans un lieu sélectionné pour son calme et sa connexion à la nature.',
  },
  {
    question: 'Combien de participantes par retraite ?',
    reponse:
      'Nous limitons volontairement à 12 participantes par session afin de garantir une ambiance intime et un accompagnement personnalisé.',
  },
  {
    question: 'Et si je dois annuler ?',
    reponse:
      'En cas d’annulation, merci de nous contacter rapidement. Les conditions précises (report, remboursement, etc.) sont détaillées dans nos CGV.',
  },
  {
    question: 'Les retraites sont-elles adaptées aux jeunes mamans ?',
    reponse:
      'Certaines retraites sont conçues spécifiquement pour les jeunes mamans, avec un rythme doux et des temps de pause. Consultez les programmes détaillés ou contactez-nous pour être guidée vers la retraite la plus adaptée.',
  },
  {
    question: 'Y a-t-il du temps libre ?',
    reponse:
      'Oui ! Même si chaque journée est rythmée par des activités, des temps calmes sont prévus (repos, piscine, balades, lecture…).',
  },
  {
    question: 'Dois-je apporter du matériel ?',
    reponse:
      "Non, tout est fourni sur place : tapis de yoga, coussins, matériel pour les ateliers, etc. Vous n'avez besoin que de vos effets personnels et de vêtements confortables.",
  },
  {
    question: 'Puis-je offrir une retraite LUTÉA en cadeau ?',
    reponse:
      'Oui, nous proposons des cartes cadeaux personnalisées. Contactez-nous pour en savoir plus.',
  },
];

export default function FAQ() {
  const setBanner = useBannerStore((state) => state.setBanner);
  const resetBanner = useBannerStore((state) => state.resetBanner);

  useEffect(() => {
    setBanner({
      type: 'image',
      src: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
      title: 'FAQ',
      subtitle: 'Toutes les réponses à vos questions sur nos retraites bien-être féminines LUTÉA',
    });
    return () => resetBanner();
  }, [setBanner, resetBanner]);

  return (
    <main className="page-faq">
      <Accordion items={items} />
    </main>
  );
}
