'use client'

import { useState } from 'react'
import { medications } from '@/app/data/data'
import styles from './medicines-form.module.scss'

export default function MedicinesForm() {
    return (
        <>
            <MobileVersion />
            <DesktopVersion />
        </>
    )
}

function OneMedInput({ setNumOfMedInputs }) {
    const medicines = Object.keys(medications);
    const frequencies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const add = (e) => {
        e.preventDefault();

        const overallWrappingDiv = e.target.parentElement.parentElement;
        const selectedMedicine = overallWrappingDiv.querySelector('[name="medicine"]');
        const selectedFrequency = overallWrappingDiv.querySelector('[name="frequency"]');
        const clearButton = e.target.nextElementSibling;

        //to do: add error checks here. should only proceed if both medicine and frequency are filled out


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
        const removeButton = document.createElement('button');
        removeButton.type = 'click';
        removeButton.className = styles.remove;
        removeButton.innerText = 'Remove'
        removeButton.onclick = () => overallWrappingDiv.remove();
        clearButton.replaceWith(removeButton);

    }

    return (
        <div className={styles.selectsAndButtonsContainer}>
            <label className={styles.label}>
                <p className='h5'>Dose</p>
                <select name="medicine">
                    <option value="">Select</option>
                    {medicines.map((med, index) => <option key={index} value={med}>{med}</option>)}
                </select>
            </label>
            <label className={styles.label}>
                <p className='h5'>Frequency</p>
                <select name="frequency">
                    <option value="">Select</option>
                    {frequencies.map((freq, index) => <option key={index} value={freq}>{freq}</option>)}
                </select>
            </label>
            <p className='h5'>Add/Remove</p>
            <div className={styles.addAndRemoveButtonsContainer}>
                <button type='click' onClick={add} className={styles.add + ' ' + 'p'}>Add</button>
                <button type='click' className={styles.clear + ' ' + 'p'}>Clear</button>
            </div>
        </div>
    )
}

function MobileVersion() {
    //note: the values in the numOfMedInputs array array don't matter. only the length of the array matters
    const [numOfMedInputs, setNumOfMedInputs] = useState([1]);

    return (
        <form action='/results' className={styles.mobileOnly}>
            {numOfMedInputs.map((num, index) => <OneMedInput key={index} setNumOfMedInputs={setNumOfMedInputs} />)}
            <button type='submit' className={styles.button}>Calculate</button>
        </form>
    )
}

function DesktopVersion() {
    return (
        <p className={styles.desktopOnly}>Desktop only</p>
    )
}