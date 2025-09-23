import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

const NAVLINK = [
  {id: 1, path: '', label: 'Home'},
  {id: 2, path: 'events', label: 'Events'},
  {id: 3, path: 'newslatter', label: 'Newsletter'}
]

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {NAVLINK.map(link => <li key={link.id}><NavLink to={link.path} className={({isActive}) => isActive ? classes.active : ''}>{link.label}</NavLink></li>)}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
