import {useAuthStore} from "@/features/auth/store/useAuthStore.ts";
import {useNavigate} from "react-router-dom";
import styles from './LoginPage.module.css'

const LoginPage = () => {

  const navigate = useNavigate();
  const { setStatus } = useAuthStore();

  const handleLogin = () => {
    setStatus('authenticated')
    navigate('/admin');
  }

  return(
      <div className={styles.mainContainer}>
        Страница входа
        <button
            className={styles.loginButton}
            onClick={handleLogin}
        >
          Войти
        </button>
      </div>
  )
}

export default LoginPage