import '../styles/globals.scss'
import Head from 'next/head'
import Layout from '../components/layout.component'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../redux/store'


import { useEffect } from 'react';
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";


function MyApp({ Component, pageProps }) {

useEffect(() => {
  const unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
       if (userAuth) {
         // User is signed in
         const userRef = await createUserProfileDocument(userAuth, {
           hn:[],
           reddit:[]
         });
           console.log("userAuth SIGN_IN fired: ", userRef)
 }});

  return () => {
       unsubscribeFromAuth();
     }
}, [])


  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
        <title>deNotifier</title>
        <meta name="description" content="RSS Notifier" />
        <link  mrel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp