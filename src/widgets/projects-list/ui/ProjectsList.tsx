import styles from './ProjectsList.module.css'
import { ProjectSlot, useProjectsByName } from '@/entities/project'
import { DynamicList, useQueryFilters, useQuerySync } from '@/shared'

const ProjectsList = () => {
  const { page, setPage, limit, offset, query, setQuery } = useQueryFilters()
  const [localQuery, setLocalQuery] = useQuerySync(query, setQuery)

  const { data, isSuccess, isLoading, isError } = useProjectsByName(query.toLowerCase(), offset, limit)
  const { projects, total } = data || { projects: [], total: 0 }

  const paginatedProjects = projects.slice(offset, offset + limit)
  const totalPages = Math.ceil(total / limit) || 1

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
