import {QuickActions} from "@/widgets/quick-actions";
import {BriefAnalysis} from "@/widgets/brief-analysis";
import styles from "./UsersPage.module.css"
import {UsersList} from "@/widgets/users-list";

export const UsersPage = () => {
  return (
      <main className={styles.mainContainer}>
        <h2 className={styles.usersTitle}>Пользователи</h2>
        <div className={styles.content}>
          <UsersList />
          <div className={styles.quickSide}>
            <QuickActions />
            <BriefAnalysis />
          </div>
        </div>
      </main>
  )
}
