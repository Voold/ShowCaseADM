import styles from './ProjectsList.module.css'
import { ProjectSlot, useProjectsByName } from '@/entities/project'
import { Pagination, ScrollableList, SearchInput, useQueryFilters, useQuerySync } from '@/shared'

const ProjectsList = () => {
  const { page, setPage, limit, offset, query, setQuery } = useQueryFilters()
  const [localQuery, setLocalQuery] = useQuerySync(query, setQuery)

  const { data, isSuccess, isLoading, isError } = useProjectsByName({query: query.toLowerCase(), offset, limit})
  const { projects, total } = data || { projects: [], total: 0 }

  const totalPages = Math.ceil(total / limit) || 1

  return (
    <div className={styles.container}>
      <SearchInput
        value={localQuery}
        onChange={e => setLocalQuery(e.target.value)}
        onClear={() => setLocalQuery('')}
        placeholder={'Найти проект...'}
      />
      <ScrollableList>
        {isLoading && <h3 className={styles.placeholder}>Загрузка...</h3>}
        {isError && <h3 className={styles.placeholder}>Произошла ошибка :P</h3>}
        {isSuccess && projects.length === 0 ? (
          <h3 className={styles.placeholder}>Ничего не нашлось!</h3>
        ) : (
          projects.map(project => <ProjectSlot key={project.id} project={project} isClickable />)
        )}
      </ScrollableList>
      {totalPages !== 1 && <Pagination currentPage={page} totalPages={totalPages} onPageSelect={setPage} />}
    </div>
  )
}

export default ProjectsList
