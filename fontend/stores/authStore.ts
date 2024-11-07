import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () =>{
    const token = useCookie('authToken');
    const userName = useCookie('usr-name');

    const setToken = (newToken: string): void => {
        token.value = newToken;
        document.cookie = `authToken=${newToken} ; path=/; max-age=${60 * 60 * 24}; secure=${process.env.Mode_ENV === 'production'}`;
    };

    const setUserName = (name: string ): void =>{
        userName.value = name;
    }

    const getUserName = (): string | null => {
        return userName.value ?? null;
    }

    const getToken = () : string | null => {
        return token.value ?? null;
    }

    const clearAuthData = (): void => {
        token.value = null; // Clear the token cookie
        userName.value = null; // Clear the username cookie
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
        document.cookie = "usr-name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear username cookie if you are using it
    }

    return{
        setToken,
        setUserName,
        getToken,
        getUserName,
        clearAuthData,
    }
})