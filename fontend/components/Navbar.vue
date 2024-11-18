<template>
    <div class="shadow-xl dark:bg-black bg-white">
      <div class="container mx-auto px-2 py-3">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-3xl font-lg text-dark dark:text-white"> Home </NuxtLink>
          <div class="flex w-full justify-center">
            <div class="flex justify-between items-center w-1/2">

            
              <NuxtLink 
                :to="{ name: 'chat' }" 
                class="text-2xl font-md text-dark dark:text-white"
              >
                Chat 
              </NuxtLink>

              <button 
                v-if="userName" 
                @click="handelLogout"  
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
          </div>
          
          <button 
            @click="darkModeStore.toggleDarkMode" 
            class="dark-mode-toggle text-black dark:text-white"
          >
            <FontAwesomeIcon :icon="darkModeStore.isDark ? 'sun' : 'moon'" size="lg" />
          </button>
        </div>
      </div>

      <div v-for="notification in notificationStore.notifications" :key="notification.id">
            <NotificationMessage
                :message="notification.message"
                :type="notification.type"
                @dismiss="notificationStore.removeNotification(notification.id)"
            />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useDarkModeStore } from '@/stores/darkMode'; 
  import { useAuthStore } from '~/stores/authStore';
  import { useNotificationStore } from '#imports';

  const notificationStore = useNotificationStore();
  const apiUrl = getBaseUrl();
  const authStore = useAuthStore();
  const darkModeStore = useDarkModeStore();
  const {getUser}  = useAuthStore();

  const userName = computed(() => getUser()?.name || '');

  const clearAuthData = () => {
    authStore.clearAuthData(); 
  };

  const handelLogout = async() =>{
    try{
      const response = await useCustomFetch(`${apiUrl}/logout`,{
        method:'POST',
      });

      if (response && response._rawValue.success) {
          notificationStore.addNotification('Successfully Low out', 'info');
          clearAuthData();
      }else{
        
        notificationStore.addNotification('Logout Faild', 'error');
      }
    } catch(error){
      notificationStore.addNotification('Logout Faild', 'error');
    }
  }
  
  </script>
  