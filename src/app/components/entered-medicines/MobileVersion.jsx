import styles from './entered-medicines.module.scss'
export function EnteredMedicinesMobileVersion({ medicineObjects }) {
    return (
        <div className={styles.mobileOnly}>
            {medicineObjects.map((aMedObj, index) =>
                <div key={index} className={styles.medicineContainer}>
                    <p className={styles.heading + ' h5'}>Name</p>
                    <p className={styles.text}>{aMedObj.name}</p>
                    <p className={styles.heading + ' h5'}>Frequency</p>
                    <p className={styles.text}>{aMedObj.frequencyPerDay} per day</p>
                </div>
            )}
        </div>
    )
}