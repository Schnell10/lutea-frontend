import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function SocialMenu() {
  return (
    <ul className="social-menu">
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        <li className="instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </li>
      </a>
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
        <li className="facebook">
          <FontAwesomeIcon icon={faFacebookF} />
        </li>
      </a>
    </ul>
  );
}
