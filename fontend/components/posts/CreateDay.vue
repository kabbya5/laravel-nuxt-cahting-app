<template>
<div class="fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 z-50 flex text-white">
    <div class="sidebar pt-6 px-4 bg-white h-screen w-64">
        <div class="flex items-center pb-3 border-2 border-bottom border-gray-200">
            <button @click="closeForm" class="close-day-form bg-gray-500  mr-4 text-white w-12 h-12 rounded-full">  X  </button>
            <NuxtLink to="/" class=" text-black"> 
                <font-awesome :icon="['fab', 'facebook']" class="text-5xl" />
            </NuxtLink>
        </div>
        
    </div>
    <div class="text-center">
        <h1 class="text-6xl font-bold mb-4 animate-bounce">Beautiful Day</h1>
        <p class="text-lg font-medium">Make the most out of your day!</p>
    </div>
</div>
</template>

<script setup lang="ts">
const props = defineProps({
  closeForm: {
    type: Function,
    required: true,
  },
});
</script>