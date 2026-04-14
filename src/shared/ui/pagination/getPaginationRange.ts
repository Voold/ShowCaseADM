export type PaginationRange = (number | '...')[]

const targetRange = 7
const offset = 1

export const getPaginationRange = (currentPage: number, totalPages: number): PaginationRange => {
  if (totalPages <= targetRange) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const hasLeftEllipsis = currentPage - offset > 2
  const hasRightEllipsis = currentPage + offset < totalPages - 1

  if (!hasLeftEllipsis && hasRightEllipsis) {
    const leftRange = Array.from({length: targetRange - 2}, (_, i) => i + 1)
    return [...leftRange, '...', totalPages]
  } 
  
  if (hasLeftEllipsis && !hasRightEllipsis) {
    const rightRange = Array.from({length: targetRange - 2}, (_, i) => totalPages - (targetRange - 2) + i + 1)
    return [1, '...', ...rightRange]
  }

  const middleRange = Array.from({length: offset * 2 + 1}, (_, i) => currentPage - 1 + i)
  return [1, '...', ...middleRange, '...', totalPages]
}
