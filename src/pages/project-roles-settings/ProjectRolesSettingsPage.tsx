import styles from './ProjectRolesSettingsPage.module.css'
import { ProjectRoleList } from '@/widgets/project-role-list'
import { CreateProjectRoleForm } from '@/features/manage-project-roles'

export function ProjectRolesSettingsPage() {
	return (
		<div className={styles.container}>
			<ProjectRoleList/>
			<CreateProjectRoleForm/>
		</div>
	)
}