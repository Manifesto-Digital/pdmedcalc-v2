import styles from './options.module.scss'
export default function Option3({ option3 }) {
    //console.log("option 3 is: ", option3);
    const eightAmBigMadoparDose = option3.madoparDose['0800'][0].quantity;
    const eightAmSmallMadoparDose = option3.madoparDose['0800'][1].quantity;
    const twelvePmBigMadoparDose = option3.madoparDose['1200'][0].quantity;
    const twelvePmSmallMadoparDose = option3.madoparDose['1200'][1].quantity;
    const fourPmBigMadoparDose = option3.madoparDose['1600'][0].quantity;
    const fourPmSmallMadoparDose = option3.madoparDose['1600'][1].quantity;
    const eightPmBigMadoparDose = option3.madoparDose['2000'][0].quantity;
    const eightPmSmallMadoparDose = option3.madoparDose['2000'][1].quantity;

    return (
        <div className={styles.overallContainer}>
            <div className={styles.timeContainer}>
                <h3 className={'h4 ' + styles.heading}>0800</h3>
                {eightAmBigMadoparDose ? <p className={styles.text}>{eightAmBigMadoparDose} x Madopar Dispersible 125mg (100mg/25mg)</p> : ''}
                {eightAmSmallMadoparDose ? <p className={styles.text}>{eightAmSmallMadoparDose} x Madopar Dispersible 62.5mg (50mg/12.5mg)</p> : ''}
                <p className={styles.text}>1 x Rotigotine Patch {option3.rotigotineDose}mg (Replace every 24 hours)</p>
            </div>
            <div className={styles.timeContainer + ' ' + `${!twelvePmBigMadoparDose && !twelvePmSmallMadoparDose ? styles.hideOnMobile : ''}`}>
                <h3 className={'h4 ' + styles.heading}>1200</h3>
                {twelvePmBigMadoparDose ? <p className={styles.text}>{twelvePmBigMadoparDose} x Madopar Dispersible 125mg (100mg/25mg)</p> : ''}
                {twelvePmSmallMadoparDose ? <p className={styles.text}>{twelvePmSmallMadoparDose} x Madopar Dispersible 62.5mg (50mg/12.5mg)</p> : ''}
            </div>
            <div className={styles.timeContainer + ' ' + `${!fourPmBigMadoparDose && !fourPmSmallMadoparDose ? styles.hideOnMobile : ''}`}>
                <h3 className={'h4 ' + styles.heading}>1600</h3>
                {fourPmBigMadoparDose ? <p className={styles.text}>{fourPmBigMadoparDose} x Madopar Dispersible 125mg (100mg/25mg)</p> : ''}
                {fourPmSmallMadoparDose ? <p className={styles.text}>{fourPmSmallMadoparDose} x Madopar Dispersible 62.5mg (50mg/12.5mg)</p> : ''}
            </div>
            <div className={styles.timeContainer + ' ' + `${!eightPmBigMadoparDose && !eightPmSmallMadoparDose ? styles.hideOnMobile : ''}`}>
                <h3 className={'h4 ' + styles.heading}>2000</h3>
                {eightPmBigMadoparDose ? <p className={styles.text}>{eightPmBigMadoparDose} x Madopar Dispersible 125mg (100mg/25mg)</p> : ''}
                {eightPmSmallMadoparDose ? <p className={styles.text}>{eightPmSmallMadoparDose} x Madopar Dispersible 62.5mg (50mg/12.5mg)</p> : ''}
            </div>
        </div>
    )
}