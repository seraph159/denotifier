import '../styles/globals.scss'
import Head from 'next/head'
import Layout from '../components/layout.component'
import { Provider, useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store from '../redux/store'


import { useEffect } from 'react';
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore"
import { useDispatch, useSelector } from 'react-redux';

function MyApp({ Component, pageProps }) {

useEffect(() => {
  const unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
       if (userAuth) {
         // User is signed in
         const userRef = await createUserProfileDocument(userAuth, {
           hNum:"",
           reddit:""
         });
           console.log("userAuth SIGN_IN fired: ", userRef)

 }});

  return () => {
       unsubscribeFromAuth();
     }
}, [])


  return(
    <Provider store={store}>
    <Head>
    <title>deNotifier</title>
    <meta name="description" content="RSS Notifier" />
    <link  mrel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </Provider>
  )
}

export default MyApp