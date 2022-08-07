import Head from 'next/head'
import Image from 'next/image'
import Intro from "../components/intro.component"
import Main from "../components/main.component"
import Navbar from '../components/navbar.component'
import Footer from '../components/footer.component'
import styles from '../styles/Home.module.scss'

function Home() {

  return (
    <div className={styles.container}>
        <Head>
        <title>deNotifier</title>
        <meta name="description" content="RSS Notifier" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Intro />
        <Main isHomePage={true}/>
        <Footer />
    </div>
  )
}


export default Home
