import cx from 'class-names';
import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../../assets/howl-logo.svg';
import { useDarkModeContext } from '../../context';
import styles from './global-nav.module.scss';

export const GlobalNav = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggleDarkMode } = useDarkModeContext();

  return (
    <div className={styles.globalNav}>
      <div
        className={styles.logo}
        onClick={() => new Audio('../../../../assets/wolf.wav').play()}
      >
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
          <nav className={cx(menuOpen && styles.open)}>
            <ul>
              <li>
                <NavLink to="/" exact activeClassName={styles.active}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" exact activeClassName={styles.active}>
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles.icon}>
            <i className="gg-more"></i>
          </div>
        </div>
        <button className={styles.trigger} onClick={() => toggleDarkMode()}>
          <div className={cx([styles.icon, dark && styles.darkActive])}>
            <i className="gg-dark-mode"></i>
          </div>
        </button>
      </div>
    </div>
  );
});
