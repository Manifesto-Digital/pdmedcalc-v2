import Image from 'next/image'
import styles from './global-header.module.scss'

export default function GlobalHeader() {
    return (
        <header className={styles.header}>
            <Image
                src="/parkinsons-logo.svg"
                alt="Parkinson's Logo"
                width={146}
                height={22}
            />
        </header>
    )
}