import styles from './TagList.module.css'
import { EditTagButton } from '@/features/edit-tag'
import { RemoveTagButton } from '@/features/remove-tag'
import { useTags } from '@/entities/tag'

export function TagList() {
  const { data: tagGroups = [], isSuccess, isLoading, isError } = useTags()

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {isLoading && <h3 className={styles.placeholder}>Загрузка...</h3>}
        {isError && <h3 className={styles.placeholder}>Произошла ошибка :P</h3>}
        {isSuccess && tagGroups.length === 0 ? (
          <h3 className={styles.placeholder}>Ничего не нашлось!</h3>
        ) : (
          tagGroups.map(group => (
            <>
              <p className={styles.groupName}>{group.name}</p>
              {group.tags.map(tag => (
                <div className={styles.tag} key={tag.id}>
                  <p>{tag.name}</p>
                  <div className={styles.tagActions}>
                    <EditTagButton tagId={tag.id} groupId={tag.groupId} />
                    <RemoveTagButton tagId={tag.id} />
                  </div>
                </div>
              ))}
            </>
          ))
        )}
      </div>
    </div>
  )
}
