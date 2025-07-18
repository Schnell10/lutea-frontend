export default function CardRetraite({ image, titre, categorie, onClick }) {
  return (
    <div className="card-retreat" onClick={onClick}>
      <div className="card-retreat__img-wrapper">
        <img src={image} alt={titre} className="card-retreat__img" />
        <div className="card-retreat__overlay">
          <span className="card-retreat__categorie">{categorie}</span>
        </div>
        <div className="card-retreat__title-container">
          <h3>{titre}</h3>
        </div>
      </div>
    </div>
  );
}
