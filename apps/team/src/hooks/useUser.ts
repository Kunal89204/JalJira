import { useStore } from "@/store/store";

const useUser = () => {
  const { isAuthenticated, logout, setUser, token, user } = useStore();
  return { isAuthenticated, logout, setUser, token, user };
};

export default useUser;
