import styles from './explainer.module.scss'

export default function Explainer() {
    return (
        <>
            <h1 className={styles.heading}>PD 'Nil by Mouth' Medication Dose Calculator</h1>
            <h2 className={styles.subheading}>Who is this tool for?</h2>
            <p className={styles.sentence}>Doctors, nurses and pharmacists who are looking after patients with Parkinson's Disease (PD) who have been admitted to hospital and are unable to take their medications orally.</p>
            <h2 className={styles.subheading}>What is the purpose of the tool?</h2>
            <ul className={styles.bullets}>
                <li className={styles.sentence}><p>In patients unable to take their usual PD medications orally, this tool is designed to convert a patient's usual PD medications to a 'Levodopa equivalent dose' (LED).</p></li>
                <li className={styles.sentence}><p>The LED can then be used to calculate what dose of dispersible madopar should be given via a nasogastric tube to provide a patient with their usual amount of PD medication.</p></li>
                <li className={styles.sentence}><p>The tool also provides a conversion to a rotigine patch dose. A correction factor is applied to avoid large patch doses that may precipitate side effects such as confusion, hallucinations or delirium.</p></li>
                <li className={styles.sentence}><p>The following medications can be safely omitted if swallow is compromised: entacapone, selegiline, rasagiline and amantadine.</p></li>
                <li className={styles.sentence}><p>If the patient is on an Apomorphine infusion or uses Duodopa (via PEJ), then they do not need to be converted to a rotigotine patch – instead, please continue to use their existing non-oral treatment.</p></li>
            </ul>
            <h2 className={styles.subheading}>Where did this tool come from?</h2>
            <p className={styles.sentence}>The tool was developed by the Northumbria Healthcare NHS Foundation Trust Parkinson's Disease team in 2014 (Richard Walker, Brian Wood, Annette Hand and James Fisher), who worked in collaboration with Daniel Jamieson (PhD student at Newcastle University's School of Computing Science).</p>
        </>
    )
}