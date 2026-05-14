import type { User } from "../model/types";
import defaultAvatar from '../assets/user-avatar.svg'

export const mockedUsers: User[] = Array.from({length: 24}, (_, i) => ({
	id: (283160 + i).toString(),
	name: `Ярон ${i + 1}. Н.`,
	email: `user${i + 1}@example.com`,
	role: i % 3 === 0 ? 'Админ' : 'Пользователь',
	avatarUrl: defaultAvatar
}));