import styles from './TagsSettingsPage.module.css'
import { TagList } from '@/widgets/tag-list'
import { CreateTagForm } from '@/features/create-tag'

export function TagsSettingsPage() {
  return (
    <div className={styles.container}>
      <TagList />
      <CreateTagForm />
    </div>
  )
}
