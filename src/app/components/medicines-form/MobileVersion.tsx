'use client';

import { useState } from 'react';
import { medications } from '@/app/data/data';
import styles from './medicines-form.module.scss';

interface MedInputValues {
    medicine: string;
    frequency: string;
    added?: boolean;
}

interface MedInput {
    id: number;
    values: MedInputValues;
    added: boolean;
}

interface OneMedInputProps {
    thisMedInput: MedInput;
    allMedInputs: MedInput[];
    setMedInputs: React.Dispatch<React.SetStateAction<MedInput[]>>;
}

export function MobileVersion() {
    function OneMedInput({ thisMedInput, allMedInputs, setMedInputs }: OneMedInputProps) {
        const medicines = Object.keys(medications);
        const frequencies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const add = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            const overallWrappingDiv = (e.target as HTMLElement).parentElement?.parentElement as HTMLElement;
            const selectedMedicine = overallWrappingDiv.querySelector('[name="medicine"]') as HTMLSelectElement;
            const medicineErrorMessage = overallWrappingDiv.querySelector('[data-error="medicine"]') as HTMLElement;
            const selectedFrequency = overallWrappingDiv.querySelector('[name="frequency"]') as HTMLSelectElement;
            const frequencyErrorMessage = overallWrappingDiv.querySelector('[data-error="frequency"]') as HTMLElement;

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
                newMedInputs.push({ id: thisMedInput.id + 1, values: { medicine: '', frequency: '', added: false }, added: false });
                setMedInputs(newMedInputs);
            }
        };

        const handleMedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value != '') {
                e.target.classList.remove(styles.errorBox);
                e.target.previousElementSibling?.classList.add('hide');
            }
            const newMedInputs = [...allMedInputs];
            const index = newMedInputs.findIndex((medInput) => medInput.id === thisMedInput.id);
            newMedInputs[index].values.medicine = e.target.value;
            setMedInputs(newMedInputs);
        };

        const handleFreqChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value != '') {
                e.target.classList.remove(styles.errorBox);
                e.target.previousElementSibling?.classList.add('hide');
            }
            const newMedInputs = [...allMedInputs];
            const index = newMedInputs.findIndex((medInput) => medInput.id === thisMedInput.id);
            newMedInputs[index].values.frequency = e.target.value;
            setMedInputs(newMedInputs);
        };

        const reset = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            const newMedInputs = [...allMedInputs];
            const index = newMedInputs.findIndex((medInput) => medInput.id === thisMedInput.id);
            newMedInputs[index].values = { medicine: '', frequency: '', added: false };
            setMedInputs(newMedInputs);
        };

        const removeMedInput = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            const copy = [...allMedInputs];
            const index = copy.findIndex((medInput) => medInput.id === thisMedInput.id);
            const allPreviousMedInputs = copy.slice(0, index);
            const allSubsequentMedInputs = copy.slice(index + 1);
            const newMedInputs = [...allPreviousMedInputs, ...allSubsequentMedInputs];
            setMedInputs(newMedInputs);
        };

        return (
            <div className={styles.selectsAndButtonsContainer}>
                <label className={styles.label}>
                    <p className='h5'>Dose</p>
                    <p className={'h6' + ' ' + styles.errorMessage + ' ' + 'hide'} data-error="medicine">Select dose</p>
                    <select id={`med-input-${thisMedInput.id}`} name="medicine" value={thisMedInput.values.medicine} className={(thisMedInput.values.medicine ? styles.none : '') + ' p ' + styles.select} onChange={handleMedChange}>
                        <option value="">Select</option>
                        {medicines.map((med, index) => <option key={index} value={med}>{med}</option>)}
                    </select>
                </label>
                <label className={styles.label}>
                    <p className='h5'>Number per 24 hours</p>
                    <p className={'h6' + ' ' + styles.errorMessage + ' ' + 'hide'} data-error="frequency">Select number per 24 hours</p>
                    <select id={`freq-for-med-input-${thisMedInput.id}`} name="frequency" value={thisMedInput.values.frequency} className={(thisMedInput.values.frequency ? styles.none : '') + ' p ' + styles.select} onChange={handleFreqChange}>
                        <option value="">Select</option>
                        {frequencies.map((freq, index) => <option key={index} value={freq}>{freq}</option>)}
                    </select>
                </label>
                <p className='h5'>Add/Remove</p>
                <div className={styles.addAndRemoveButtonsContainer}>
                    <p className='sr-only' id={`add-btn-mobile-description-${thisMedInput.id}`}>Include this medicine in the conversion to a &apos;Levodopa equivalent dose&apos; of dispersible madopar.</p>
                    <button type='button' id={`add-btn-${thisMedInput.id}`} onClick={add} className={styles.add + ' p ' + (thisMedInput.added ? 'hide' : '')} aria-describedby={`add-btn-mobile-description-${thisMedInput.id}`}>Add</button>

                    <p className='sr-only' id={`clear-btn-mobile-description-${thisMedInput.id}`}>Reset this medicine.</p>
                    <button type='button' onClick={reset} className={styles.clear + ' p ' + (thisMedInput.added ? 'hide' : '')} aria-describedby={`clear-btn-mobile-description-${thisMedInput.id}`}>Clear</button>

                    <p className='sr-only' id={`remove-btn-mobile-description-${thisMedInput.id}`}>Remove this medicine from the conversion to a &apos;Levodopa equivalent dose&apos; of dispersible madopar.</p>
                    <button type='button' onClick={removeMedInput} className={styles.remove + ' p ' + (thisMedInput.added ? '' : 'hide')} aria-describedby={`remove-btn-mobile-description-${thisMedInput.id}`}>Remove</button>
                </div>
            </div>
        );
    }

    const [medInputs, setMedInputs] = useState<MedInput[]>([{ id: 1, values: { medicine: '', frequency: '' }, added: false }]);

    return (
        <form action='/results' className={styles.mobileOnly}>
            {medInputs.map((aMedInput) => <OneMedInput key={aMedInput.id} thisMedInput={aMedInput} allMedInputs={medInputs} setMedInputs={setMedInputs} />)}

            <p className='sr-only' id='calculate-btn-mobile-description'>Calculate the total levodopa equivalent dose of the added medicines and convert them to dispersible madopar and rotigotine patch.</p>
            <button type='submit' className={styles.button} aria-describedby='calculate-btn-mobile-description'>Calculate</button>
        </form>
    );
}
