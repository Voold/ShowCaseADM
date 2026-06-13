import { useState } from 'react'
import { QuickActions } from './QuickActions'
import styles from './QuickActions.module.css'
import PlusIcon from '../assets/plus.svg?react'
import { AgreeButton } from '@/shared'

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
    <Card title='Быстрые действия'>
      <p className={styles.snippet}>Выдать роль &quot;Наставник&quot;</p>

        <div className={styles.inputBlock}>
            <input
                className={styles.input}
                type='text'
                placeholder='12345'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className={styles.addButton} onClick={() => handleAddUser(value)}>
              <PlusIcon/>
            </button>
        </div>

        <div className={styles.namesContainer}>
          {
            users.map((user) => (
              <div key={user.id} className={styles.user}>
                {user.name} [{user.id}]
              </div>
            ))
          }
        </div>

        <AgreeButton
          active={users.length > 0 ? true : false}
        />
      </div>

      <AgreeButton active={users.length > 0 ? true : false} />
    </Card>
  )
}
