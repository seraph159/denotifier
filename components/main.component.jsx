import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState } from 'react';
import { auth, createHnDocument, createRedditDocument } from "../firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/router'

import styles from '../styles/Main.module.scss'

const Main = ({handleList, isHomePage}) => {

let router = useRouter()
const [inputErrorToggle, setInputErrorToggle] = useState(false)
const [state, setState] = useState({
  rSource:"hn",
  numPost:5,
  subRedditToggle:false,
  subReddit:""
 })

 const options = [
        'HackerNews', 'Reddit'
      ];

 const optionsNum = [
        '5', '10', '15'
      ];
      
 const defaultOption = options[0];
 const defaultOptionNum = optionsNum[0];
      
 const handleSource = (e) => {
  console.log(e.value == "HackerNews")
  if(e.value == "HackerNews")
    setState({...state, rSource:"hn", subRedditToggle:false})
  else
    setState({...state, rSource:"reddit", subRedditToggle:true})
 }

 const handlePost = (e) => {
  setState({...state, numPost:parseInt(e.value)})
}

const handleInput = (e) => {
  setState({...state, subReddit:e.target.value})
}

const handleDigest = () => {
  router.push('/login')
}

const handleAddDigest = (e) => {

  e.preventDefault();

  let {rSource, numPost, subReddit} = state;

  const unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
    if (userAuth) {

      if(rSource == "hn"){
      console.log(numPost)
      await createHnDocument(userAuth, {
        name:"hNum", rNum:numPost
      });
      handleList(`HackerNews (${numPost} Posts)`)
    } else if(rSource == "reddit"){

      if(subReddit.trim().length !== 0){
      console.log(numPost + "reddit " + subReddit) 
      await createRedditDocument(userAuth, 
        {name:subReddit, rNum:numPost}
      );
      setInputErrorToggle(false)
      handleList(`r/${subReddit} (${numPost} Posts)`)
    }
      else {
        console.log(numPost + "reddit ghgh") 
        setInputErrorToggle(true)
      }
    }
 } else{
      router.push('/login')
 }})

 unsubscribeFromAuth()
} 

  return (
    <div className={styles.dn__container}>
      <div className={styles.dn__header}>Add New Digest</div>
    <div className={styles.main__left}>
      <div className={styles.main__item}>
        RSS Source:
        <div className={styles.main__dropdown}>
        <Dropdown options={options} onChange={handleSource} value={defaultOption} placeholder="Select an option" />
        </div>
      </div>
      {state.subRedditToggle && 
      <div className={styles.main__item}>
        Subreddit:
        <div className={styles.main__input}>
        {!inputErrorToggle ? (<input
          type="text"
          value={state.value}
          onChange={handleInput}
          placeholder="Enter a subreddit"
        />) : (<><input
          type="text"
          value={state.value}
          onChange={handleInput}
          placeholder="Enter a subreddit"
        /><span className={styles.main__input__text}>Please enter the subreddit name</span></>)}
        </div>
      </div>}
      <div className={styles.main__item}>
        Number of Posts:
        <div className={styles.main__dropdown}>
        <Dropdown options={optionsNum} onChange={handlePost} value={defaultOptionNum} placeholder="Select an option" />
        </div>
      </div>
    </div>
    <div className={styles.main__right}>
    <a onClick={isHomePage ? handleDigest : handleAddDigest} className={styles.btn__digest}>Add Digest</a>
    </div>
    </div>
  )
}

export default Main