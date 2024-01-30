'use client'

import { useState } from 'react'
import { medications } from '@/app/data/data'
import styles from './medicines-form.module.scss'

export function MobileVersion() {
    function OneMedInput({ thisMedInput, allMedInputs, setMedInputs }) {

        const medicines = Object.keys(medications);
        const frequencies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const add = (e) => {
            e.preventDefault();

            const overallWrappingDiv = e.target.parentElement.parentElement;
            const selectedMedicine = overallWrappingDiv.querySelector('[name="medicine"]');
            const medicineErrorMessage = overallWrappingDiv.querySelector('[data-error="medicine"]');
            const selectedFrequency = overallWrappingDiv.querySelector('[name="frequency"]');
            const frequencyErrorMessage = overallWrappingDiv.querySelector('[data-error="frequency"]');

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
        };

        const removeMedInput = (e) => {
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
                <label className={styles.label}>
                    <p className='h5'>Dose</p>
                    <p className={'h6' + ' ' + styles.errorMessage + ' ' + 'hide'} data-error="medicine">Select dose</p>
                    <select id={`med-input-${thisMedInput.id}`} name="medicine" className={(thisMedInput.values.medicine ? styles.none : '') + ' p ' + styles.select} onChange={handleMedChange}>
                        <option value="">Select</option>
                        {thisMedInput.values.medicine && <option selected value={thisMedInput.values.medicine}>{thisMedInput.values.medicine}</option>}
                        {medicines.filter(med => med !== thisMedInput.values.medicine).map((med, index) => <option key={index} value={med}>{med}</option>)}
                    </select>
                </label>
                <label className={styles.label}>
                    <p className='h5'>Frequency</p>
                    <p className={'h6' + ' ' + styles.errorMessage + ' ' + 'hide'} data-error="frequency">Select frequency</p>
                    <select id={`freq-for-med-input-${thisMedInput.id}`} name="frequency" className={(thisMedInput.values.frequency ? styles.none : '') + ' p ' + styles.select} onChange={handleFreqChange}>
                        <option value="">Select</option>
                        {thisMedInput.values.frequency && <option selected value={thisMedInput.values.frequency}>{thisMedInput.values.frequency}</option>}
                        {frequencies.filter(freq => freq != thisMedInput.values.frequency).map((freq, index) => <option key={index} value={freq}>{freq}</option>)}
                    </select>
                </label>
                <p className='h5'>Add/Remove</p>
                <div className={styles.addAndRemoveButtonsContainer}>
                    <button type='click' id={`add-btn-${thisMedInput.id}`} onClick={add} className={styles.add + ' p ' + (thisMedInput.added ? 'hide' : '')}>Add</button>
                    <button type='click' onClick={reset} className={styles.clear + ' p ' + (thisMedInput.added ? 'hide' : '')}>Clear</button>
                    <button type='click' onClick={removeMedInput} className={styles.remove + ' p ' + (thisMedInput.added ? '' : 'hide')}>Remove</button>
                </div>
            </div>
        )
    }

    const [medInputs, setMedInputs] = useState([{ id: 1, values: { medicine: '', frequency: '' }, added: false }]);


    return (
        <form action='/results' className={styles.mobileOnly}>
            {medInputs.map((aMedInput) => <OneMedInput key={aMedInput.id} thisMedInput={aMedInput} allMedInputs={medInputs} setMedInputs={setMedInputs} />)}
            <button type='submit' className={styles.button}>Calculate</button>
        </form>
    )
}