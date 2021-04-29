import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../../assets/howl-logo.svg';
import styles from './global-nav.module.scss';

export const GlobalNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.globalNav}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div
        className={styles.actions}
        onMouseEnter={() => {
          setMenuOpen(!menuOpen);
        }}
        onMouseLeave={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <nav className={menuOpen ? styles.open : null}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <span>
          <i className="gg-more"></i>
        </span>
        <span>
          <i className="gg-dark-mode"></i>
        </span>
      </div>
    </div>
  );
};
