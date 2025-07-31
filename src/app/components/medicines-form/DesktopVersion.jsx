'use client'

import { useState } from 'react'
import { medications } from '@/app/data/data'
import styles from './medicines-form.module.scss'

export function DesktopVersion() {

    function OneMedInput({ thisMedInput, allMedInputs, setMedInputs }) {
        const medicines = Object.keys(medications);
        const frequencies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const add = (e) => {
            e.preventDefault();

            const selectedMedicine = document.querySelector(`#med-input-desktop-${thisMedInput.id}`);
            const selectedFrequency = document.querySelector(`#freq-for-med-input-desktop-${thisMedInput.id}`);
            const medicineErrorMessage = document.querySelector(`#error-message-for-med-input-${thisMedInput.id}`);
            const frequencyErrorMessage = document.querySelector(`#freq-error-message-for-med-input-${thisMedInput.id}`);

            //to prevent unfilled values; should only proceed if both medicine and frequency are filled out
            if (!selectedMedicine.value) {
                medicineErrorMessage.classList.remove('hide');
                selectedMedicine.classList.add(styles.errorBox);
            }
            if (!selectedFrequency.value) {
                frequencyErrorMessage.classList.remove('hide');
                selectedFrequency.classList.add(styles.errorBox);
            }

            if (selectedMedicine.value && selectedFrequency.value) {
                //add another <OneMedInput />
                const newMedInputs = [...allMedInputs];
                const index = newMedInputs.findIndex((medInput) => medInput.id === thisMedInput.id);
                newMedInputs[index].added = true;
                newMedInputs.push({ id: thisMedInput.id + 1, values: { medicine: '', frequency: '', added: false } })
                setMedInputs(newMedInputs);
            }
        }

        const handleMedChange = (e) => {
            if (e.target.value != '') {
                e.target.classList.remove(styles.errorBox);
                e.target.previousElementSibling.classList.add('hide');
            }
            const newMedInputs = [...allMedInputs];
            const index = newMedInputs.findIndex((medInput) => medInput.id === thisMedInput.id);
            newMedInputs[index].values.medicine = e.target.value;
            setMedInputs(newMedInputs);
        };

        const handleFreqChange = (e) => {
            if (e.target.value != '') {
                e.target.classList.remove(styles.errorBox);
                e.target.previousElementSibling.classList.add('hide');
            }
            const newMedInputs = [...allMedInputs];
            const index = newMedInputs.findIndex((medInput) => medInput.id === thisMedInput.id);
            newMedInputs[index].values.frequency = e.target.value;
            setMedInputs(newMedInputs);
        };

        const reset = (e) => {
            e.preventDefault();

            const newMedInputs = [...allMedInputs];
            const index = newMedInputs.findIndex((medInput) => medInput.id === thisMedInput.id);
            newMedInputs[index].values = { medicine: '', frequency: '', added: false };
            setMedInputs(newMedInputs);
        }

        const removeRow = (e) => {
            e.preventDefault();
            const copy = [...allMedInputs];
            const index = copy.findIndex((medInput) => medInput.id === thisMedInput.id);
            const allPreviousMedInputs = copy.slice(0, index);
            const allSubsequentMedInputs = copy.slice(index + 1);
            const newMedInputs = [...allPreviousMedInputs, ...allSubsequentMedInputs];
            setMedInputs(newMedInputs);
        }


        return (
            <div className={styles.selectsAndButtonsContainer}>
                <div className={styles.selectAndErrorContainer}>
                    <p id={`error-message-for-med-input-${thisMedInput.id}`} className={'h6' + ' ' + styles.errorMessage + ' ' + 'hide'}>Select dose</p>
                    <label for={`med-input-desktop-${thisMedInput.id}`} className='sr-only'>Select the medicine that the patient is on.</label>
                    <select id={`med-input-desktop-${thisMedInput.id}`} name="medicine" onChange={handleMedChange} className={(thisMedInput.values.medicine ? styles.selected : '') + ' p ' + styles.select}>
                        <option value="">Select</option>
                        {thisMedInput.values.medicine && <option selected value={thisMedInput.values.medicine}>{thisMedInput.values.medicine}</option>}
                        {medicines.filter(med => med !== thisMedInput.values.medicine).map((med, index) => <option key={index} value={med}>{med}</option>)}
                    </select>

                </div>

                <div className={styles.selectAndErrorContainer}>
                    <p id={`freq-error-message-for-med-input-${thisMedInput.id}`} className={'h6' + ' ' + styles.errorMessage + ' ' + 'hide'}>Select number per 24 hours</p>
                    <label for={`freq-for-med-input-desktop-${thisMedInput.id}`} className='sr-only'>Select the number of times per day that the patient takes this medicine.</label>
                    <select id={`freq-for-med-input-desktop-${thisMedInput.id}`} name="frequency" onChange={handleFreqChange} className={(thisMedInput.values.frequency ? styles.selected : '') + ' p ' + styles.select}>
                        <option value="">Select</option>
                        {thisMedInput.values.frequency && <option selected value={thisMedInput.values.frequency}>{thisMedInput.values.frequency}</option>}
                        {frequencies.filter(freq => freq != thisMedInput.values.frequency).map((freq, index) => <option key={index} value={freq}>{freq}</option>)}
                    </select>
                </div>

                <div className={styles.addAndRemoveButtonsContainer}>
                    <p className='sr-only' id={`add-btn-desktop-description-${thisMedInput.id}`}>Include this medicine in the conversion to a &apos;Levodopa equivalent dose&apos; of dispersible madopar.</p>
                    <button type='click' id={`add-btn-desktop-${thisMedInput.id}`} onClick={add} className={styles.add + ' p ' + (thisMedInput.added ? 'hide' : '')} aria-describedby={`add-btn-desktop-description-${thisMedInput.id}`}>Add</button>

                    <p className='sr-only' id={`clear-btn-desktop-description-${thisMedInput.id}`}>Reset this medicine.</p>
                    <button type='click' onClick={reset} className={styles.clear + ' p ' + (thisMedInput.added ? 'hide' : '')} aria-describedby={`clear-btn-desktop-description-${thisMedInput.id}`}>Clear</button>

                    <p className='sr-only' id={`remove-btn-desktop-description-${thisMedInput.id}`}>Remove this medicine from the conversion to a &apos;Levodopa equivalent dose&apos; of dispersible madopar.</p>
                    <button type='click' onClick={removeRow} className={styles.remove + ' p ' + (thisMedInput.added ? '' : 'hide')} aria-describedby={`remove-btn-desktop-description-${thisMedInput.id}`}>Remove</button>
                </div>

            </div>
        )
    }

    const [medInputs, setMedInputs] = useState([{ id: 1, values: { medicine: '', frequency: '' }, added: false }]);

    return (
        <div className={styles.desktopOnly}>
            <form action='/results'>
                <div className={styles.formContainer}>
                    <h3 className={styles.columnHeading + ' h5'}>Dose</h3>
                    <h3 className={styles.columnHeading + ' h5'}>Number per 24 hours</h3>
                    <h3 className={styles.columnHeading + ' h5'}>Add/Remove</h3>
                    <div className={styles.medInputContainer}>
                        {medInputs.map((aMedInput) => <OneMedInput key={aMedInput.id} thisMedInput={aMedInput} allMedInputs={medInputs} setMedInputs={setMedInputs} />)}
                    </div>
                </div>

                <p className='sr-only' id='calculate-btn-desktop-description'>Calculate the total levodopa equivalent dose of the added medicines and convert them to dispersible madopar and rotigotine patch.</p>
                <button type='submit' className={styles.button} aria-describedby='calculate-btn-desktop-description'>Calculate</button>
            </form >
        </div>
    )
}