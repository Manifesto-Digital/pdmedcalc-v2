import styles from './home-page.module.scss';
import Explainer from '../components/explainer/Explainer';
import TextBox from '../components/text-box/TextBox';
import UkcaMark from '../components/ukca-mark/UkcaMark';
import BackToTop from '../components/back-to-top/BackToTop';

export const metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <main id="main-content" className={styles.homePageContainer}>
      <Explainer />
      <TextBox />
      <UkcaMark />
      <BackToTop />
    </main>
  )
}
