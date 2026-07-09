import styles from './ProjectRoleRow.module.css'
import type { ComponentPropsWithoutRef } from 'react'
import type { ProjectRole } from '../model/types'

interface ProjectRoleRowProps extends ComponentPropsWithoutRef<'div'> {
  projectRole: ProjectRole
}

export function ProjectRoleRow({ projectRole, className, children }: ProjectRoleRowProps) {
  return (
    <div className={`${styles.container} ${className ?? ''}`} key={projectRole.id}>
      <p>{projectRole.name}</p>
      <div className={styles.actions}>
				{children}
      </div>
    </div>
  )
}
