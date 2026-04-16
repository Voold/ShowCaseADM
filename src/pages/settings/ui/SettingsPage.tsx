import styles from './SettingsPage.module.css'
import { SideBar } from '@/widgets/side-bar'

export const SettingsPage = () => {
  return (
    <main className={styles.settingsPage}>
      <SideBar />
      <section className={styles.settingsContainer}>
        <p>SettingsPage</p>
      </section>
    </main>
  )
}
