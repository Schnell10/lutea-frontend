import SocialMenu from 'components/SocialMenu';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__social-contact">
        <SocialMenu />

        <div className="footer__contact">
          <h3>Contactez-nous</h3>
          <div className="footer__contact-links">
            <Link href="/contact">Formulaire de contact</Link>
            <a href="mailto:contact@lutea-retrat.com">contact@lutea-retrat.com</a>
            <a href="tel:+33672165504">+33 6 72 16 55 04</a>
          </div>
        </div>
      </div>

      <ul className="footer__links">
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
        <li>
          <Link href="/cgu">CGU</Link>
        </li>
        <li>
          <Link href="/cgv">CGV</Link>
        </li>
        <li>
          <Link href="/politique-confidentialite">Politique de confidentialité</Link>
        </li>
        <li>
          <Link href="/plan-du-site">Plan de site</Link>
        </li>
        <li>
          <Link href="#">Cookies</Link>
        </li>
      </ul>

      <div className="footer__copyright">© {new Date().getFullYear()} Lutea</div>
    </footer>
  );
}
