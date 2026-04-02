import { SideBar } from '@/widgets/side-bar'
import styles from './MainPage.module.css'

export const MainPage = () => {
  return(
      <main className={styles.mainPage}>
        <SideBar/>
        <section className={styles.mainContainer}>
          <p>MainPage :D</p>
        </section>
      </main>
  )
}