import styles from './MainPage.module.css'
import { SideBar } from '@/widgets/side-bar'

export const MainPage = () => {
  return (
    <main className={styles.mainPage}>
      <SideBar />
      <section className={styles.mainContainer}>
        <p>MainPage</p>
      </section>
    </main>
  )
}
