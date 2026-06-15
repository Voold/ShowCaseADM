import { useState } from 'react'
import styles from './CreateTagForm.module.css'
import { useCreateTag } from '../api/mutations'
import { AgreeButton, Card } from '@/shared'

export function CreateTagForm() {
  const { mutate: createTag, isPending } = useCreateTag()
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()

    createTag({name: value})
    setValue('')
  }

  return (
    <Card title='Добавление тега'>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input id='tagName' placeholder='Имя тега' value={value} onChange={e => setValue(e.target.value)} />
        <AgreeButton disabled={!value.trim()} isLoading={isPending}>
          Создать
        </AgreeButton>
      </form>
    </Card>
  )
}
