import styles from './Toast.module.css'

interface ToastProps {
  status?: boolean
  title?: string
  description?: string
  link?: {
    title_link: string
    link: string
  }
  onClose?: () => void
}

export const Toast = ({
  status = true,
  title = 'Уведомление',
  description = 'Не задано описание уведомления',
  link
}: ToastProps) => {
  return (
    <div className={`${styles.toast} ${status ? styles.green : styles.red}`}>
      <h5>{title}</h5>
      <p>{description}</p>
      {link && (
        <a href={link.link} target='_blank' rel='noopener noreferrer'>
          {link.title_link}
        </a>
      )}
    </div>
  )
}
