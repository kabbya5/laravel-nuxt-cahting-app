<template>

    <div class="container mx-auto">
        <div class="w-2/3 xl:max-w-[800px] xl:mx-auto">
            <Posts />
            <div v-if="postsStore.loading" class="loading">Loading...</div>
        </div>
        <div class="w-1/3"> </div>
        

       
    </div>
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

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts';
import { useNotificationStore } from '@/stores/notifications';
definePageMeta({
    middleware: 'auth',
});

const postsStore = usePostsStore();
const notificationStore = useNotificationStore();
const config = useRuntimeConfig();

const showNotification = () => {
    postsStore.fetchPosts(); 
    useCustomFetch(`${config.public.baseURL}/notification`);  // Custom fetch for notifications
    notificationStore.addNotification('This is a notification!', 'success');
};

const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        if (!postsStore.loading && postsStore.hasMore) {
            postsStore.fetchPosts();
        }
    }
};



onMounted(async () => {
    postsStore.fetchPosts();
    window.addEventListener('scroll', handleScroll); 

});


onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll); 
    
});
</script>
