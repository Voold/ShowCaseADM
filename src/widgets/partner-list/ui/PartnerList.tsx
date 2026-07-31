import styles from './PartnerList.module.css'
import { PartnerSlot, PartnerSlotSkeleton, usePartnersByName } from '@/entities/partner'
import { Pagination, ScrollableList, SearchInput, useQueryFilters, useQuerySync } from '@/shared'

export function PartnerList() {
  const { page, setPage, limit, offset, query, setQuery } = useQueryFilters()
  const [localQuery, setLocalQuery] = useQuerySync(query, setQuery)

  const { data, isSuccess, isLoading, isError } = usePartnersByName(query.toLowerCase(), offset, limit)
  const { partners, total } = data || { partners: [], total: 0 }

  const totalPages = Math.ceil(total / limit) || 1

  return (
    <div className={styles.container}>
      <SearchInput
        value={localQuery}
        onChange={e => setLocalQuery(e.target.value)}
        onClear={() => setLocalQuery('')}
        placeholder={'Найти партнёра...'}
      />
      <ScrollableList>
        {isLoading && Array.from({ length: 3 }, (_, i) => <PartnerSlotSkeleton key={i} isClickable={true} />)}
        {isError && <h3 className={styles.placeholder}>Произошла ошибка :P</h3>}
        {isSuccess && partners.length === 0 ? (
          <h3 className={styles.placeholder}>Ничего не нашлось!</h3>
        ) : (
          partners.map(partner => <PartnerSlot key={partner.id} partner={partner} />)
        )}
      </ScrollableList>
      {totalPages !== 1 && <Pagination currentPage={page} totalPages={totalPages} onPageSelect={setPage} />}
    </div>
  )
}
