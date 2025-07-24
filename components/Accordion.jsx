import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="accordion">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div className={`accordion__item${isOpen ? ' accordion__item--open' : ''}`} key={idx}>
            <button
              className="accordion__question"
              onClick={() => handleToggle(idx)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${idx}`}
            >
              <span>{item.question}</span>
              <div className="accordion__question-icon">
                <ChevronDown
                  className={`accordion__chevron${isOpen ? ' accordion__chevron--open' : ''}`}
                  size={22}
                />
              </div>
            </button>
            <div
              className={`accordion__panel${isOpen ? ' accordion__panel--open' : ''}`}
              id={`accordion-panel-${idx}`}
              role="region"
              aria-hidden={!isOpen}
            >
              <div className="accordion__answer">{item.reponse}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
