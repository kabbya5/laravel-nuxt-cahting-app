import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuthStore } from '~/stores/authStore';

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();

  const token = authStore.getToken();

  if (!token) {
    if (process.client && window.location.pathname !== '/login') {
      return navigateTo('/login');
    }
  } else {
    if (process.client && window.location.pathname === '/login') {
      return navigateTo('/');
    }
  }
});
