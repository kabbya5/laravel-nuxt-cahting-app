<template>
    <div class="container mx-auto flex">
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
       
        <div class="w-1/3 flex justify-end">
            <div class="w-full lg:w-2/3">
                <div class="border border-2 border-gray-200 p-4" v-if="onlineFriendsStore.onlineFriends.length > 0">
                    <h2 class="text-gray-500 font-semibold text-lg mb-3">Contact</h2>
                    <div class="mb-4" v-for="friend in onlineFriendsStore.onlineFriends" :key="friend.id" 
                        @click="showMessageBox(friend.id)">
                        <div class="flex items-center space-x-3">
                            <div class="relative w-10 h-10">
                                <img class="w-full h-full object-cover rounded-full"
                                    :src="friend.profile_picture || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s'"
                                    :alt="friend.name">
                                <span class="absolute bottom-0 right-0 w-3 h-3 z-50 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                            
                            <div>
                                <p class="text-gray-800 font-semibold">{{ friend.name }}</p>
                                <p class="text-xs text-gray-500">Online</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    
    <div>
        <h1> Welcome to the Home Page </h1>
    </div>

    <div>
        <h1> Notification Example </h1>
       
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
import { useMessagesStore } from '@/stores/messageToggler';
import Day from '~/components/posts/Day.vue';

definePageMeta({
    middleware: 'auth',
});

useHead({
    title:'Chating App',
})
const onlineFriendsStore = useOnlineFriendsStore();
const postsStore = usePostsStore();
const notificationStore = useNotificationStore();
const config = useRuntimeConfig();
const messageStore = useMessagesStore();

const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        if (!postsStore.loading && postsStore.hasMore) {
            postsStore.fetchPosts();
        }
    }
};

const { pending, error } = await useAsyncData('onlineFriends', async () => {
  await onlineFriendsStore.getOnlineFriends();
});

const showMessageBox = (receiverId: number) => {
//   messageStore.togglerMessageBox[userId] = true;  
  messageStore.getMessage(receiverId);
};
onMounted(() => {
    onlineFriendsStore.getOnlineFriends();
    postsStore.fetchPosts();
    window.addEventListener('scroll', handleScroll); 
    // $echo.channel('post.like')
    // .listent('LikedEvent', (e) => {
    //     post
    // })
});


// onBeforeUnmount(() => {
//     window.removeEventListener('scroll', handleScroll); 
// });
</script>
