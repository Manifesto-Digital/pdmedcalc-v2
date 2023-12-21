import styles from './calculator-page.module.scss'
import Back from "../components/back/Back"
export default function Calculator() {
    return (
        <main>
            <Back href='/' />
            <h2 className={styles.heading}>Dose Calculator</h2>
            <h3 className={styles.subheading}>Enter each medication and the frequency (per day)</h3>
        </main>
    )
}