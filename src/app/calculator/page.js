import styles from './calculator-page.module.scss'
import Back from "../components/back/Back"
import BackToTop from '../components/back-to-top/BackToTop';
import MedicinesForm from '../components/medicines-form/MedicinesForm'

export const metadata = {
    title: 'Calculator',
}
export default function Calculator() {
    return (
        <main id="main-content" data-page="calculator">
            <Back href='/' text='Back' />
            <h2 className={styles.heading}>Dose Calculator</h2>
            <h3 className={styles.subheading}>Enter each medication and the frequency (per day)</h3>
            <MedicinesForm />
            <div className={styles.mobileOnly}>
                <BackToTop />
            </div>
        </main>
    )
}