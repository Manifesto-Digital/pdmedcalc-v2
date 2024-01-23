import Image from 'next/image'
import styles from './global-header.module.scss'

export default function GlobalHeader() {
    return (
        <header className={styles.header}>
            <Image
                src="/parkinsons-excellence-network-logo.svg"
                alt="Parkinson's Excellence Network Logo"
                width={154}
                height={91}
            />
        </header>
    )
}