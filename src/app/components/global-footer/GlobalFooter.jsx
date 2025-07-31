import Link from 'next/link'
import styles from './global-footer.module.scss'

export default function GlobalFooter() {
    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>
                If you have any queries, or identify any problems, please <Link href='mailto:james.fisher@nhct.nhs.uk' className={styles.link}>contact us</Link>
            </p>
        </footer>
    )
}

