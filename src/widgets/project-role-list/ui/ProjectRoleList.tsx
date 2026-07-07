import styles from './ProjectRoleList.module.css'
import { EditProjectRoleButton, RemoveProjectRoleButton } from '@/features/manage-project-roles'
import { useProjectRoles } from '@/entities/project-role'

export function ProjectRoleList() {
  const { data: projectRoles = [], isSuccess, isLoading, isError } = useProjectRoles()

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {isLoading && <h3 className={styles.placeholder}>Загрузка...</h3>}
        {isError && <h3 className={styles.placeholder}>Произошла ошибка :P</h3>}
        {isSuccess && projectRoles.length === 0 ? (
          <h3 className={styles.placeholder}>Ничего не нашлось!</h3>
        ) : (
          projectRoles.map(role => (
            <div className={styles.role} key={role.id}>
              <p>{role.name}</p>
              <div className={styles.roleActions}>
                <EditProjectRoleButton roleId={role.id} />
                <RemoveProjectRoleButton roleId={role.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
