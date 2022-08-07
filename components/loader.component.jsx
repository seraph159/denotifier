import styles from '../styles/Loader.module.scss'

const Loader = () => {



  return (
    <div className={styles.svg__container}>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500"  xmlSpace="preserve" width="75" height="75">

    <g id="XMLID_13_">
        <path id="XMLID_27_" className={styles.svg_elem_1} d="M192.2,82v159H57.8v177H235V82H192.2z M192.2,375.2h-91.6v-91.5h91.6V375.2z"></path>
        <g id="XMLID_9_">
            <path id="XMLID_10_" className={styles.svg_elem_2} d="M442.2,81.8v336.4h-36.9l-96.7-215.5v215.5H265V81.8h40l93.5,205.6V81.8H442.2z"></path>
        </g>
    </g>
    <rect id="XMLID_3_" className={styles.svg_elem_3} width="500" height="31.7"></rect>
    <rect id="XMLID_4_" x="0" y="0.5" className={styles.svg_elem_4} width="31.7" height="500"></rect>
    <rect id="XMLID_5_" x="0" y="471.7" className={styles.svg_elem_5} width="500" height="31.7"></rect>
    <rect id="XMLID_6_" x="468.3" y="0.5" className={styles.svg_elem_6} width="31.7" height="500"></rect>
    </svg>
    <span>Loading...</span>
    </div>
  )
}

export default Loader