<template>
    <div class="shadow-xl dark:bg-black bg-white">
      <div class="container mx-auto px-2 py-3">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-3xl font-lg text-dark dark:text-white"> Home </NuxtLink>
          <div class="flex w-full justify-center">
            <button 
              v-if="userName" 
              @click="clearAuthData"  
              class="text-2xl font-md text-dark dark:text-white"
            >
              {{ userName }} Log out 
            </button>
            <NuxtLink 
              v-else 
              :to="{ name: 'login' }" 
              class="text-2xl font-md text-dark dark:text-white"
            >
              Login
            </NuxtLink>
          </div>
          
          <button 
            @click="darkModeStore.toggleDarkMode" 
            class="dark-mode-toggle text-black dark:text-white"
          >
            <FontAwesomeIcon :icon="darkModeStore.isDark ? 'sun' : 'moon'" size="lg" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useDarkModeStore } from '@/stores/darkMode'; 
  import { useAuthStore } from '~/stores/authStore';
  
  const authStore = useAuthStore();
  const darkModeStore = useDarkModeStore();
  
  const userName = computed(() => authStore.getUserName()); 
  
  const clearAuthData = () => {
    authStore.clearAuthData(); 
  };
  </script>
  