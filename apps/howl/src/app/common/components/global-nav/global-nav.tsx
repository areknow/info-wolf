import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../../assets/howl-logo.svg';
import { useDarkModeContext } from '../../context';
import styles from './global-nav.module.scss';

export const GlobalNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggleDarkMode } = useDarkModeContext();

  return (
    <div className={styles.globalNav}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.actions}>
        <div
          className={styles.trigger}
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
          <div className={styles.icon}>
            <i className="gg-more"></i>
          </div>
        </div>
        <button className={styles.trigger} onClick={() => toggleDarkMode()}>
          <div className={styles.icon}>
            <i className="gg-dark-mode"></i>
          </div>
        </button>
      </div>
    </div>
  );
};
