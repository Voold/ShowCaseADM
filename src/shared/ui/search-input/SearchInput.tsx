import type { ComponentPropsWithoutRef } from 'react'
import styles from './SearchInput.module.css'
import { Input } from '../input/Input'
import { SearchIcon } from '../../'

interface SearchInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'children'> {
  onClear?: () => void
}

export function SearchInput({ onClear, className, ...props }: SearchInputProps) {
  return (
    <Input
      className={`${styles.input} ${className ?? ''}`}
      onClear={onClear}
      leadingIcon={<SearchIcon className={styles.searchIcon} />}
			{...props}
    />
  )
}
