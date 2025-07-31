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
            <h1 className={styles.heading + ' h2'}>Dose Calculator</h1>
            <h2 className={styles.subheading + ' h3'}>Enter each medication and the frequency (per day)</h2>
            <MedicinesForm />
            <div className={styles.mobileOnly}>
                <BackToTop />
            </div>
        </main>
    )
}