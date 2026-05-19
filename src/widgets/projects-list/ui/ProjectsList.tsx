import { useEffect, useState } from 'react'
import styles from './ProjectsList.module.css'
import { ProjectSlot, useProjectsByName } from '@/entities/project'
import { DynamicList, useDebounce, useQueryFilters } from '@/shared'

const ProjectsList = () => {
  const { page, setPage, limit, offset, query, setQuery } = useQueryFilters()

  const [localQuery, setLocalQuery] = useState(query)
  const debouncedQuery = useDebounce(localQuery, 500)

  useEffect(() => setQuery(debouncedQuery), [debouncedQuery])
  useEffect(() => setLocalQuery(query), [query])

  const { data: projects = [], isSuccess, isLoading, isError } = useProjectsByName(query.toLowerCase(), offset, limit)

  const paginatedProjects = projects.slice(offset, offset + limit)
  const totalPages = Math.ceil(projects.length / limit) || 1

  return (
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
        paginatedProjects.map(project => <ProjectSlot key={project.id} project={project} />)
      )}
    </DynamicList>
  )
}

export default ProjectsList
