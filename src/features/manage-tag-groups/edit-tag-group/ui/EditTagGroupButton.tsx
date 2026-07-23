import { useState } from 'react'
import styles from './EditTagGroupButton.module.css'
import { useEditTagGroup } from '../api/mutations'
import type { TagGroup } from '@/entities/tag'
import { AgreeButton, Card, EditIcon, Modal } from '@/shared'

interface EditTagGroupButtonProps {
  group: Omit<TagGroup, 'tags'>
}

export function EditTagGroupButton({ group }: EditTagGroupButtonProps) {
  const [isModalOpen, setIsModalOpened] = useState(false)
  const [value, setValue] = useState(group.name)

  const { mutate: editGroup, isPending } = useEditTagGroup()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    editGroup(
      { id: group.id, name: value },
      {
        onSettled: () => {
          setIsModalOpened(false)
          setValue(group.name)
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
            <input placeholder='Имя группы' value={value} onChange={e => setValue(e.target.value)} />
            <AgreeButton isLoading={isPending} disabled={!value.trim()}>Подтвердить</AgreeButton>
          </form>
        </Card>
      </Modal>
    </>
  )
}
