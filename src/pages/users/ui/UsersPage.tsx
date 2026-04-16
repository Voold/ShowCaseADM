import styles from './UsersPage.module.css'
import { SideBar } from '@/widgets/side-bar'

export const UsersPage = () => {
  return (
    <main className={styles.usersPage}>
      <SideBar />
      <section className={styles.usersContainer}>
        <p>UsersPage</p>
      </section>
    </main>
  )
}
