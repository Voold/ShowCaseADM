export const queryKeys = {
  all: ['tags'] as const,
  tag: (tagId: string) => [...queryKeys.all, 'tag', tagId] as const,
}
