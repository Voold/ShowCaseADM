import { useState } from 'react'
import partnerAvatar from '../assets/partner-avatar.svg'
import { useAddPartner } from '../api/mutations'
import styles from './AddPartnerForm.module.css'
import { AgreeButton, Card, Input } from '@/shared'

export function AddPartnerForm() {
  const { mutate: addPartner, isPending } = useAddPartner()
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()

    addPartner({ name: name, avatarUrl: photoUrl || partnerAvatar })
    setName('')
    setPhotoUrl('')
  }

  const validateUrl = (url: string) => {
    if (!url.trim()) {
      setError('')
    } else {
      setError(URL.canParse(url) ? '' : 'Некорректный формат URL')
    }
  }

  const handleURLClear = () => {
    setPhotoUrl('')
    setError('')
  }

  return (
    <Card title='Добавление партнёра'>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <Input placeholder='Имя партнёра' value={name} onChange={e => setName(e.target.value)} onClear={() => setName('')} />
          <div className={`${styles.wrapper} ${error ? styles.error : ''}`}>
            <Input
              className={styles.urlInput}
              placeholder='URL на фото партнёра'
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              onBlur={e => validateUrl(e.target.value)}
              onClear={handleURLClear}
            />
            <p>{error}</p>
          </div>
        </div>
        <AgreeButton className={styles.button} disabled={!name.trim() || !!error} isLoading={isPending}>
          Создать
        </AgreeButton>
      </form>
    </Card>
  )
}
