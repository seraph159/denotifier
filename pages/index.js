import Head from 'next/head'
import Image from 'next/image'
import Intro from "../components/intro.component"
import Main from "../components/main.component"
import Navbar from '../components/navbar.component'
import Footer from '../components/footer.component'
import styles from '../styles/Home.module.scss'

import { useEffect } from 'react';
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore"
import { connect } from 'react-redux';
import {setCurrentUser as setUser} from '../redux/user/user.actions'


function Home() {

  
  const setCurrentUser = setUser;


  useEffect(() => {


   let isCurrentUserLoggedIn = null;
   const unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User 

        const userRef = await createUserProfileDocument(userAuth, {
          hNum:"",
          reddit:""
        });

        const unSubscribeFromSnapshot = onSnapshot(userRef, (snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          // console.log("userAuth SIGN_IN fired: ", this.props)
          console.log("userAuth SIGN_IN fired: ", userAuth)
          isCurrentUserLoggedIn = true;
        })

        //media queries
        // const handleMediaSize = e => document.body.classList.add('nav-function-minify');
        // window.matchMedia("(max-width: 576px)").addEventListener('change', handleMediaSize);



        // ...
} else {
        // User is signed out
        setCurrentUser({currentUser: userAuth});
        // console.log("userAuth SIGN_OUT fired: ", userAuth)
        isCurrentUserLoggedIn = false;
      }
    });

    return () => {
      unsubscribeFromAuth();
    }
  }, [])

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

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
