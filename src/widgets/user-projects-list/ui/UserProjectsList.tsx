import styles from './UserProjectsList.module.css'
import { ProjectSlot, useUserProjects } from '@/entities/project'
import { DynamicList, useQueryFilters, useQuerySync } from '@/shared'

interface UserProjectsListProps {
  userId: string
}

export function UserProjectsList({ userId }: UserProjectsListProps) {
  const { page, setPage, limit, offset, query, setQuery } = useQueryFilters()
  const [localQuery, setLocalQuery] = useQuerySync(query, setQuery)

  const { data, isSuccess, isLoading, isError } = useUserProjects(userId, {
    query: query.toLowerCase(),
    offset: offset,
    limit: limit
  })
  const { projects, total } = data || { projects: [], total: 0 }

  const paginatedProjects = projects.slice(offset, offset + limit)
  const totalPages = Math.ceil(total / limit) || 1

  return (
    <div className={styles.container}>
      <p className={styles.title}>Проекты пользователя</p>
      <DynamicList
        currentPage={page}
        totalPages={totalPages}
        setCurrentPage={setPage}
        searchQuery={localQuery}
        setSearchQuery={setLocalQuery}
        placeholder={'Найти проект...'}
      >
        {isLoading && <h3 className={styles.placeholder}>Загрузка...</h3>}
        {isError && <h3 className={styles.placeholder}>Произошла ошибка :P</h3>}
        {isSuccess && projects.length === 0 ? (
          <h3 className={styles.placeholder}>Ничего не нашлось!</h3>
        ) : (
          paginatedProjects.map(project => <ProjectSlot key={project.id} project={project} onClick={() => {}} />)
        )}
      </DynamicList>
    </div>
  )
}
