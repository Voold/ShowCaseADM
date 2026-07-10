import styles from './ProjectRoleList.module.css'
import { EditProjectRoleButton, RemoveProjectRoleButton } from '@/features/manage-project-roles'
import { ProjectRoleRow, ProjectRoleRowSkeleton, useProjectRoles } from '@/entities/project-role'

export function ProjectRoleList() {
  const { data: projectRoles = [], isSuccess, isLoading, isError } = useProjectRoles()

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {isLoading && Array.from({ length: 5 }, (_, i) => <ProjectRoleRowSkeleton key={i} />)}
        {isError && <h3 className={styles.placeholder}>Произошла ошибка :P</h3>}
        {isSuccess && projectRoles.length === 0 ? (
          <h3 className={styles.placeholder}>Ничего не нашлось!</h3>
        ) : (
          projectRoles.map(role => (
            <ProjectRoleRow projectRole={role} key={role.id}>
              <EditProjectRoleButton roleId={role.id} />
              <RemoveProjectRoleButton roleId={role.id} />
            </ProjectRoleRow>
          ))
        )}
      </div>
    </div>
  )
}
