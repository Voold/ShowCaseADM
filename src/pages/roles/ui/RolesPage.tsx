import styles from './RolesPage.module.css'
import { SideBar } from '@/widgets/side-bar'

export const RolesPage = () => {
  return (
    <main className={styles.rolesPage}>
      <SideBar />
      <section className={styles.rolesContainer}>
        <p>RolesPage</p>
      </section>
    </main>
  )
}
