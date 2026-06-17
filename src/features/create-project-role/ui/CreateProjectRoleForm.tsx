import styles from './CreateProjectRoleForm.module.css'
import { useState } from "react"
import { useCreateProjectRole } from "../api/mutations"
import { AgreeButton, Card } from "@/shared"

export function CreateProjectRoleForm() {
  const { mutate: createTag, isPending } = useCreateProjectRole()
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()

    createTag({name: value})
    setValue('')
  }

  return (
    <Card title='Добавление роли'>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input placeholder='Название роли' value={value} onChange={e => setValue(e.target.value)} />
        <AgreeButton disabled={!value.trim()} isLoading={isPending}>
          Создать
        </AgreeButton>
      </form>
    </Card>
  )
}