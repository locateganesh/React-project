
import Link from "next/link";
import Image from "next/image";
import logoImage from '@/assets/logo.png';
import classes from './main-header.module.css';
import HeaderBg from "./header-bg";
import NavLink from "../nav-link/navLink";

export default function MainHeader() {
    return (
        <>
            <HeaderBg />
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <Image 
                        src={logoImage} 
                        alt="A platf with food on it."
                        priority
                    />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            {/* <Link href="/meals">Browse Meals</Link> */}
                            <NavLink href="/meals">Browse Meals</NavLink>
                        </li>
                        <li>
                            {/* <Link href="/community">Foodie Community</Link> */}
                            <NavLink href="/community">Foodie Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
  );
}