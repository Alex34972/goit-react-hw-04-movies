import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
const Navigation = () => {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={s.NavLink}
        activeClassName={s.activeLink}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={s.NavLink}
        activeClassName={s.activeLink}
      >
        Movies
      </NavLink>
    </nav>
  );
};
export default Navigation;
