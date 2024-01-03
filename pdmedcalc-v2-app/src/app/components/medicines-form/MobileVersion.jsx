'use client'

import { useState } from 'react'
import { medications } from '@/app/data/data'
import styles from './medicines-form.module.scss'

export default function MobileVersion() {


    function OneMedInput({ setNumOfMedInputs }) {
        const medicines = Object.keys(medications);
        const frequencies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const add = (e) => {
            e.preventDefault();


            const overallWrappingDiv = e.target.parentElement.parentElement;
            console.log(overallWrappingDiv)
            const selectedMedicine = overallWrappingDiv.querySelector('[name="medicine"]');
            const medicineErrorMessage = overallWrappingDiv.querySelector('[data-error="medicine"]');
            const selectedFrequency = overallWrappingDiv.querySelector('[name="frequency"]');
            const frequencyErrorMessage = overallWrappingDiv.querySelector('[data-error="frequency"]');
            const clearButton = e.target.nextElementSibling;
            const removeButton = e.target.nextElementSibling.nextElementSibling;
            console.log(removeButton)

            //to prevent unfilled values; should only proceed if both medicine and frequency are filled out
            if (!selectedMedicine.value) {
                medicineErrorMessage.classList.remove(styles.hide);
                selectedMedicine.classList.add(styles.errorBox);
            }
            if (!selectedFrequency.value) {
                frequencyErrorMessage.classList.remove(styles.hide);
                selectedFrequency.classList.add(styles.errorBox);
            }

            if (selectedMedicine.value && selectedFrequency.value) {
                //add another <OneMedInput />
                setNumOfMedInputs((previousNumOfMedInputs) => [...previousNumOfMedInputs, 1]);

                //hide the current <OneMedInput />'s add button
                e.target.classList.add(styles.hide);

                //replace the current <OneMedInput />'s two selects with input elements instead
                const newInputElement = document.createElement('input');
                newInputElement.type = 'text';
                newInputElement.name = 'medicine';
                newInputElement.value = selectedMedicine.value;
                newInputElement.readOnly = true;
                selectedMedicine.replaceWith(newInputElement);

                const newInputElement2 = document.createElement('input');
                newInputElement2.type = 'text';
                newInputElement2.name = 'frequency';
                newInputElement2.value = selectedFrequency.value;
                newInputElement2.readOnly = true;
                selectedFrequency.replaceWith(newInputElement2);

                //replace the clear button with a remove button
                // const removeButton = document.createElement('button');
                // removeButton.type = 'click';
                // removeButton.className = styles.remove;
                // removeButton.innerText = 'Remove'
                // removeButton.onclick = () => overallWrappingDiv.remove();
                // clearButton.replaceWith(removeButton);
                console.log("new")

                clearButton.classList.add(styles.hide);
                removeButton.classList.remove(styles.hide);
            }

        }

        const removeErrorMessageIfAppropriate = (e) => {
            if (e.target.value != '') {
                e.target.classList.remove(styles.errorBox);
                e.target.previousElementSibling.classList.add(styles.hide);
            }
        };

        const reset = (e) => {
            e.preventDefault();

            const overallWrappingDiv = e.target.parentElement.parentElement;
            const selectedMedicine = overallWrappingDiv.querySelector('[name="medicine"]');
            const selectedFrequency = overallWrappingDiv.querySelector('[name="frequency"]');

            selectedMedicine.value = '';
            selectedFrequency.value = '';
        };

        const removeEntireSelection = (e) => {
            e.preventDefault();

            const overallWrappingDiv = e.target.parentElement.parentElement;
            overallWrappingDiv.remove();
        }

        const test23 = () => { console.log("do nothing") }

        return (
            <div className={styles.selectsAndButtonsContainer}>
                <label className={styles.label}>
                    <p className='h5'>Dose</p>
                    <p className={'h6' + ' ' + styles.errorMessage + ' ' + styles.hide} data-error="medicine">Select dose</p>
                    <select name="medicine" className={styles.select} onChange={test23}>
                        <option value="">Select</option>
                        {medicines.map((med, index) => <option key={index} value={med}>{med}</option>)}
                    </select>
                </label>
                <label className={styles.label}>
                    <p className='h5'>Frequency</p>
                    <p className={'h6' + ' ' + styles.errorMessage + ' ' + styles.hide} data-error="frequency">Select frequency</p>
                    <select name="frequency" className={styles.select} onChange={test23}>
                        <option value="">Select</option>
                        {frequencies.map((freq, index) => <option key={index} value={freq}>{freq}</option>)}
                    </select>
                </label>
                <p className='h5'>Add/Remove</p>
                <div className={styles.addAndRemoveButtonsContainer}>
                    <button type='click' onClick={add} className={styles.add + ' ' + 'p'}>Add</button>
                    <button type='click' onClick={reset} className={styles.clear + ' ' + 'p'}>Clear</button>
                    <button type='click' onClick={removeEntireSelection} className={styles.remove + ' ' + 'p' + ' ' + styles.hide + ' abc'}>Remove</button>
                </div>
            </div>
        )
    }



    //note: the values in the numOfMedInputs array array don't matter. only the length of the array matters
    const [numOfMedInputs, setNumOfMedInputs] = useState([1]);

    return (
        <form action='/results' className={styles.mobileOnly}>
            {numOfMedInputs.map((num, index) => <OneMedInput key={index} setNumOfMedInputs={setNumOfMedInputs} />)}
            <button type='submit' className={styles.button}>Calculate</button>
        </form>
    )
}