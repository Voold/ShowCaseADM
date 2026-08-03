import { Link } from 'react-router-dom'
import OpenIcon from '../assets/up.svg?react'
import styles from './UsersList.module.css'
import { getHighestRole, ROLES_TRANSLATIONS, UserSlot, UserSlotSkeleton, useUsersByName } from '@/entities/user'
import { Pagination, ScrollableList, SearchInput, useQueryFilters, useQuerySync } from '@/shared'

const UsersList = () => {
  const { page, setPage, limit, offset, query, setQuery } = useQueryFilters()
  const [localQuery, setLocalQuery] = useQuerySync(query, setQuery)

  const { data, isSuccess, isLoading, isError } = useUsersByName(query.toLowerCase(), offset, limit)
  const { users, total } = data || { users: [], total: 0 }

  const totalPages = Math.ceil(total / limit) || 1

  return (
    <div className={styles.container}>
      <SearchInput
        value={localQuery}
        onChange={e => setLocalQuery(e.target.value)}
        onClear={() => setLocalQuery('')}
        placeholder={'Найти пользователя...'}
      />
      <ScrollableList>
        {isLoading && Array.from({ length: 5 }, (_, i) => <UserSlotSkeleton isClickable={true} key={i} />)}
        {isError && <h3 className={styles.placeholder}>Произошла ошибка :P</h3>}
        {isSuccess && users.length === 0 ? (
          <h3 className={styles.placeholder}>Ничего не нашлось!</h3>
        ) : (
          users.map(user => (
            <Link key={user.id} to={`/user/${user.id}`} className={styles.link}>
              <UserSlot className={styles.userSlot} user={user} onClick={() => {}}>
                <span
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.location.href = `mailto:${user.email}`
                  }}
                  className={styles.email}
                >
                  {user.email}
                  <OpenIcon className={styles.openIcon} />
                </span>
                <div className={styles.roleWrapper}>
                  <p className={`${styles.role} ${user.roles.some(role => role.type === 'Admin') ? styles.active : styles.inactive}`}>
                    {ROLES_TRANSLATIONS[getHighestRole(user.roles).type]}
                  </p>
                </div>
              </UserSlot>
            </Link>
          ))
        )}
      </ScrollableList>
      {totalPages !== 1 && <Pagination currentPage={page} totalPages={totalPages} onPageSelect={setPage} />}
    </div>
  )
}

export default UsersList
