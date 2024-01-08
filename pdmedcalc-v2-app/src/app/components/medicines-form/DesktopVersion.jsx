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

            const selectedMedicine = document.querySelector(`#med-input-${thisMedInput.id}`);
            const selectedFrequency = document.querySelector(`#freq-for-med-input-${thisMedInput.id}`);
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
                    <select id={`med-input-${thisMedInput.id}`} name="medicine" onChange={handleMedChange} aria-labelledby="medLabel" className={(thisMedInput.values.medicine ? styles.selected : '') + ' p ' + styles.select}>
                        <option value="">Select</option>
                        {thisMedInput.values.medicine && <option selected value={thisMedInput.values.medicine}>{thisMedInput.values.medicine}</option>}
                        {medicines.filter(med => med !== thisMedInput.values.medicine).map((med, index) => <option key={index} value={med}>{med}</option>)}
                    </select>
                </div>

                <div className={styles.selectAndErrorContainer}>
                    <p id={`freq-error-message-for-med-input-${thisMedInput.id}`} className={'h6' + ' ' + styles.errorMessage + ' ' + 'hide'}>Select frequency</p>
                    <select id={`freq-for-med-input-${thisMedInput.id}`} name="frequency" onChange={handleFreqChange} aria-labelledby="freqLabel" className={(thisMedInput.values.frequency ? styles.selected : '') + ' p ' + styles.select}>
                        <option value="">Select</option>
                        {thisMedInput.values.frequency && <option selected value={thisMedInput.values.frequency}>{thisMedInput.values.frequency}</option>}
                        {frequencies.filter(freq => freq != thisMedInput.values.frequency).map((freq, index) => <option key={index} value={freq}>{freq}</option>)}
                    </select>
                </div>

                <div className={styles.addAndRemoveButtonsContainer}>
                    <button type='click' onClick={add} className={styles.add + ' p ' + (thisMedInput.added ? 'hide' : '')}>Add</button>
                    <button type='click' onClick={reset} className={styles.clear + ' p ' + (thisMedInput.added ? 'hide' : '')}>Clear</button>
                    <button type='click' onClick={removeRow} className={styles.remove + ' p ' + (thisMedInput.added ? '' : 'hide')}>Remove</button>
                </div>

            </div>
        )
    }

    const [medInputs, setMedInputs] = useState([{ id: 1, values: { medicine: '', frequency: '' }, added: false }]);

    return (
        <div className={styles.desktopOnly}>
            <form action='/results'>
                <div className={styles.formContainer}>
                    <h4 id="medLabel" className={styles.columnHeading + ' h5'}>Dose</h4>
                    <h4 id="frequencyLabel" className={styles.columnHeading + ' h5'}>Frequency</h4>
                    <h4 className={styles.columnHeading + ' h5'}>Add/Remove</h4>
                    <div className={styles.medInputContainer}>
                        {medInputs.map((aMedInput) => <OneMedInput key={aMedInput.id} thisMedInput={aMedInput} allMedInputs={medInputs} setMedInputs={setMedInputs} />)}
                    </div>
                </div>
                <button type='submit' className={styles.button}>Calculate</button>
            </form >
        </div>
    )
}