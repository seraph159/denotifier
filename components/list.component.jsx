import styles from '../styles/List.module.scss'
import {updateDoc, arrayRemove} from 'firebase/firestore';
import {onAuthStateChanged} from 'firebase/auth'
import { auth, getUserProfileDocumentRef, createHnDocument } from '../firebase/firebase.utils';

const List = ({listItem}) => {

  let clonedArray = JSON.parse(JSON.stringify(listItem))
  const handleDelete = (e) => {
    let val = e.currentTarget.getAttribute('value')
    let valNum = e.currentTarget.getAttribute('valueNum')
    console.log(val)

    const unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {

      const userRef = await getUserProfileDocumentRef(userAuth)
      if (userAuth) {
        if(val == "hNum"){
        await updateDoc(userRef, {
          hn:[]
        });
      } else{

        var filtered = clonedArray.filter(prop => prop.name !== val)

        clonedArray = filtered
        console.log(filtered)
  
        await updateDoc(userRef, {
        reddit: clonedArray
        });

      }
   }})

   unsubscribeFromAuth()
  }

  return (
    <div >
        {listItem.map((e, idx) => (
        <div className={styles.list__item} key={idx}>
        <li key={idx}>
            {(e.name == "hNum") ? "HN (" + e.rNum + " Posts)" : e.name+ " (" + e.rNum + " Posts)"}
        </li>
        <a onClick={handleDelete} value={e.name} valueNum={e.rNum} className={styles.delete__btn}>Delete</a>
        </div>))
        }
    </div>
  )
}

export default List