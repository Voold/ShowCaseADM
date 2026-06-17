import { useEffect } from 'react'
import styles from './Modal.module.css'
import { Portal } from '..'

interface ModalProps {
	isOpened: boolean
	onOpen?: () => void
	onClose?: () => void
	children?: React.ReactNode
}

export function Modal({isOpened, onOpen, onClose, children}: ModalProps) {
  useEffect(() => {
    onOpen?.()
    const handleEsc = (e: KeyboardEvent) => e.code === 'Escape' && onClose?.()
    window.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <Portal>
      {isOpened && (
        <div
          onClick={onClose}
          className={styles.modal}
          role={'dialog'}
          aria-modal={'true'}
        >
          <div onClick={e => e.stopPropagation()}>{children}</div>
        </div>
      )}
    </Portal>
  )
}
