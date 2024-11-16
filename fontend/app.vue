<template class="bg-slate-200/60 dark:bg-black">
  <NuxtLayout class="bg-slate-200/60 dark:bg-black"> 
    <NuxtPage />
  </NuxtLayout>

  <div v-for="notification in notificationStore.notifications" :key="notification.id">
        <NotificationMessage
            :message="notification.message"
            :type="notification.type"
            @dismiss="notificationStore.removeNotification(notification.id)"
        />
  </div>
</template>

<script setup ts>

  import { useNotificationStore } from '@/stores/notifications';
  const notificationStore = useNotificationStore();

  const { $echo } = useNuxtApp();
  onMounted(() => {
    $echo.channel('notification')
      .listen('UserSessionChanged', (event) => {
          notificationStore.addNotification(event.message, event.type);
      });
  })
</script>
