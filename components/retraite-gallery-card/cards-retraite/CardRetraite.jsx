export default function CardRetraite({
  image,
  altImage,
  titre,
  onClick,
  places,
  nbJours,
  dates,
  prix,
}) {
  // Formate la date en français (ex: 2025-08-14 -> 14 août 2025)
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  let dateDisplay = '';
  if (Array.isArray(dates) && dates.length > 0 && dates[0].start && dates[0].end) {
    dateDisplay = `Prochaine date du <span class="text-bold">${formatDate(dates[0].start)}</span> au <span class="text-bold">${formatDate(dates[0].end)}</span>`;
  }

  return (
    <div className="card-retreat">
      <div className="card-retreat__img-wrapper">
        <img src={image} alt={altImage} className="card-retreat__img" />
      </div>
      <div className="card-retreat__content">
        <h3 className="card-retreat__title">{titre}</h3>
        <div className="card-retreat__infos">
          <span className="card-retreat__info">{nbJours} jours</span>
          <span className="card-retreat__info">{places} places restante(s)</span>
          <span className="card-retreat__info">{prix} €</span>
        </div>
        {dateDisplay && (
          <div className="card-retreat__dates" dangerouslySetInnerHTML={{ __html: dateDisplay }} />
        )}
        <button className="card-retreat__more-btn button-primary" onClick={onClick} type="button">
          En savoir plus sur cette retraite
        </button>
      </div>
    </div>
  );
}
