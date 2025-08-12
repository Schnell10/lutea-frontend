import Image from 'next/image';

const values = [
  {
    title: 'Bienveillance et non-jugement',
    description: 'Un espace où l’on peut être soi, pleinement, sans pression.',
    bg: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
  },
  {
    title: 'Pratiques douces et accessibles',
    description: 'Yoga, pilates, méditation... adaptés au rythme et aux besoins de chacune.',
    bg: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
  },
  {
    title: 'Ancrage dans la nature',
    description: 'Des lieux choisis pour leur beauté, leur calme et leur énergie.',
    bg: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
  },
  {
    title: 'Cercle féminin et entraide',
    description: 'Des retraites réservées aux femmes, pour tisser des liens profonds.',
    bg: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
  },
  {
    title: 'Spiritualité libre et simple',
    description: 'Des rituels accessibles, sans dogme, pour nourrir l’âme en douceur.',
    bg: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
  },
  {
    title: 'Tout inclus et sans charge mentale',
    description:
      'Hébergement, repas, activités... tout est prévu pour que vous puissiez vraiment lâcher prise.',
    bg: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
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
              <div className="section-icon__bg">
                {/* Image de fond en cover */}
                {item.bg && (
                  <Image
                    src={item.bg}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={index < 3}
                  />
                )}
                <div className="section-icon__overlay" />
              </div>

              <div className="section-icon__content">
                <h3 className="section-icon__item-title">{item.title}</h3>
                <p className="section-icon__item-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
