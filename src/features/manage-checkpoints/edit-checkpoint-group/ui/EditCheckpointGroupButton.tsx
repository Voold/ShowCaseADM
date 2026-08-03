import { useState, type SyntheticEvent } from 'react'
import styles from './EditCheckpointGroupButton.module.css'
import { useEditCheckpointGroup } from '../api/mutations'
import { type CheckpointGroup } from '@/entities/checkpoint'
import { AgreeButton, Card, DatePicker, EditIcon, Input, Modal } from '@/shared'

type Field = {
  id: string
  name: string
  date: Date | null
}

const createEmptyField = (): Field => ({ id: crypto.randomUUID(), name: '', date: null })

interface EditCheckpointGroupButtonProps {
  group: CheckpointGroup
}

export function EditCheckpointGroupButton({ group }: EditCheckpointGroupButtonProps) {
  const [isModalOpen, setIsModalOpened] = useState(false)
  const { mutate: editGroup, isPending } = useEditCheckpointGroup()

  const [title, setTitle] = useState(group.title)
  const [fields, setFields] = useState<Field[]>(group.checkpoints.map(c => ({ id: crypto.randomUUID(), name: c.title, date: c.deadline })))

  const handleChange = (index: number, fieldName: 'name' | 'date', value: string | (Date | null)) => {
    setFields(f => {
      const newFields: Field[] = f.map((item, i) => (i === index ? { ...item, [fieldName]: value } : item))

      const targetField = newFields[index]
      const isEmpty = targetField.name.trim() === '' && targetField.date === null

      if (index === f.length - 1 && !isEmpty) {
        newFields.push(createEmptyField())
      }

      return newFields
    })
  }

  const handleRemove = (index: number) => {
    setFields(f => f.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    editGroup(
      { id: group.id, title, checkpoints: fields.filter(f => f.name.trim() && f.date).map(f => ({ title: f.name, deadline: f.date! })) },
      {
        onSettled: () => {
          setIsModalOpened(false)
          setTitle(group.title)
          setFields(group.checkpoints.map(c => ({ id: crypto.randomUUID(), name: c.title, date: c.deadline })))
        }
      }
    )
  }

  const isReady = title !== '' && fields.length > 1 && fields.slice(0, -1).every(f => f.name && f.date)

  return (
    <>
      <EditIcon className={styles.button} onClick={() => setIsModalOpened(true)} />
      <Modal isOpened={isModalOpen} onClose={() => setIsModalOpened(false)}>
        <form onSubmit={handleSubmit}>
          <Card title='Редактирование набора' className={styles.form}>
            <div className={styles.fields}>
              <Input
                placeholder='Название набора'
                value={title}
                onChange={e => setTitle(e.target.value)}
                onClear={() => setTitle('')}
              ></Input>
              {fields.map((f, i) => (
                <Input
                  key={f.id}
                  className={styles.field}
                  placeholder='Название чекпоинта'
                  value={f.name}
                  onChange={e => handleChange(i, 'name', e.target.value)}
                  onClear={() => handleRemove(i)}
                  isCloseAlwaysVisible={i !== fields.length - 1}
                >
                  <DatePicker value={f.date} onChange={date => handleChange(i, 'date', date)} position='left' />
                </Input>
              ))}
            </div>
            <AgreeButton className={styles.submitButton} isLoading={isPending} disabled={!isReady}>
              Применить
            </AgreeButton>
          </Card>
        </form>
      </Modal>
    </>
  )
}
