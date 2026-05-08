import styles from './ProjectSlot.module.css'
import ProjectIcon from '../../assets/project.svg?react'
import type { Project } from '../../model/types.ts'

const getStatusName = (status: string) => {
  switch (status) {
    case 'active':
      return "Активен"
    case 'pending':
      return "В ожидании"
    case 'closed':
      return "Закрыт"
    case 'archive':
      return "Архив"
    default:
      return "Неизвестно"
  }
}

export const ProjectSlot = (
    { id, name, school, status} : Project
) => {
  return (
      <div className={`${styles.container}`}>
        <div className={styles.iconContainer}>
          <ProjectIcon className={styles.projectIcon}/>
          <div className={styles.description}>
            <p className={styles.name}>{name}</p>
            <p className={styles.id}>{id}</p>
          </div>
        </div>

        {school &&
            (<p className={styles.school}>
              {school}
            </p>)
        }
        <p className={`
          ${styles.status}
          ${styles[status]}
        `}>
              {getStatusName(status)}
        </p>
      </div>
  );
}