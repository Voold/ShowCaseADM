import { useEffect } from "react";
import { useAuthStore, useMe } from "@/entities/user";

export const AuthBootstrapper = () => {
  const status = useAuthStore((state) => state.status);
  const isLoggedOut = useAuthStore((state) => state.isLoggedOut);
  const setStatus = useAuthStore((state) => state.setStatus);

  const shouldCheckSession =
    !isLoggedOut && (status === "idle" || status === "loading");
  const meQuery = useMe(shouldCheckSession);

  useEffect(() => {
    if (status === "idle" && shouldCheckSession) {
      setStatus("loading");
    }
  }, [setStatus, shouldCheckSession, status]);

  useEffect(() => {
    if (!shouldCheckSession) {
      return;
    }

    if (meQuery.isSuccess) {
      setStatus("authenticated");
      return;
    }

    if (meQuery.isError) {
      setStatus("unauthenticated");
    }
  }, [meQuery.isError, meQuery.isSuccess, setStatus, shouldCheckSession]);

  return null;
};
