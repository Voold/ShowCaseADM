import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css'
import { SideBar } from '@/widgets/side-bar'

export const MainLayout = () => {
  return (
    <main className={styles.page}>
      <SideBar />
      <section className={styles.container}>
        <Outlet/>
      </section>
    </main>
  )
}
