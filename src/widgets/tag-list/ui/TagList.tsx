import styles from './TagList.module.css'
import { EditTagButton } from '@/features/edit-tag'
import { RemoveTagButton } from '@/features/remove-tag'
import { useTagsByName } from '@/entities/tags'
import { DynamicList, useQueryFilters, useQuerySync } from '@/shared'

export function TagList() {
	const { page, setPage, limit, offset, query, setQuery } = useQueryFilters()
  const [localQuery, setLocalQuery] = useQuerySync(query, setQuery)

  const { data, isSuccess, isLoading, isError } = useTagsByName(query.toLowerCase(), offset, limit)
  const { tags, total } = data || { tags: [], total: 0 }

  const totalPages = Math.ceil(total / limit) || 1

  return (
    <DynamicList
      currentPage={page}
      totalPages={totalPages}
      setCurrentPage={setPage}
      searchQuery={localQuery}
      setSearchQuery={setLocalQuery}
      placeholder={'Найти тег...'}
      className={styles.container}
    >
      {isLoading && <h3 className={styles.placeholder}>Загрузка...</h3>}
      {isError && <h3 className={styles.placeholder}>Произошла ошибка :P</h3>}
      {isSuccess && tags.length === 0 ? (
        <h3 className={styles.placeholder}>Ничего не нашлось!</h3>
      ) : (
        tags.map(tag => (
          <div className={styles.tag} key={tag.id}>
            <p>{tag.name}</p>
            <div className={styles.tagActions}>
              <EditTagButton tagId={tag.id} />
              <RemoveTagButton tagId={tag.id} />
            </div>
          </div>
        ))
      )}
    </DynamicList>
  )
}