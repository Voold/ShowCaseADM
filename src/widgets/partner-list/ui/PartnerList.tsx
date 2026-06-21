import styles from './PartnerList.module.css'
import { PartnerSlot, usePartnersByName } from '@/entities/partner'
import { DynamicList, useQueryFilters, useQuerySync } from '@/shared'

export function PartnerList() {
  const { page, setPage, limit, offset, query, setQuery } = useQueryFilters()
  const [localQuery, setLocalQuery] = useQuerySync(query, setQuery)

  const { data, isSuccess, isLoading, isError } = usePartnersByName(query.toLowerCase(), offset, limit)
  const { partners, total } = data || { partners: [], total: 0 }

  const totalPages = Math.ceil(total / limit) || 1

  return (
    <DynamicList
      currentPage={page}
      totalPages={totalPages}
      setCurrentPage={setPage}
      searchQuery={localQuery}
      setSearchQuery={setLocalQuery}
      placeholder={'Найти партнёра...'}
    >
      {isLoading && <h3 className={styles.placeholder}>Загрузка...</h3>}
      {isError && <h3 className={styles.placeholder}>Произошла ошибка :P</h3>}
      {isSuccess && partners.length === 0 ? (
        <h3 className={styles.placeholder}>Ничего не нашлось!</h3>
      ) : (
        partners.map(partner => <PartnerSlot key={partner.id} partner={partner} />)
      )}
    </DynamicList>
  )
}
