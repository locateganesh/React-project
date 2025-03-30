import style from './Header.module.css';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1 className={style.title}>ReactArt</h1>
      <p className={style.paragraph}>A community of artists and art-lovers.</p>
    </header>
  );
}
