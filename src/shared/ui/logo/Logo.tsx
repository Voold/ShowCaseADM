import styles from './Logo.module.css'
import LogoIcon from '../assets/tpu.svg?react'

export function Logo() {
  return (
    <div className={styles.container}>
      <LogoIcon className={styles.logo} />
      <div>
        <p className={styles.title}>ShowCase</p>
        <p className={styles.subtitle}>MANAGEMENT PORTAL</p>
      </div>
    </div>
  )
}
