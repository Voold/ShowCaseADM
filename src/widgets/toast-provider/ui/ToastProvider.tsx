import styles from './ToastProvider.module.css'
import { Toast, useToastsStore } from '@/entities/toast'
import { Portal } from '@/shared'

export function ToastProvider() {
  const { toasts, hide } = useToastsStore()
  return (
    <Portal>
      <div className={styles.list}>
        {toasts.map(t => (
          <Toast toast={t} key={t.id} onClose={hide} />
        ))}
      </div>
    </Portal>
  )
}
