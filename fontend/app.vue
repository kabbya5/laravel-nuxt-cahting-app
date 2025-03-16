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

  <MessageBox />
  
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore';
  import { useNotificationStore } from '@/stores/notifications';
  import { useMessagesStore } from '@/stores/messageToggler';
  
  const messageStore = useMessagesStore();
  const {getUser} = useAuthStore();
  const notificationStore = useNotificationStore();
  const userId = computed(() => getUser()?.id || '');
  const { $echo } = useNuxtApp();

  onMounted(() => {
    $echo.channel('notification')
      .listen('UserSessionChanged', (event) => {
          notificationStore.addNotification(event.message, event.type);
      });

    if (userId.value) {
        $echo.private(`message.receiver.${userId.value}`)
            .listen('.message.sent', (message:any) => {
                messageStore.pushMessage(message.sender_id, message);
            })
            .error((error) => {
                console.error("Pusher subscription error:", error);
            });
    } else {
        console.log("User ID is not available.");
    }
  })

</script>
