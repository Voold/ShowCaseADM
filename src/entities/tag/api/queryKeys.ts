export const queryKeys = {
  all: ['tags'] as const,
  tag: (tagId: string) => [...queryKeys.all, 'tag', tagId] as const,
  groups: () => [...queryKeys.all, 'groups'] as const,
  group: (groupId: string) => [...queryKeys.groups(), 'group', groupId] as const
}
