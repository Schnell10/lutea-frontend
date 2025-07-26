import Button from '../components/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page-404">
      <div className="page-404__container">
        <h1 className="page-404__title">404</h1>
        <p className="page-404__subtitle">Oups, cette page n'existe pas…</p>
        <Link href="/">
          <Button label="Retour à l'accueil" className="page-404__button button-primary" />
        </Link>
      </div>
    </main>
  );
}
