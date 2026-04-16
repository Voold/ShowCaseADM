import styles from './ProjectsPage.module.css'
import { SideBar } from '@/widgets/side-bar'

export const ProjectsPage = () => {
  return (
    <main className={styles.projectsPage}>
      <SideBar />
      <section className={styles.projectsContainer}>
        <p>ProjectsPage</p>
      </section>
    </main>
  )
}
