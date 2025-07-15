import Link from 'next/link';

export default function Button({ label, spanText, href, onClick, ...props }) {
  // Cas 1 : Navigation interne Next.js
  if (href && href.startsWith('/') && !href.endsWith('.pdf')) {
    return (
      <Link href={href} className="cta-button" {...props}>
        {label}
        {spanText && <span>{spanText}</span>}
      </Link>
    );
  }

  // Cas 2 : Lien externe ou PDF
  if (href) {
    return (
      <a href={href} className="cta-button" target="_blank" rel="noopener noreferrer" {...props}>
        {label}
        {spanText && <span>{spanText}</span>}
      </a>
    );
  }

  // Cas 3 : Action JS (modal, etc.)
  return (
    <button type="button" className="cta-button" onClick={onClick} {...props}>
      {label}
      {spanText && <span>{spanText}</span>}
    </button>
  );
}
