import styles from './options.module.scss'
export default function Option2({ option2 }) {
    //console.log("option 2 is: ", option2)

    return (
        <div className={styles.overallContainer}>
            <div className={styles.timeContainerWide}>
                <h3 className={'h4 ' + styles.heading}>0800</h3>
                <p className={styles.text}>1 x Rotigotine Patch <span id="option2Quantity">{option2}</span>mg (Replace every 24 hours)</p>
            </div>
        </div>
    )
}