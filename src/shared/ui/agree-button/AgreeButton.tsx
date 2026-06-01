import styles from './AgreeButton.module.css'

interface AgreeButtonProps {
  active: boolean,
  onSubmit?: () => void
}

export const AgreeButton = ( {active, onSubmit} : AgreeButtonProps) => {
  return(
    <button 
      className={`${styles.submitButton} ${active ? '' : styles.disabled}`} 
      type='submit'
      disabled={!active}
      onClick={active ? onSubmit : undefined}
    >
      Подтвердить
    </button>
  )
}