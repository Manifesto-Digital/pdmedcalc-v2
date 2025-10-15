import { MadoparDistribution } from '../../calculator/calculator-functions';
import styles from './options.module.scss';

interface Option1Props {
    option1: MadoparDistribution;
}

export default function Option1({ option1 }: Option1Props) {
    const eightAmBigMadoparDose = option1['0800'][0].quantity;
    const eightAmSmallMadoparDose = option1['0800'][1].quantity;
    const twelvePmBigMadoparDose = option1['1200'][0].quantity;
    const twelvePmSmallMadoparDose = option1['1200'][1].quantity;
    const fourPmBigMadoparDose = option1['1600'][0].quantity;
    const fourPmSmallMadoparDose = option1['1600'][1].quantity;
    const eightPmBigMadoparDose = option1['2000'][0].quantity;
    const eightPmSmallMadoparDose = option1['2000'][1].quantity;

    return (
        <div className={styles.overallContainer}>
            <div className={styles.timeContainer + ' ' + `${!eightAmBigMadoparDose && !eightAmSmallMadoparDose ? styles.hideOnMobile : ''}`}>
                <h3 className={'h4 ' + styles.heading}>0800</h3>
                {eightAmBigMadoparDose ? <p className={styles.text}><span id="eightAmBigMadoparDose">{eightAmBigMadoparDose}</span> x Madopar Dispersible 125mg (100mg/25mg)</p> : ''}
                {eightAmSmallMadoparDose ? <p className={styles.text}><span id="eightAmSmallMadoparDose">{eightAmSmallMadoparDose}</span> x Madopar Dispersible 62.5mg (50mg/12.5mg)</p> : ''}
            </div>
            <div className={styles.timeContainer + ' ' + `${!twelvePmBigMadoparDose && !twelvePmSmallMadoparDose ? styles.hideOnMobile : ''}`}>
                <h3 className={'h4 ' + styles.heading}>1200</h3>
                {twelvePmBigMadoparDose ? <p className={styles.text}><span id="twelvePmBigMadoparDose">{twelvePmBigMadoparDose}</span> x Madopar Dispersible 125mg (100mg/25mg)</p> : ''}
                {twelvePmSmallMadoparDose ? <p className={styles.text}><span id="twelvePmSmallMadoparDose">{twelvePmSmallMadoparDose}</span> x Madopar Dispersible 62.5mg (50mg/12.5mg)</p> : ''}
            </div>
            <div className={styles.timeContainer + ' ' + `${!fourPmBigMadoparDose && !fourPmSmallMadoparDose ? styles.hideOnMobile : ''}`}>
                <h3 className={'h4 ' + styles.heading}>1600</h3>
                {fourPmBigMadoparDose ? <p className={styles.text}><span id="fourPmBigMadoparDose">{fourPmBigMadoparDose}</span> x Madopar Dispersible 125mg (100mg/25mg)</p> : ''}
                {fourPmSmallMadoparDose ? <p className={styles.text}><span id="fourPmSmallMadoparDose">{fourPmSmallMadoparDose}</span> x Madopar Dispersible 62.5mg (50mg/12.5mg)</p> : ''}
            </div>
            <div className={styles.timeContainer + ' ' + `${!eightPmBigMadoparDose && !eightPmSmallMadoparDose ? styles.hideOnMobile : ''}`}>
                <h3 className={'h4 ' + styles.heading}>2000</h3>
                {eightPmBigMadoparDose ? <p className={styles.text}><span id="eightPmBigMadoparDose">{eightPmBigMadoparDose}</span> x Madopar Dispersible 125mg (100mg/25mg)</p> : ''}
                {eightPmSmallMadoparDose ? <p className={styles.text}><span id="eightPmSmallMadoparDose">{eightPmSmallMadoparDose}</span> x Madopar Dispersible 62.5mg (50mg/12.5mg)</p> : ''}
            </div>
        </div>
    );
}
