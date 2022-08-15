import styles from "../styles/Navbar.module.scss"
import Link from "next/link"
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebase.utils'
import { useRouter } from 'next/router'
import Logo from './logo.component'
import { useState } from "react";


const Navbar = ({isLoggedIn}) => {

let router = useRouter()
const onSignOut = () => {

  router.push('/login')
  signOut(auth);
}

const [isMenuBtnToggle, setIsMenuBtnToggle] = useState(false);
const dIconClassname = isMenuBtnToggle ? `${styles["change"]} ${styles.d__icon}`
        : styles.d__icon;
const openMenuTipClassname = isMenuBtnToggle ? `${styles["change"]} ${styles.open__menutip}`
        : styles.open__menutip;
const handleMenuBtn = () => {
  setIsMenuBtnToggle(!isMenuBtnToggle)
}

return (
    <nav className={styles.dn__container}>      
    <div className={styles.nav__menu} id="nav-menu">
      <div className={styles.nav__logo}>
      <Link href="/">
        <a className={styles.nav__logo}>
        <Logo width={40} height={40}/>
        <span className={styles.nav__logo__title}>deNotifier</span>
        </a>
      </Link>
      </div>
        <ul className={styles.nav__list}>
            <li className={styles.nav__item}><a className="nav__link active-link"></a></li>
            {isLoggedIn ? <li onClick={onSignOut} className={styles.nav__item__signoutbtn}><a className="nav__link">SignOut</a></li>
             : 
            (<>
            <div className={styles.d__menu}>
            <li className={styles.nav__item}><Link href="/login"><a className="nav__link">Login</a></Link></li>
            <li className={styles.nav__item__signbtn}__><Link href="/signup"><a className="nav__link">Sign Up</a></Link></li>
            </div>
            <div className={dIconClassname} onClick={handleMenuBtn} >
                <div className={styles.line1}></div>
                <div className={styles.line2}></div>
                <div className={styles.line3}></div>
            </div>
            <div className={openMenuTipClassname}>
                  <li className={styles.nav__item__tip}><Link href="/login"><a className="nav__link">Login</a></Link></li>
                  <li className={styles.nav__item__tip}__><Link href="/signup"><a className="nav__link">Sign Up</a></Link></li>
            </div>
            </>)}
        </ul>
    </div>
    {!isLoggedIn &&
    <div className={styles.nav__small}>
      <li className={styles.nav__item__small}><Link href="/login"><a className="nav__link">Login</a></Link></li>
      <li className={styles.nav__item__small}__><Link href="/signup"><a className="nav__link">Sign Up</a></Link></li>
    </div>}
    </nav>
  )
}

export default Navbar
