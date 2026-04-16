import styles from './ReportsPage.module.css'
import { SideBar } from '@/widgets/side-bar/'

export const ReportsPage = () => {
  return (
    <main className={styles.reportsPage}>
      <SideBar />
      <section className={styles.reportsContainer}>
        <p>RolesPage</p>
      </section>
    </main>
  )
}
