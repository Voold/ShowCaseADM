import { useState, type SyntheticEvent } from 'react'
import styles from './CreateCheckpointGroup.module.css'
import { useCreateCheckpointGroup } from '../api/mutations'
import { AgreeButton, Card, Input } from '@/shared'

export function CreateCheckpointGroup() {
  const { mutate: createGroup, isPending } = useCreateCheckpointGroup()

  const [title, setTitle] = useState('')
  const [fields, setFields] = useState<string[]>([''])

  const handleChange = (index: number, value: string) => {
    setFields(f => {
      const updated = f.map((v, i) => (i === index ? value.trim() : v))
      if (index === f.length - 1 && value.trim() !== '') updated.push('')
      return updated
    })
  }

  const handleRemove = (index: number) => {
    setFields(f => f.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    createGroup(
      { title, checkpoints: fields.map(v => ({ title: v, deadline: new Date() })) },
      {
        onSuccess: () => {
          setTitle('')
          setFields([''])
        }
      }
    )
  }

  return (
    <Card>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h5>Создание нового набора</h5>
        <div className={styles.fields}>
          <Input placeholder='Название набора' value={title} onChange={e => setTitle(e.target.value)} onClear={() => setTitle('')}></Input>
          {fields.map((v, i) => (
            <Input
              key={i}
              placeholder='Название чекпоинта'
              value={v}
              onChange={e => handleChange(i, e.target.value)}
              onClear={() => handleRemove(i)}
              isCloseAlwaysVisible={i !== fields.length - 1}
            />
          ))}
        </div>
        <AgreeButton
          className={styles.submitButton}
          isLoading={isPending}
          disabled={title === '' || fields.length === 1 || fields.some((v, i) => !v && i !== fields.length - 1)}
        >
          Создать
        </AgreeButton>
      </form>
    </Card>
  )
}
