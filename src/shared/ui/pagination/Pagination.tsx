import { ChevronLeftIcon } from '../../assets'
import { getPaginationRange, type PaginationRange } from './getPaginationRange'
import styles from './Pagination.module.css'

interface PaginationProps {
  totalPages?: number
  currentPage?: number
  onPageSelect?: (page: number) => void
}

export function Pagination({ totalPages = 1, currentPage = 1, onPageSelect = () => {} }: PaginationProps) {
  const pages: PaginationRange = getPaginationRange(currentPage, totalPages)

  const handleSelectPage = (page: number) => {
    if (page !== currentPage) {
      onPageSelect(page)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageSelect(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageSelect(currentPage + 1)
    }
  }

  return (
    <nav className={styles.pagination}>
      <ChevronLeftIcon
        className={`${styles.chevron} ${styles.left} ${currentPage === 1 && styles.disabled}`}
        onClick={handlePrevPage}
      />
      <ul className={styles.pagesList}>
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={i} className={styles.dots}>
              ...
            </span>
          ) : (
            <li
              key={i}
              className={`${styles.page} ${currentPage == page && styles.active}`}
              onClick={() => handleSelectPage(page as number)}
            >
              {page}
            </li>
          )
        )}
      </ul>
      <ChevronLeftIcon
        className={`${styles.chevron} ${currentPage === totalPages && styles.disabled}`}
        onClick={handleNextPage}
      />
    </nav>
  )
}
