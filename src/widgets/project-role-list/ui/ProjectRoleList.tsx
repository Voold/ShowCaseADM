import styles from './ProjectRoleList.module.css'
import { EditProjectRoleButton, RemoveProjectRoleButton } from '@/features/manage-project-roles'
import { ProjectRoleTypeRow, ProjectRoleTypeRowSkeleton, useProjectRoleTypes } from '@/entities/project-role-type'

export function ProjectRoleList() {
  const { data: projectRoleTypes = [], isSuccess, isLoading, isError } = useProjectRoleTypes()

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {isLoading && Array.from({ length: 5 }, (_, i) => <ProjectRoleTypeRowSkeleton key={i} />)}
        {isError && <h3 className={styles.placeholder}>Произошла ошибка :P</h3>}
        {isSuccess && projectRoleTypes.length === 0 ? (
          <h3 className={styles.placeholder}>Ничего не нашлось!</h3>
        ) : (
          projectRoleTypes.map(roleType => (
            <ProjectRoleTypeRow roleType={roleType} key={roleType.id}>
              <EditProjectRoleButton roleId={roleType.id} />
              <RemoveProjectRoleButton roleId={roleType.id} />
            </ProjectRoleTypeRow>
          ))
        )}
      </div>
    </div>
  )
}
