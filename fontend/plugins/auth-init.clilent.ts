import {defineNuxtPlugin} from '#app';
import { useAuthStore } from '~/stores/authStore';

export default defineNuxtPlugin(() => {
    const authStore = useAuthStore();
    authStore.getToken();
});