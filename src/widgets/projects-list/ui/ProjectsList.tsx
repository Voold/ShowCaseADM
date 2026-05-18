import { useEffect, useState } from 'react'
import { mockedProjects, ProjectSlot } from '@/entities/project'
import { DynamicList, useDebounce, useQueryFilters } from '@/shared'

const ProjectsList = () => {
  const { page, setPage, limit, offset, query, setQuery } = useQueryFilters()

  const [localQuery, setLocalQuery] = useState(query)
  const debouncedQuery = useDebounce(localQuery, 500)

  useEffect(() => setQuery(debouncedQuery), [debouncedQuery])
  useEffect(() => setLocalQuery(query), [query])

  const filteredProjects = mockedProjects.filter(project => {
    const lowerQuery = query.toLowerCase()
    return project.name.toLowerCase().includes(lowerQuery)
  })

  const paginatedProjects = filteredProjects.slice(offset, offset + limit)
  const totalPages = Math.ceil(filteredProjects.length / limit) || 1

  return (
    <DynamicList
      currentPage={page}
      totalPages={totalPages}
      setCurrentPage={setPage}
      searchQuery={localQuery}
      setSearchQuery={setLocalQuery}
      placeholder={'Найти проект...'}
    >
      {paginatedProjects.map(project => (
        <ProjectSlot key={project.id} project={project} />
      ))}
    </DynamicList>
  )
}

export default ProjectsList
