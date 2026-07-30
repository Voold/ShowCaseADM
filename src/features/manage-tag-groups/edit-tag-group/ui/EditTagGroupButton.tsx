import { useState } from 'react'
import styles from './EditTagGroupButton.module.css'
import { useEditTagGroup } from '../api/mutations'
import { AgreeButton, Card, EditIcon, Input, Modal } from '@/shared'

interface EditTagGroupButtonProps {
  groupId: string
}

export function EditTagGroupButton({ groupId }: EditTagGroupButtonProps) {
  const [isModalOpen, setIsModalOpened] = useState(false)
  const [value, setValue] = useState('')

  const { mutate: editGroup, isPending } = useEditTagGroup()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    editGroup(
      { id: groupId, name: value },
      {
        onSettled: () => {
          setIsModalOpened(false)
          setValue('')
        }
      }
    )
  }

  return (
    <>
      <EditIcon className={styles.button} onClick={() => setIsModalOpened(true)} />
      <Modal isOpened={isModalOpen} onClose={() => setIsModalOpened(false)}>
        <Card title='Изменение группы тегов'>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input placeholder='Имя группы' value={value} onChange={e => setValue(e.target.value)} onClear={() => setValue('')} />
            <AgreeButton isLoading={isPending} disabled={!value.trim()}>Подтвердить</AgreeButton>
          </form>
        </Card>
      </Modal>
    </>
  )
}
