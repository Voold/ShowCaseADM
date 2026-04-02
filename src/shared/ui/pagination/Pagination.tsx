import ChevronIcon from '@/assets/chevron-left.svg?react'
import { useState } from 'react'
import { getPaginationRange, type PaginationRange } from './getPaginationRange'
import styles from './Pagination.module.css'

interface PaginationProps {
  totalPages?: number
  currentPage?: number
  onPageSelect?: (page: number) => void
}

export function Pagination({ totalPages = 1, currentPage = 1, onPageSelect = () => {} }: PaginationProps) {
  const [activePage, setActivePage] = useState(currentPage)
  const pages: PaginationRange = getPaginationRange(activePage, totalPages)

  const selectPage = (page: number) => {
    if (activePage !== page) {
      onPageSelect(page)
      setActivePage(page)
    }
  }

  return (
    <nav className={styles.pagination}>
      <ChevronIcon
        className={`${styles.chevron} ${styles.left} ${activePage === 1 && styles.disabled}`}
        onClick={() => activePage !== 1 && setActivePage(p => p - 1)}
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
              className={`${styles.page} ${activePage == page && styles.active}`}
              onClick={() => selectPage(page)}
            >
              {page}
            </li>
          )
        )}
      </ul>
      <ChevronIcon
        className={`${styles.chevron} ${activePage === totalPages && styles.disabled}`}
        onClick={() => activePage !== totalPages && setActivePage(p => p + 1)}
      />
    </nav>
  )
}
