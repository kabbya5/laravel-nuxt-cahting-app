<template>
<div v-for="post in postsStore.posts" :key="post.id" class="post mb-5 border border-2 border-gray-200 p-4 w-full">
    <div class="post-header d-flex justify-between items-center">
        <div class="user-info flex items-center">
            <img class="h-10 w-10 rounded-full" :src="`https://via.placeholder.com/500x480.png/0000bb?text=${post.user.name}`" :alt="post.user.name">
             <div class="pl-3">
                <div v-if="post.page">
                    <p class="font-bold text-black dark:text-white"> {{ post.page.name }} </p>
                </div>
                <p class="text-black dark:text-white" :class="{ 'font-md text-sm': post.page, 'font-bold text-md': !post.page }"> {{ post.user.name }}</p>
                <p class="font-md text-gray-500 text-sm"> {{ post.created_at }}</p>
             </div>
        </div>
    </div>
    <div class="post-body pt-4 text-[#313131] dark:text-white text-md font-[500]  line-heig leading-6">
        <p class="font-bold text-2xl tracking-[0.5px;]"> {{ post.title }}</p>
        <p class="mt-2 tracking-[0.3px] font-md text-justify">
            <span v-if="isExpanded"> {{ post.content }} 
                <button @click="toggleExpanded" style="font-weight: 600;"> {{'See less'}} </button>
            </span> 
            
            <span v-else> 
                {{ strLimit(post.content, 400) }} <button @click="toggleExpanded" style="font-weight: 600;"> {{'See More'}} </button>
            </span>
        </p>

        <img v-if="post.img_url" :src="post.img_url" alt="" class="w-full mt-3">
    </div>

    <div class="post-footer pt-4">
        <div class="py-2 border-t-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div class="flex justify-between align-items-center">
                <span> You and 24 other like this </span>

                <span> 24 Comments</span>

                <span> 2 Shers  </span>
            </div>
        </div>

        <div class="py-2 border-t-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div class="flex justify-around align-items-center">
                <span> You and 24 other like this </span>

                <span> 24 Comments</span>

                <span> 2 Shers  </span>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts';
const postsStore = usePostsStore();

const isExpanded = ref(false);

const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
}

</script>
