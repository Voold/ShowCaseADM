import s from './CheckpointList.module.css'
import { EditCheckpointGroupButton, RemoveCheckpointGroupButton } from '@/features/manage-checkpoints'
import { CheckpointGroupCard, CheckpointGroupCardSkeleton, useCheckpointGroups } from '@/entities/checkpoint'
import { Pagination, ScrollableList, useQueryFilters } from '@/shared'

export function CheckpointList() {
  const { limit, offset, page, setPage } = useQueryFilters()

  const { data, isLoading, isError } = useCheckpointGroups(limit, offset)
  const { total, checkpointGroups } = data || { total: 0, checkpointGroups: [] }

  const totalPages = Math.ceil(total / limit)

  const renderGroups = () => {
    if (isLoading) return Array.from({ length: 5 }, (_, i) => <CheckpointGroupCardSkeleton key={i} />)
    if (isError) return <h3 className={s.placeholder}>Произошла ошибка :P</h3>
    if (checkpointGroups.length === 0) return <h3 className={s.placeholder}>Ничего не нашлось!</h3>
    return checkpointGroups.map(g => (
      <CheckpointGroupCard
        key={g.id}
        group={g}
        actions={
          <>
            <EditCheckpointGroupButton group={g} />
            <RemoveCheckpointGroupButton groupId={g.id} />
          </>
        }
      />
    ))
  }

  return (
    <div className={s.container}>
      <ScrollableList listClassName={s.list}>{renderGroups()}</ScrollableList>
      {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={page} onPageSelect={setPage} />}
    </div>
  )
}
