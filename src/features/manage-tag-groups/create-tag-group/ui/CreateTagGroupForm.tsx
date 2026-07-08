import { useState } from 'react'
import styles from './CreateTagGroupForm.module.css'
import { useCreateTagGroup } from '../api/mutations'
import { AgreeButton, Card } from '@/shared'

export function CreateTagGroupForm() {
  const { mutate: createTagGroup, isPending } = useCreateTagGroup()
  const [groupName, setGroupName] = useState('')

  const handleCreateGroup = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    
    createTagGroup({ name: groupName })
    setGroupName('')
  }

  return (
    <Card title='Добавление группы тегов'>
      <form className={styles.form} onSubmit={handleCreateGroup}>
        <input placeholder='Имя группы' value={groupName} onChange={e => setGroupName(e.target.value)} />
        <AgreeButton disabled={!groupName.trim()} isLoading={isPending} className={styles.button}>
          Создать
        </AgreeButton>
      </form>
    </Card>
  )
}