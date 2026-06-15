import styles from './ConfirmModal.module.css'
import { Card } from '../card/Card'
import { Modal } from '../modal/Modal'

interface ConfirmModalProps {
  isOpened: boolean
  text?: string
  onSubmit?: () => void
  onReject?: () => void
}

export function ConfirmModal({ isOpened, text = 'Продолжить действие?', onSubmit, onReject }: ConfirmModalProps) {
  return (
    <Modal isOpened={isOpened} onClose={onReject}>
      <Card title='Вы уверены?' className={styles.card}>
        <div className={styles.wrapper}>
          <p>{text}</p>
          <div className={styles.actions}>
            <button onClick={onSubmit} className={styles.confirm}>
              Да
            </button>
            <button onClick={onReject} className={styles.reject}>
              Нет
            </button>
          </div>
        </div>
      </Card>
    </Modal>
  )
}
