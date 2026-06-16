export const queryKeys = {
  all: ['tags'] as const,
  tag: (tagId: string) => [...queryKeys.all, 'tag', tagId] as const,
  search: (query: string, offset: number, limit: number) => [...queryKeys.all, 'search', { query, limit, offset }] as const
}
