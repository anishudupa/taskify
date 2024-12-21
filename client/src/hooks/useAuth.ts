import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
	const { clearToken, isAuthenticated, setToken, token } = useAuthStore();
	return { clearToken, isAuthenticated, setToken, token };
};
