
export const useStoreToken = () => {

    const setToken = (token : string): void => {
        document.cookie = `authToken = ${token}; path=/; max-age=${60 * 60 * 24};secure=${process.env.NODE_ENV === 'production'}`;
    }

    const getToken = () =>{
        const value = `; ${document.cookie}`;
        const parts = value.split('; authToken=');
        if (parts.length === 2) {
            return parts.pop().split(';')[0]; 
        }

        return null;
    }

    const getUserName = (): string | null => {
        const userNameCookie = useCookie('user-name');
        const userName =  userNameCookie.value ? userNameCookie.value : null;
        return userName;
    };

    const setUserName = (name:string): void => {
        const userName = useCookie('user-name');
        userName.value = name;
    }

    return {
        setToken,
        getToken,
        getUserName,
        setUserName,
    };

    
}