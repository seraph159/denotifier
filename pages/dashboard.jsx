import {auth, getUserProfileDocumentRef} from "../firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from '../components/navbar.component'
import Main from '../components/main.component'
import Card from '../components/card.component'
import Loader from '../components/loader.component'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import List from '../components/list.component'
import { useDispatch, useSelector } from 'react-redux';
import { onSnapshot } from "firebase/firestore"
import { setCurrentUser } from "../redux/features/user/userSlice";

const Dashboard = (props) => {

  const [listItem, setListItem] = useState([])
  const [isLogin, setIsLogin] = useState(false)
 
  let router = useRouter()
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state.user.currentUser
  )

  useEffect(() => {
    
    const unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
     if (userAuth) {
       // User is signed in
       const userRef = await getUserProfileDocumentRef(userAuth)

       console.log(userRef)
       const unSubscribeFromSnapshot = await onSnapshot(userRef, async (snapShot) => {
        
        dispatch(setCurrentUser({
             id: snapShot.id,
             ...snapShot.data()
         }))

       setIsLogin(true);
         //console.log("userAuth SIGN_IN fired: ", userAuth)
       })

} else {
       // User is signed out
       setIsLogin(false)
       //dispatch(setCurrentUser(userAuth)); //userAuth = null after sign out
       // console.log("userAuth SIGN_OUT fired: ", userAuth)
       router.push("/login")
     }
   });

   return () => {
     unsubscribeFromAuth();
   }
 }, [])

 useEffect(() => {
  if (isLogin === false) {
    dispatch(setCurrentUser(null));
  }
}, [isLogin]);

  const handleList = (e) => {
  setListItem([...listItem, {item: e }])
}

  return (
    <>
    {isLogin ?
    <>
    {console.log(currentUser)}
    <Navbar isLoggedIn={true}/>
    <Main handleList={handleList}/>
    <Card headerName={"YOUR CURRENT DIGEST"} contentHeaderItem={[{name:"HACKERNEWS", dNum:currentUser.hn}, {name:"REDDIT", dNum: currentUser.reddit}]}>
    </Card>
    </> : (<Loader></Loader>)
    }
    </>
  )
}

export default Dashboard