import { useState, type SyntheticEvent } from 'react'
import styles from './CreateCheckpointGroupForm.module.css'
import { useCreateCheckpointGroup } from '../api/mutations'
import { AgreeButton, Card, DatePicker, Input } from '@/shared'

type Field = {
  id: string
  name: string
  date: Date | null
}

const createEmptyField = (): Field => ({ id: crypto.randomUUID(), name: '', date: null })

export function CreateCheckpointGroupForm() {
  const { mutate: createGroup, isPending } = useCreateCheckpointGroup()

  const [title, setTitle] = useState('')
  const [fields, setFields] = useState<Field[]>([createEmptyField()])

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
    createGroup(
      { title, checkpoints: fields.filter(f => f.name.trim() && f.date).map(f => ({ title: f.name, deadline: f.date! })) },
      {
        onSuccess: () => {
          setTitle('')
          setFields([createEmptyField()])
        }
      }
    )
  }

  const isReady = title !== '' && fields.length > 1 && fields.slice(0, -1).every(f => f.name && f.date)

  return (
    <form onSubmit={handleSubmit}>
      <Card title='Создание нового набора' className={styles.form}>
        <div className={styles.fields}>
          <Input placeholder='Название набора' value={title} onChange={e => setTitle(e.target.value)}></Input>
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
          Создать
        </AgreeButton>
      </Card>
    </form>
  )
}
