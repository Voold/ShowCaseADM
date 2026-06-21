export const queryKeys = {
  all: ['partners'] as const,
  partner: (partnerId: string) => [...queryKeys.all, 'partner', partnerId] as const,
  search: (query: string, offset: number, limit: number) => [...queryKeys.all, 'search', { query, limit, offset }] as const
}
