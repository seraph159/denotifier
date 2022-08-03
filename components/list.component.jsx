
import styles from '../styles/List.module.scss'


const List = ({listItem}) => {

  return (
    <div className={styles.dn__container}>
        Your Current Digest:
        {listItem.map((e, idx) => (
        <li key={idx}>
            {e.item}
        </li>))}
    </div>
  )
}

export default List