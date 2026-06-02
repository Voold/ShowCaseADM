import styles from './ProjectSlot.module.css'
import ProjectIcon from '../../assets/project.svg?react'
import type { Project } from '../../model/types.ts'
import { getStatusTranslation } from '../../lib/getStatusTranslation.ts'
import type { ComponentPropsWithoutRef } from 'react'

interface ProjectSlotProps extends ComponentPropsWithoutRef<'div'> {
  project: Project
}

export const ProjectSlot = ({ project, className, onClick, ...props }: ProjectSlotProps) => {
  return (
    <div className={`${styles.container} ${onClick && styles.clickable} ${className}`} onClick={onClick} {...props}>
      <div className={styles.iconContainer}>
        <ProjectIcon className={styles.projectIcon} />
        <div className={styles.description}>
          <p className={styles.name}>{project.name}</p>
          <p className={styles.id}>{project.id}</p>
        </div>
      </div>

      <p className={styles.school}>{project.school}</p>
      <p className={`${styles.status} ${styles[project.status]}`}>{getStatusTranslation(project.status)}</p>
    </div>
  )
}
