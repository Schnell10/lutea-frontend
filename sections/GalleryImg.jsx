import { useState, useMemo } from 'react';
import Image from 'next/image';
import data from '../data-card.json';

const conceptImages = [
  {
    url: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-portrait-lutea_ppeoks',
    alt: 'Yoga en nature',
  },
  {
    url: 'https://res.cloudinary.com/docejfkog/image/upload/f_auto,q_auto/test-horizontal_zheyel.jpg',
    alt: 'Atelier créatif',
  },
];

export default function GalleryImg() {
  const categories = useMemo(() => {
    const cats = data.map((item) => item.titreCard).filter(Boolean);
    return Array.from(new Set(cats));
  }, []);

  const retreatImages = useMemo(() => {
    let arr = [];
    data.forEach((item) => {
      const images = Array.isArray(item.imageModal) ? item.imageModal : [item.imageModal];
      const alts = Array.isArray(item.altImageModal) ? item.altImageModal : [item.altImageModal];
      images.forEach((img, idx) => {
        arr.push({
          url: img,
          alt: alts[idx] || '',
          categorie: item.titreCard, // associe à titreCard pour le filtre
        });
      });
    });
    return arr;
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  const imagesToShow = useMemo(() => {
    if (selectedCategory === 'Toutes') return [...conceptImages, ...retreatImages];
    if (selectedCategory === 'Concept') return conceptImages;
    return retreatImages.filter((img) => img.categorie === selectedCategory);
  }, [selectedCategory, retreatImages]);

  // Masonry : répartir les images dans 3 colonnes
  function splitInColumns(images, columnsCount = 3) {
    const columns = Array.from({ length: columnsCount }, () => []);
    images.forEach((img, idx) => {
      columns[idx % columnsCount].push(img);
    });
    return columns;
  }
  const columns = splitInColumns(imagesToShow, 3);

  return (
    <section className="section-gallery">
      <div className="section-gallery__filters">
        <button
          className={selectedCategory === 'Toutes' ? 'active' : ''}
          onClick={() => setSelectedCategory('Toutes')}
        >
          Toutes
        </button>
        <button
          className={selectedCategory === 'Concept' ? 'active' : ''}
          onClick={() => setSelectedCategory('Concept')}
        >
          Concept
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="gallery-img">
        {columns.map((col, colIdx) => (
          <div className="gallery-img__column" key={colIdx}>
            {col.map((img, idx) => (
              <div className="gallery-img__item" key={img.url + idx}>
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={600}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
