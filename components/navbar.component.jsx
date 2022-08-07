import styles from "../styles/Navbar.module.scss"
import Link from "next/link"
import { signOut } from "firebase/auth";
import {auth} from '../firebase/firebase.utils'
import {useRouter} from 'next/router'
import Logo from './logo.component'

const Navbar = ({isLoggedIn}) => {

let router = useRouter()
const onSignOut = () => {

  router.push('/login')
  signOut(auth);
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
            {isLoggedIn ? <li onClick={onSignOut} className={styles.nav__item__signbtn}><a className="nav__link">SignOut</a></li>
             : 
            (<><li className={styles.nav__item}><Link href="/login"><a className="nav__link">Login</a></Link></li>
            <li className={styles.nav__item__signbtn}__><Link href="/signup"><a className="nav__link">Sign Up</a></Link></li>
            </>)}
        </ul>
    </div>
    </nav>
  )
}

export default Navbar
