import styles from './Logo.module.css'

function Logo() {
  return (
    <div className={styles.container}>
      <img src={'/logo192.png'} className={styles.logo} alt='' />
      <div>
        <p className={styles.title}>ShowCase</p>
        <p className={styles.subtitle}>MANAGEMENT PORTAL</p>
      </div>
    </div>
  )
}

export default Logo
