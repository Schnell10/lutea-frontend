import Image from 'next/image';
import iconBienveillance from '../public/icons/bienveillance.svg';
import iconYoga from '../public/icons/yoga.svg';
import iconNature from '../public/icons/nature.svg';
import iconCercle from '../public/icons/cercle.svg';
import iconSpiritualite from '../public/icons/spiritualite.svg';
import iconInclus from '../public/icons/inclus.svg';

const values = [
  {
    icon: iconBienveillance,
    title: 'Bienveillance et non-jugement',
    description: 'Un espace où l’on peut être soi, pleinement, sans pression.',
  },
  {
    icon: iconYoga,
    title: 'Pratiques douces et accessibles',
    description: 'Yoga, pilates, méditation... adaptés au rythme et aux besoins de chacune.',
  },
  {
    icon: iconNature,
    title: 'Ancrage dans la nature',
    description: 'Des lieux choisis pour leur beauté, leur calme et leur énergie.',
  },
  {
    icon: iconCercle,
    title: 'Cercle féminin et entraide',
    description: 'Des retraites réservées aux femmes, pour tisser des liens profonds.',
  },
  {
    icon: iconSpiritualite,
    title: 'Spiritualité libre et simple',
    description: 'Des rituels accessibles, sans dogme, pour nourrir l’âme en douceur.',
  },
  {
    icon: iconInclus,
    title: 'Tout inclus et sans charge mentale',
    description:
      'Hébergement, repas, activités... tout est prévu pour que vous puissiez vraiment lâcher prise.',
  },
];

export default function SectionIcon() {
  return (
    <section className="section-icon">
      <div className="section-icon__container">
        <h2 className="section-icon__title">Nos valeurs, notre promesse</h2>
        <div className="section-icon__grid">
          {values.map((item, index) => (
            <div key={index} className="section-icon__item">
              <div className="section-icon__icon">
                <Image src={item.icon} alt="" width={40} height={40} />
              </div>
              <h3 className="section-icon__item-title">{item.title}</h3>
              <p className="section-icon__item-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
