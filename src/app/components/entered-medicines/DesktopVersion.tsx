import { MedicineInput } from '../../calculator/calculator-functions';
import styles from './entered-medicines.module.scss';

interface EnteredMedicinesDesktopVersionProps {
    medicineObjects: MedicineInput[];
}

export function EnteredMedicinesDesktopVersion({ medicineObjects }: EnteredMedicinesDesktopVersionProps) {
    return (
        <div className={styles.desktopOnly}>
            <div className={styles.headingsContainer}>
                <p className={styles.heading + ' h5'}>Name</p>
                <p className={styles.heading + ' h5'}>Frequency</p>
            </div>
            {medicineObjects.map((aMedObj, index) =>
                <div key={index} className={styles.medicineContainer}>
                    <p className={styles.text}>{aMedObj.name}</p>
                    <p className={styles.text}>{aMedObj.frequencyPerDay} per day</p>
                </div>
            )}
        </div>
    );
}
