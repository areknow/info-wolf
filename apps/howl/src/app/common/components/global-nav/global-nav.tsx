import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../../assets/howl-logo.svg';
import styles from './global-nav.module.scss';

export const GlobalNav = () => (
  <div className={styles.globalNav}>
    <div className={styles.logo}>
      <Logo />
    </div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  </div>
);
