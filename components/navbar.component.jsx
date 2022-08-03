import styles from "../styles/Navbar.module.scss"
import Link from "next/link"
import { signOut } from "firebase/auth";
import {auth} from '../firebase/firebase.utils'
import {useRouter} from 'next/router'

const Navbar = ({isLoggedIn}) => {

let router = useRouter()
const onSignOut = () => {

  router.push('/login')
  signOut(auth);
}

return (
    <nav className={styles.dn__container}>      
    <div className={styles.nav__menu} id="nav-menu">
        <Link href="/"><a className={styles.nav__logo}>deNotifier</a></Link>
        <ul className={styles.nav__list}>
            <li className={styles.nav__item}><a className="nav__link active-link"></a></li>
            {isLoggedIn ? <li onClick={onSignOut} className={styles.nav__item}><a className="nav__link">SignOut</a></li>
             : 
            (<><li className={styles.nav__item}><Link href="/login"><a className="nav__link">Login</a></Link></li>
            <li className={styles.nav__item}><Link href="/signup"><a className="nav__link">SignUp</a></Link></li>
            </>)}
        </ul>
    </div>
    </nav>
  )
}

export default Navbar
