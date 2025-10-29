import Link from 'next/link';
import styles from './back.module.scss';

interface BackProps {
    href: string;
    text: string;
}

export default function Back({ href, text }: BackProps) {
    return (
        <Link className={styles.container + ' back'} href={href}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 12C8.5 11.7 8.6 11.5 8.8 11.3L13.8 6.3C14.2 5.9 14.8 5.9 15.2 6.3C15.6 6.7 15.6 7.3 15.2 7.7L10.9 12L15.2 16.3C15.6 16.7 15.6 17.3 15.2 17.7C14.8 18.1 14.2 18.1 13.8 17.7L8.8 12.7C8.6 12.5 8.5 12.3 8.5 12Z" fill="#005EB8" />
            </svg>
            {text}
        </Link>
    );
}
