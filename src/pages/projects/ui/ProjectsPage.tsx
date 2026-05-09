import styles from "./ProjectPage.module.css";
import {ProjectsList} from "@/widgets/projects-list";
import {QuickActions} from "@/widgets/quick-actions";

export const ProjectsPage = () => {
  return (
      <main className={styles.mainContainer}>
        <h2 className={styles.projectTitle}>Проекты</h2>
        <div className={styles.content}>
          <ProjectsList />
          <aside className={styles.quickSide}>
            <QuickActions />
          </aside>
        </div>
      </main>
  )
}
