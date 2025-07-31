'use client'

import React, { Suspense } from 'react';
import { redirect, useSearchParams } from 'next/navigation'
import ReferencesAccordion from "../components/references-accordion/ReferencesAccordion"
import Back from "../components/back/Back"
import BackToTop from '../components/back-to-top/BackToTop';
import EnteredMedicines from '../components/entered-medicines/EnteredMedicines'
import Option1 from '../components/options/Option1'
import Option2 from '../components/options/Option2'
import TextBox from '../components/text-box/TextBox';
import styles from './results-page.module.scss'
import { calculateTotalLed, mainTransform } from '../calculator/calculator-functions'

const MainPage = () => {
    const searchParams = useSearchParams()
    const medicines = searchParams.getAll('medicine');
    const frequencies = searchParams.getAll('frequency');

    if (!(medicines.length > 1 && frequencies.length > 1)) { redirect('/'); }

    const medicineObjects = [];
    for (let i = 0; i < medicines.length - 1; i++) {
        medicineObjects.push({ name: medicines[i], frequencyPerDay: frequencies[i] });
    }
    //console.log("med objects ", medicineObjects);
    const calculationResult = mainTransform(medicineObjects);

    return (
        <main id="main-content">
            <Back href='/calculator' text='Back to calculator' />
            <h1 className={styles.heading + ' h2'}>Your Results</h1>
            <p className={styles.text + ' p'}>Based on the entry of the following medications:</p>
            <EnteredMedicines medicineObjects={medicineObjects} />
            <p className={styles.text + ' p'}>
                the total levodopa equivalent dose for this patient is <span className='h6'>{calculateTotalLed(medicineObjects)} mg per day.</span>
            </p>
            {calculateTotalLed(medicineObjects) > 3000 ?
                <p className={styles.text + ' p ' + styles.warning}>This is a very large levodopa equivalent dose. Please recheck the patient’s medications.
                    Please then go back to the medication entry page and re-enter their medications.
                </p> : ''
            }
            <p className={styles.text + ' p'}>
                The equivalent dose of levodopa for this patient can be provided in 2 different ways;
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
            <TextBox isCaution />
            <h2 className={styles.heading + ' h3'}>Notes for use</h2>
            <ul className={styles.bullets}>
                <li className={styles.text + ' p'}>
                    In the context of a patient whose swallow is unsafe, dispersible madopar is typically
                    delivered via naso-gastric tube, in four divided doses per day. These doses are typically
                    administered at 0800, 1200, 1600, 2000.
                </li>
                <li className={styles.text + ' p'}>
                    If a patient usually takes their PD medications at other times, then adjust the
                    delivery of the above to their pre-existing timings.
                </li>
                <li className={styles.text + ' p'}>
                    <strong>If a patient usually takes their PD medications more frequently than four times a day, then divide
                    the total daily dose of madopar to align with their pre-existing frequency.</strong>
                </li>
                <li className={styles.text + ' p'}>
                    Please follow local trust protocols regarding insertion and management of naso-gastric tubes.
                    Please be mindful that inserting and confirming safe placement of an NG tube takes time and that
                    delays in medicines administration for people with PD can be harmful.
                </li>
                <li className={styles.text + ' p'}>
                    Subcutaneous apomorphine should not be commenced without specialist input from the PD team.
                </li>
            </ul>
            <ReferencesAccordion />
            <BackToTop />
        </main>
    )
}

const Results = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <MainPage />
      </Suspense>
    );
}

export default Results;