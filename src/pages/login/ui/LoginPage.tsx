import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { useAuthStore } from "@/entities/user";
import { ROUTES } from "@/shared";

export const LoginPage = () => {
  const navigate = useNavigate();
  const setStatus = useAuthStore((state) => state.setStatus);
  const setLoggedOut = useAuthStore((state) => state.setLoggedOut);

  const handleLogin = () => {
    setLoggedOut(false);
    setStatus("authenticated");
    navigate(ROUTES.MAIN);
  };

  return (
    <div className={styles.mainContainer}>
      Страница входа
      <button className={styles.loginButton} onClick={handleLogin}>
        Войти
      </button>
    </div>
  );
};
