import {type ReactNode} from "react";
import { Pagination } from "../pagination/Pagination.tsx";
import { SearchInput } from "../search-input/SearchInput.tsx";
import styles from './DynamicList.module.css';

interface DynamicListProps {
  // Нужный список
  children: ReactNode,
  // Для пагинации
  currentPage: number,
  totalPages: number,
  setCurrentPage: (number: number) => void,
  // Для поиска
  searchQuery: string,
  setSearchQuery: (value: string) => void,
  placeholder: string,
}

export function DynamicList({
    children,
    currentPage,
    totalPages,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    placeholder,
}: DynamicListProps) {
  return (
      <div className={styles.container}>
        <SearchInput
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={placeholder}
        />
        <div className={styles.listWrapper}>
          <div className={styles.list}>
            {children}
          </div>
        </div>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageSelect={setCurrentPage}
        />
      </div>
  );
}