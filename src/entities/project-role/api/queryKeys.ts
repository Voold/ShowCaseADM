const all = ['project-roles'] as const

export const queryKeys = {
	all: all,
	projectRole: (roleId: string) => [...all, 'project-role', roleId] as const,
	search: [...all, 'search']
}