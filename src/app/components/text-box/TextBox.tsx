import Link from 'next/link';
import styles from './text-box.module.scss';

interface TextBoxProps {
    isCaution?: boolean;
}

export default function TextBox({ isCaution = false }: TextBoxProps) {
    return (
        <div className={isCaution ? styles.container + ' ' + styles.containerCaution : styles.container}>
            <h2 className={isCaution ? styles.heading + ' ' + styles.headingCaution : styles.heading}>{isCaution ? 'Caution with Rotigotine Patch' : 'Disclaimer'}</h2>
            <div className={styles.contentContainer}>
                {isCaution ? <CautionBulletPoints /> : <DisclaimerBulletPoints />}
                {isCaution ? <></> : <AcceptDisclaimer />}
            </div>
        </div>
    );
}

function DisclaimerBulletPoints() {
    return (
        <ul className={styles.bullets}>
            <li className={styles.sentence + ' p'}>This tool is no substitute for clinical reasoning, nor should it be used as a substitute for expert advice – please ensure you liaise with your local PD and pharmacy teams about any patient with PD who is unable to take their usual medicines.</li>
            <li className={styles.sentence + ' p'}>Extensive effort has been made to ensure this tool is as accurate as possible, however the accuracy and completeness of the information provided cannot be guaranteed.</li>
            <li className={styles.sentence + ' p'}>The tool should therefore be used as a guide, with no medical decision being solely made on the results provided by this tool.</li>
        </ul>
    );
}

function CautionBulletPoints() {
    return (
        <ul className={styles.bullets}>
            <li className={styles.sentence + ' p'}>It is important to highlight that patients may exhibit sensitivity to Rotigotine patches at higher
                doses and their use in dopamine agonist naive patients can precipitate confusion, hallucinations, or
                delirium. A correction factor (x 0.25; informed by clinical practice) has been applied in this algorithm (to those patients who are not taking dopamine agonists) to avoid producing large, inappropriate doses.</li>
            <li className={styles.sentence + ' p'}>Input from PD nursing &amp; medical specialists is critical and we would urge you to contact them at the soonest available opportunity, as gradual up-titration of the rotigotine patch dose may be needed.</li>
        </ul>
    );
}

function AcceptDisclaimer() {
    return (
        <Link className={styles.link} href="/calculator">Accept & continue</Link>
    );
}
