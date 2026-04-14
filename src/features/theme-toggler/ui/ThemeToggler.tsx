import { useState } from 'react'
import styles from './ThemeToggler.module.css'
import DarkThemeIcon from '../../assets/dark-theme.svg?react'
import LightThemeIcon from '../../assets/light-theme.svg?react'

export function ThemeToggler() {
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const toggleTheme = () => setIsDarkTheme(d => !d)

  const ThemeIcon = isDarkTheme ? DarkThemeIcon : LightThemeIcon

  return <ThemeIcon className={styles.switch} onClick={toggleTheme} />
}
