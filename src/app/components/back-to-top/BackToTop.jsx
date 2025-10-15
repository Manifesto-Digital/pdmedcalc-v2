import Link from 'next/link'
import styles from './back-to-top.module.scss'

export default function BackToTop() {
    return (
        <Link className={styles.link + ' back-to-top'} href="#main-content">Back to top</Link>
    )
}