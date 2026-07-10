import styles from './Spinner.module.css'

interface SpinnerProps {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return <div className={`${styles.spinner} ${className ?? ''}`} />
}
