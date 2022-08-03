import styles from "../styles/Intro.module.scss"
import Link from "next/link"

const Intro = () => {
  return (
    <div className={styles.dn__container}>
        <div className={styles.intro__data__primary}>
        <h1 className={styles.intro__title}>RSS Notifier</h1>
        <h2 className={styles.intro__subtitle}>The lastest custom RSS feed sent straight to your inbox</h2>
        </div>
        <div className={styles.intro__data__secondary}>
        <Link href="/signup"><a className={styles.btn__started}>Get Started</a></Link>
        </div>
    </div>
  )
}

export default Intro