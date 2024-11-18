<template>
    <div>
        <h1>Welcome to the Home Page</h1>
    </div>
    <div>
        <h1>Notification Example</h1>
        <button @click="showNotification">Show Notification</button>

        <div v-for="notification in notificationStore.notifications" :key="notification.id">
        <NotificationMessage
            :message="notification.message"
            :type="notification.type"
            @dismiss="notificationStore.removeNotification(notification.id)"
        />
        </div>
    </div>
  </template>

<script setup>
    import { useNotificationStore } from '@/stores/notifications';
    const notificationStore = useNotificationStore();
    const config = useRuntimeConfig();
    const showNotification = () => {
        useCustomFetch(`${config.public.baseURL}/notification`);
        notificationStore.addNotification('This is a notification!', 'success');
    };

</script>
