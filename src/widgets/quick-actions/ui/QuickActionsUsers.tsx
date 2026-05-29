import { useState } from 'react'
import { QuickActions } from './QuickActions'
import styles from './QuickActions.module.css'
import { AgreeButton } from '@/shared/ui/agree-button/AgreeButton'

interface Users {
  name: string,
  id: string
}


export const QuickActionsUsers = () => {
  
  const [users, setUsers] = useState<Users[]>(
    []
  )
  const [value, setValue] = useState('')

  const addUser = (id: string) => {
    if (id === '123') {
      setValue('')
      return {
        firstName: 'Олег',
        lastName: 'Костромской',
        code: 201
      }
    } else {
      return {
        code: 422
      }
    }
  }

  const handleAddUser = (id: string) => {
    const res = addUser(id)
    if (res.code === 201) {
      setUsers((prev) => [...prev, {id, name: 'Костромской О. Е.'}])
    } else {
      alert('Такого пользователя не существует')
    }
  }



  return (
    <QuickActions title="Быстрые действия">
      <div className={styles.block}>

        <p className={styles.snippet}>Выдать роль "Наставник"</p>

        <div className={styles.inputBlock}>
            <input
                className={styles.input}
                type='text'
                placeholder='12345'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className={styles.addButton} onClick={() => handleAddUser(value)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
        </div>

        <div className={styles.namesContainer}>
          {
            users.map((user) => (
              <div className={styles.user}>
                {user.name} [{user.id}]
              </div>
            ))
          }
        </div>

        <AgreeButton
          active={users.length > 0 ? true : false}
        />
      </div>
    </QuickActions>
  )
}
