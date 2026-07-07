import { useState } from 'react'
import styles from './EditTagGroupButton.module.css'
import { useEditTagGroup } from '../api/mutations'
import { AgreeButton, Card, EditIcon, Modal } from '@/shared'

interface EditTagGroupButtonProps {
  groupId: string
}

export function EditTagGroupButton({ groupId }: EditTagGroupButtonProps) {
  const [isModalOpen, setIsModalOpened] = useState(false)
  const [value, setValue] = useState('')

  const { mutate: editGroup } = useEditTagGroup()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()

    setIsModalOpened(false)
    editGroup({ id: groupId, name: value })
    setValue('')
  }

  return (
    <>
      <EditIcon className={styles.button} onClick={() => setIsModalOpened(true)} />
      {/* вот тут бы спиннер на загрузку поставить */}
      <Modal isOpened={isModalOpen} onClose={() => setIsModalOpened(false)}>
        <Card title='Изменение группы тегов'>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input placeholder='Имя группы' value={value} onChange={e => setValue(e.target.value)} />
            <AgreeButton disabled={!value.trim()}>Подтвердить</AgreeButton>
          </form>
        </Card>
      </Modal>
    </>
  )
}
