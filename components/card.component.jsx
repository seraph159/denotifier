
import styles from '../styles/Card.module.scss'
import List from '../components/list.component'

const Card = ({children, headerName, contentHeaderItem}) => {
  return (
    <>
    <div className={styles.card__main__container}>
    <div className={styles.card__container}>
      <div className={styles.card__header}>{headerName}</div>
      {contentHeaderItem.map((e, idx)=>
      (<div key={idx} className={styles.card__content}>
        <span className={styles.card__content__title}>{(e.dNum.length !== 0) && e.name}</span>
      <List listItem={e.dNum}></List>
    </div>)
      )}
    </div>
    </div>
    </>
  )
}

export default Card