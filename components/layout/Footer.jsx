import SocialMenu from 'components/SocialMenu';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <SocialMenu />
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
      <div className="footer__copyright">© {new Date().getFullYear()} Lutea</div>{' '}
    </footer>
  );
}
