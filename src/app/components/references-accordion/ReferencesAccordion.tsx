'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './references-accordion.module.scss';

export default function ReferencesAccordion() {
    const toggleDetails = () => {
        const plusSign = document.querySelector('#plus-sign');
        const minusSign = document.querySelector('#minus-sign');

        minusSign?.classList.toggle('hide');
        plusSign?.classList.toggle('hide');
    };

    return (
        <details className={styles.container + ' references-accordion'}>
            <summary className={styles.heading + ' p'} onClick={toggleDetails}>
                <Image
                    src="/plus.svg"
                    alt="Plus sign"
                    width={24}
                    height={24}
                    id="plus-sign"
                />
                <Image
                    src="/minus.svg"
                    alt="Minuus sign"
                    width={24}
                    height={24}
                    className='hide'
                    id="minus-sign"
                />
                <span>References</span>
            </summary>
            <ul className={styles.bullets}>
                <li className={styles.text + ' p'}>
                    MJ MacMahon, DG MacMahon. Management of Parkinson&apos;s Disease in the Acute Hospital Environement.
                    <cite className={styles.citation}>
                        <Link href='https://www.rcpe.ac.uk/sites/default/files/macmahon.pdf'> J R Coll Physicians Edinb 2012; 42:157-62</Link>
                    </cite>
                </li>
                <li className={styles.text + ' p'}>
                    Brennan KA, Genever RW. Managing Parkinson&apos;s disease during surgery.
                    <cite className={styles.citation}>
                        <Link href='https://www.bmj.com/content/341/bmj.c5718'> BMJ 2010; 341:c5718.</Link>
                    </cite>
                </li>
                <li className={styles.text + ' p'}>
                    Jost ST et al. Levodopa Dose Equivalency in Parkinson&apos;s Disease: Updated
                    Systematic Review and Proposals.
                    <cite className={styles.citation}>
                        <Link href='https://movementdisorders.onlinelibrary.wiley.com/doi/10.1002/mds.29410'> Mov Disord 2023; 38(7):1236-1252.</Link>
                    </cite>
                </li>
            </ul>
        </details>
    );
}
