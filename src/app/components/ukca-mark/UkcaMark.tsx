import Image from 'next/image';
import styles from './ukca-mark.module.scss';

export default function UkcaMark() {
    return (
        <Image
            src="/ukca-mark.png"
            alt="The UKCA mark"
            width={50}
            height={50}
            className={styles.image}
        />
    );
}
