import styles from './home-page.module.scss';
import Explainer from '../components/explainer/Explainer';
import TextBox from '../components/text-box/TextBox';
export default function Home() {
  return (
    <main>
      <Explainer />
      <TextBox />
    </main>
  )
}
