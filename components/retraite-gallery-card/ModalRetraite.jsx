import ImgText from 'sections/ImgText';
import { Calendar, Users, Ticket } from 'lucide-react';

export default function ModalRetraite({ selected, onClose }) {
  if (!selected) return null;

  return (
    <div className="modal-retreat-overlay" onClick={onClose}>
      <div className="modal-retreat" onClick={(e) => e.stopPropagation()}>
        <button className="modal-retreat__close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>
        <ImgText
          imgSrc={selected.imageModal}
          imgAlt={selected.altImageModal}
          title={selected.titreCard}
          // Remplacement de 'text' par un composant qui affiche le HTML
          text={<div dangerouslySetInnerHTML={{ __html: selected.texteModal }} />}
          primaryButtonText="Réserver cette retraite"
          hrefButtonPrimary={`/booking?retreat=${selected.id}`}
          secondaryButtonText={selected.boutonPdfLabel}
          secondaryButtonAction={() => window.open(selected.pdfUrl, '_blank')}
        />
        {/* Version bloc 2 lignes avec pictos Lucide */}
        {Array.isArray(selected.dates) && selected.dates.length > 0 && (
          <div className="modal-retreat__infos-table">
            {selected.dates.map((date, idx) => (
              <div className="modal-retreat__infos-block" key={idx}>
                <div className="modal-retreat__infos-row modal-retreat__infos-row--date">
                  <Calendar size={18} className="modal-retreat__infos-icon" />
                  <span>
                    Du{' '}
                    <strong className="text-bold">
                      {new Date(date.start).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </strong>{' '}
                    au{' '}
                    <strong className="text-bold">
                      {new Date(date.end).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </strong>
                  </span>
                </div>
                <div className="modal-retreat__infos-row modal-retreat__infos-row--bottom">
                  <Users size={18} className="modal-retreat__infos-icon" />
                  <span>{selected.places} places restantes</span>
                  <Ticket
                    size={18}
                    className="modal-retreat__infos-icon"
                    style={{ marginLeft: 'auto', marginRight: 6 }}
                  />
                  <span>{selected.prix}€ / personne</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
