<template>
    <div class="container mx-auto">
        <div class="w-2/3 xl:max-w-[800px] xl:mx-auto">
            <Day />

            <div class="bg-white">
                <div class="flex items-center mt-6 my-3">
                    <div class="image-wapper w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img src="https://shorturl.at/Vx06F" alt="user" class="w-full h-full object-cover">
                    </div>

                    <div class="w-full ml-6">
                        <input type="text" placeholder="Continue as Name" 
                            class="w-full h-[46px] bg-gray-200 px-4 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                </div>

                <div class="border-2 border-t border-bottom border-gray-200">
                    <div class="flex justify-around py-2">
                        <div class="flex items-center w-full justify-center">
                            <font-awesome class="text-4xl text-red-500" :icon="['fas','video']" /> 
                            <p class="text-gray-500 font-[400] ml-4 text-xl"> Live video </p>
                        </div>

                        <div class="flex items-center w-full justify-center">
                            <font-awesome class="text-4xl text-red-500" :icon="['fas','photo-film']" /> 
                            <p class="text-gray-500 font-[400] ml-4 text-xl"> Photo/video </p>
                        </div>

                        <div class="flex items-center w-full justify-center">
                            <font-awesome class="text-4xl text-red-500" :icon="['fas','face-smile']" /> 
                            <p class="text-gray-500 font-[400] ml-4 text-xl"> Feeling/activity </p>
                        </div>
                    </div>
                </div>
            </div>
        
            
            <PostsPost v-for="post in postsStore.posts" :post="post"/>

            <div v-if="postsStore.loading" class="loading">Loading...</div>
        </div>
        <div class="w-1/3"> </div> 
    </div>

    <div>
        <h1>Welcome to the Home Page</h1>
    </div>

    <div>
        <h1>Notification Example</h1>
       
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
import Day from '~/components/posts/Day.vue';
// definePageMeta({
//     middleware: 'auth',
// });

useHead({
    title:'Chating App',
})

const postsStore = usePostsStore();
const notificationStore = useNotificationStore();
const config = useRuntimeConfig();

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

    // $echo.channel('post.like')
    // .listent('LikedEvent', (e) => {
    //     post
    // })
});


onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll); 
});
</script>
