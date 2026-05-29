import type { UserRole } from "../model/types";

export const getRoleTranslation = (role: UserRole): string => {
	switch (role.type) {
		case "Default": return "Пользователь"
		case "Student": return "Студент"
		case "Admin": return "Админ"
		case "Curator": return "Куратор"
		case "Mentor": return "Ментор"
		case "Moderator": return "Модеротор"
		case "ROOP": return "РООП"
		case "Teacher": return "Преподаватель"
	}
}