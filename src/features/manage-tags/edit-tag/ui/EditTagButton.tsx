import { useState } from 'react'
import styles from './EditTagButton.module.css'
import { useEditTag } from '../api/mutations'
import { AgreeButton, Card, EditIcon, Modal } from '@/shared'

interface EditTagButtonProps {
  tagId: string
  groupId: string
}

export function EditTagButton({ tagId, groupId }: EditTagButtonProps) {
  const [isModalOpen, setIsModalOpened] = useState(false)
  const [value, setValue] = useState('')

  const { mutate: editTag } = useEditTag()

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
		
		setIsModalOpened(false)
    editTag({ id: tagId, name: value, groupId: groupId})
    setValue('')
  }

  return (
    <>
      <EditIcon
        className={styles.button}
        onClick={() => {
          setIsModalOpened(true)
        }}
      />
      {/* вот тут бы спиннер на загрузку поставить */}
      <Modal isOpened={isModalOpen} onClose={() => setIsModalOpened(false)}>
        <Card title='Изменение тега'>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input placeholder='Имя тега' value={value} onChange={e => setValue(e.target.value)} />
            <AgreeButton disabled={!value.trim()}>Подтвердить</AgreeButton>
          </form>
        </Card>
      </Modal>
    </>
  )
}
