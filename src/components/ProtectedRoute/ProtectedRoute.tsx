import {Navigate, Outlet} from "react-router-dom";
import styles from './ProtectedRoute.module.css'
import {useAuthStore} from "@/features/auth/store/useAuthStore.ts";
import NavPanel from "@/components/nav-panel/NavPanel.tsx";

const ProtectedRoute = () => {
  const status = useAuthStore((state) => state.status);

  if (status !== 'authenticated') {
    return <Navigate to="/login"/>;
  }

  return (
      <main className={styles.mainPage}>
        <NavPanel/>
        <section className={styles.mainContainer}>
          <Outlet />
        </section>
      </main>
  );
}

export default ProtectedRoute