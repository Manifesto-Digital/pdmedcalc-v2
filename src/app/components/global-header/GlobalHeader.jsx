import Image from 'next/image'
import styles from './global-header.module.scss'

export default function GlobalHeader() {
    return (
        <header className={styles.header}>
            <Image
                src="/parkinsons-excellence-network-logo.svg"
                alt="Parkinson's Excellence Network Logo"
                width={160}
                height={94.5}
            />

            <Image
                src="/northumbria-healthcare-nhs-foundation-trust-logo--white.png"
                alt="Northumbria Healthcare NHS Foundation Trust Logo"
                width={160}
                height={48}
                className={styles.trustLogo}
            />
        </header>
    )
}