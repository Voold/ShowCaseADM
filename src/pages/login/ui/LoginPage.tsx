import { useAuthStore } from "@/entities/user";
import { useNavigate } from "react-router-dom";
import styles from './LoginPage.module.css';
import { ROUTES } from "@/shared/config";

export const LoginPage = () => {

  const navigate = useNavigate();
  const { setStatus } = useAuthStore();

  const handleLogin = () => {
    setStatus('authenticated')
    navigate(ROUTES.ADMIN);
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