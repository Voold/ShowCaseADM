const all = ['project-roles'] as const

export const queryKeys = {
  all: all,
  type: (typeId: string) => [...all, 'type', typeId] as const,
  search: [...all, 'search'] as const
}
