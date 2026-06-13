import styles from './SearchInput.module.css'
import SearchIcon from './assets/Search.svg?react'
import type {ChangeEvent} from "react";

interface SearchInputProps {
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  className?: string
}

export const SearchInput = ({value, onChange, placeholder, className}: SearchInputProps) => {
  return(
      <div className={className}>
        <div className={styles.search}>
          <SearchIcon className={styles.icon}/>
          <input
              className={styles.input}
              type='text'
              value={value}
              onChange={onChange}
              placeholder={placeholder}
          />
        </div>
      </div>
  )
}