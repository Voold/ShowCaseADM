import styles from "./UserSlot.module.css"
import UserAvatar from "../../assets/user-avatar.svg?react"
import ThemeSwitcher from "../theme-switcher/ThemeSwitcher"

function UserSlot() {
	return(
		<div className={styles.container}>
			<UserAvatar className={styles.avatar} />
			<div className={styles.description}>
				<p className={styles.name}>Чел челиков</p>
				<p className={styles.role}>xxx-xxx</p>
			</div>
			<ThemeSwitcher />
		</div>
	)
}

export default UserSlot