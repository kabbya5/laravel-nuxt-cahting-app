import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuthStore } from '~/stores/authStore';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    const token = authStore.getToken(); // Get the current token

    if (!token) {
        if (to.path !== '/login') {
            console.log('Redirecting to login page');
            return navigateTo('/login'); 
        }
    } else{
        if (to.path === '/login') {
            console.log('Redirecting to home page');
            return navigateTo('/'); 
        }
    }
});