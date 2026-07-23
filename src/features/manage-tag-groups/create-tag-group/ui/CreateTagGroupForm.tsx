import { useState } from 'react'
import styles from './CreateTagGroupForm.module.css'
import { useCreateTagGroup } from '../api/mutations'
import { AgreeButton, Card, Input } from '@/shared'

export function CreateTagGroupForm() {
  const { mutate: createTagGroup, isPending } = useCreateTagGroup()
  const [groupName, setGroupName] = useState('')

  const handleCreateGroup = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    createTagGroup({ name: groupName }, { onSuccess: () => setGroupName('') })
  }

  return (
    <Card title='Добавление группы тегов'>
      <form className={styles.form} onSubmit={handleCreateGroup}>
        <Input placeholder='Имя группы' value={groupName} onChange={e => setGroupName(e.target.value)} onClear={() => setGroupName('')} />
        <AgreeButton disabled={!groupName.trim()} isLoading={isPending} className={styles.button}>
          Создать
        </AgreeButton>
      </form>
    </Card>
  )
}
