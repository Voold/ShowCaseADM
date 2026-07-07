import styles from './TagsSettingsPage.module.css'
import { TagList } from '@/widgets/tag-list'
import { CreateTagForm } from '@/features/manage-tags'
import { CreateTagGroupForm } from '@/features/manage-tag-groups'

export function TagsSettingsPage() {
  return (
    <div className={styles.container}>
      <TagList />
      <div className={styles.forms}>
        <CreateTagForm />
        <CreateTagGroupForm />
      </div>
    </div>
  )
}
