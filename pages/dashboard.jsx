import {auth} from "../firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from '../components/navbar.component'
import Main from '../components/main.component'
import List from '../components/list.component'
import {useState} from 'react'

const Dashboard = ({}) => {

const [listItem, setListItem] = useState([])

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log(auth.currentUser)
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const handleList = (e) => {
  setListItem([...listItem, {item: e }])
}

  return (
    <>
    <Navbar isLoggedIn={true}/>
    <List listItem={listItem}/>
    <Main handleList={handleList}/>
    </>
  )
}

export default Dashboard