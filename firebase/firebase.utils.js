import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; 


const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOM,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PJT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STG_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURE_ID
};

  const firebaseApp =  initializeApp(config);

  export const auth = getAuth(firebaseApp);
  export const firestore = getFirestore(firebaseApp)


  export const getUserDocument = async () => {

    const userRef = collection(firestore, "users");
    const snapShot = await getDocs(userRef);
    let newArray = [];
      try{
        await snapShot.forEach(doc => {
          newArray.push(doc.data())
          console.log(doc.data());
      })
      } catch(err){
        console.log("error creating user", err.message)
      }

    return newArray
  }

  export const getUserProfileDocumentRef = async (userAuth) => {
    if(!userAuth) return; //if userAuth is null then exit

    const userRef = doc(firestore, "users", userAuth.uid);

    return userRef;
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; //if userAuth is null then exit

    const userRef = doc(firestore, "users", userAuth.uid);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userRef, {
          displayName,
          email,
          createdAt,
          ...additionalData
        }, { merge: true });
      } catch(err){
        console.log("error creating user", err.message)
      }
    } 

    return userRef;
  }

  export const createHnDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; //if userAuth is null then exit

    const userRef = doc(firestore, "users", userAuth.uid);

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
        await setDoc(userRef, {
          email,
          createdAt,
          hn:[additionalData]
        }, { merge: true });
      } catch(err){
        console.log("error creating hn document", err.message)
      } 

    return userRef;
  }

  export const createRedditDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; //if userAuth is null then exit

    const userRef = doc(firestore, "users", userAuth.uid);
    const snapShot = await getDoc(userRef);

    try{
    if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

        await setDoc(userRef, {
          email,
          createdAt,
          reddit:additionalData
        }, { merge: true });

    } else {
      await updateDoc(userRef, {
        reddit: arrayUnion(additionalData)
    });
    }
  } catch(err){
    console.log("error creating hn document", err.message)
  } 

    return userRef;
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => signInWithPopup(auth, provider);