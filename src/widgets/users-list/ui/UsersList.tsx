import { useEffect, useState } from 'react'
import styles from './UsersList.module.css'
import OpenIcon from '../assets/up.svg?react'
import { getHighestRole, getRoleTranslation, mockedUsers, UserSlot } from '@/entities/user'
import { DynamicList, useDebounce, useQueryFilters } from '@/shared'

const UsersList = () => {
  const { page, setPage, limit, offset, query, setQuery } = useQueryFilters()

  const [localQuery, setLocalQuery] = useState(query)
  const debouncedQuery = useDebounce(localQuery, 500)

  useEffect(() => setQuery(debouncedQuery), [debouncedQuery])
  useEffect(() => setLocalQuery(query), [query])

  const filteredUsers = mockedUsers.filter(user => {
    const lowerQuery = query.toLowerCase()
    return user.meta.name.toLowerCase().includes(lowerQuery) || user.email.toLowerCase().includes(lowerQuery)
  })

  const paginatedUsers = filteredUsers.slice(offset, offset + limit)
  const totalPages = Math.ceil(filteredUsers.length / limit) || 1

  return (
    <DynamicList
      currentPage={page}
      totalPages={totalPages}
      setCurrentPage={setPage}
      searchQuery={localQuery}
      setSearchQuery={setLocalQuery}
      placeholder={'Найти пользователя...'}
    >
      {paginatedUsers.map(user => (
        <UserSlot className={styles.userSlot} key={user.id} user={user}>
          <a href={`mailto:${user.email}`} className={styles.email}>
            {user.email}
            <OpenIcon className={styles.openIcon} />
          </a>
          <p className={`${styles.role} ${user.roles.some(role => role.type === 'Admin') ? styles.active : styles.inactive}`}>
            {getRoleTranslation(getHighestRole(user.roles))}
          </p>
        </UserSlot>
      ))}
    </DynamicList>
  )
}

export default UsersList
