import styles from './options.module.scss';

interface Option2Props {
    option2: number;
}

export default function Option2({ option2 }: Option2Props) {
    return (
        <div className={styles.overallContainer}>
            <div className={styles.timeContainerWide}>
                <h3 className={'h4 ' + styles.heading}>0800</h3>
                <p className={styles.text}>1 x Rotigotine Patch <span id="option2Quantity">{option2}</span>mg (Replace every 24 hours)</p>
            </div>
        </div>
    );
}
