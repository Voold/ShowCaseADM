import type { UserRole } from "../model/types";

export const getRoleTranslation = (role: UserRole): string => {
	switch (role.type) {
		case "Default": return "Пользователь"
		case "Student": return "Студент"
		case "Admin": return "Админ"
	}
}