import { redirect } from 'next/navigation'
import Back from "../components/back/Back"
import EnteredMedicines from '../components/entered-medicines/EnteredMedicines'
import Option1 from '../components/options/Option1'
import Option2 from '../components/options/Option2'
import Option3 from '../components/options/Option3'
import styles from './results-page.module.scss'
import { calculateTotalLed, mainTransform } from '../calculator/calculator-utils'

export default function Results(req) {
    console.log(req.searchParams)
    if (!(req.searchParams.medicine && req.searchParams.frequency)) { redirect('/'); }

    const medicineObjects = [];
    for (let i = 0; i < req.searchParams.medicine.length - 1; i++) {
        medicineObjects.push({ name: req.searchParams.medicine[i], frequencyPerDay: req.searchParams.frequency[i] });
    }
    const calculationResult = mainTransform(medicineObjects);

    return (
        <main>
            <Back href='/calculator' text='Back to calulator' />
            <h1 className={styles.heading + ' h2'}>Your Results</h1>
            <p className={styles.text + ' p'}>Based on the entry of the following medications:</p>
            <EnteredMedicines medicineObjects={medicineObjects} />
            <p className={styles.text + ' p'}>
                the total levodopa equivalent dose for this patient is <span className='h6'>{calculateTotalLed(medicineObjects)} mg per day.</span>
            </p>
            <p className={styles.text + ' p'}>
                The equivalent dose of levodopa for this patient can be provided in {Object.keys(calculationResult).length} different ways;
                below is a brief explanation of each option and the accompanying suggested prescription.
            </p>
            <h2 className={styles.heading + ' h5'}>Option 1: </h2>
            <p className={styles.text + ' p'}>
                Conversion of medications for administration via a naso-gastric tube using dispersible
                madopar (co-beneldopa)
            </p>
            <Option1 option1={calculationResult.option1} />
            <h2 className={styles.heading + ' h5'}>Option 2: </h2>
            <p className={styles.text}>Conversion of medications for administration via a rotigotine trans-dermal patch</p>
            <p className={styles.text + ' ' + styles.textFaded}>
                N.B. This option may be considered if a NG tube is contraindicated or unsuitable, or if the
                patient is for palliation.
            </p>
            <Option2 option2={calculationResult.option2} />
            {calculationResult.option3 && (<div>
                <h2 className={styles.heading + ' h5'}>Option 3: </h2>
                <p className={styles.text}>
                    Conversion of usual levodopa containing medications for administration via naso-gastric tube using dispersible madopar (co-beneldopa)
                </p>
                <p className={styles.text}>AND</p>
                <p className={styles.text}>Conversion of usual dopamine agonist medications for administration via rotigotine trans-dermal patch</p>
                <p className={styles.text + ' ' + styles.textFaded}>
                    N.B. This option may be preferred by some Parkinson's Disease specialist doctors and nurses.
                </p>
                <Option3 option3={calculationResult.option3} />
            </div>)}

        </main>
    )
}