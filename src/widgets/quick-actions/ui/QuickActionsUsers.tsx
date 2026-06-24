import { useState } from 'react'

import styles from './QuickActionsUsers.module.css'
import { useSetUserRole } from '@/features/update-user-roles'
import { useUsersByName, type UserBase } from '@/entities/user'
import { AgreeButton, Card, FloatingList, SearchInput, useQuerySync } from '@/shared'

export const QuickActionsUsers = () => {
  const [chosenUsers, setChosenUsers] = useState<UserBase[]>([])
  
  const [query, setQuery] = useState('')
  const [localQuery, setLocalQuery] = useQuerySync(query, setQuery)
  
  const { data, isLoading, isError } = useUsersByName(query.toLowerCase(), 0, 5, !!query)
  const users = data?.users.filter(user => !chosenUsers.includes(user)) || []
  
  const { mutate: setRoleMutate } = useSetUserRole()
  
  const renderUserList = () => {
    if (isLoading) return <h6>Загрузка...</h6>
    if (isError) return <h6>Произошла ошибка :P</h6>
    return users.map(user => (
      <button onClick={() => setChosenUsers(p => [...p, user])} className={styles.user} key={user.id}>
        {user.meta.name} [{user.id}]
      </button>
    ))
  }

  const isListVisible = users.length > 0 || isError || isLoading

  const handleSubmit = () => {
    chosenUsers.forEach(user => setRoleMutate({ userId: user.id, type: 'Curator', payload: {} }))
    setChosenUsers([])
  }

  return (
    <Card title='Быстрые действия'>
      <p className={styles.snippet}>Выдать роль &quot;Наставник&quot;</p>

      <div className={styles.searchWrapper}>
        <SearchInput
          placeholder='Имя или ID пользователя'
          value={localQuery}
          onChange={e => setLocalQuery(e.target.value)}
        />
        {isListVisible && <FloatingList className={styles.userList}>{renderUserList()}</FloatingList>}
      </div>

      <div className={styles.chosenUserList}>
        {chosenUsers.map(user => (
          <div key={user.id} className={styles.chosenUser}>
            <p>
              {user.meta.name} [{user.id}]
            </p>
            <button className={styles.removeButton} onClick={() => setChosenUsers(p => p.filter(u => u.id !== user.id))} />
          </div>
        ))}
      </div>

      <AgreeButton disabled={chosenUsers.length === 0} onClick={handleSubmit}>Подтвердить</AgreeButton>
    </Card>
  )
}
