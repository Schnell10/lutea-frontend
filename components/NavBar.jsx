import BurgerMenu from './BurgerMenu';
import Button from './Button';
import SocialMenu from './SocialMenu';

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar__offer">
        <p className="navbar__offer-text">Paiement en 2x disponible</p>
        <Button className="button-gold" label="Réserver une retraite" />
      </div>
      <div className="navbar__usual">
        <div className="navbar__usual-left">
          <BurgerMenu />
        </div>
        <div className="navbar__usual-center">
          <h2 className="name-lutea">Lutea</h2>
        </div>
        <div className="navbar__usual-right">
          <SocialMenu />
        </div>
      </div>
    </div>
  );
}
