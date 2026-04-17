import styles from './SearchInput.module.css'
import SearchIcon from './assets/Search.svg?react'
import type {ChangeEvent} from "react";

interface SearchInputProps {
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = ({value, onChange}: SearchInputProps) => {
  return(
      <div className={styles.container}>
        <div className={styles.search}>
          <SearchIcon className={styles.icon}/>
          <input
              className={styles.input}
              type='text'
              value={value}
              onChange={onChange}
              placeholder={'Найти пользователя'}
          />
        </div>
      </div>
  )
}