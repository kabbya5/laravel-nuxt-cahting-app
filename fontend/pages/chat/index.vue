<template class="bg-white dark:bg-black"> 
    <div class="container mx-auto">
        <div class="p-4 flex align-items-center flex-wrap">
            <button v-for="user in users" :key="user.id" 
                @click="selectReciver(user.id)" 
                :class="{
                    'px-4 m-3 min-w-fit py-2 rounded-md': true, 
                    'bg-black text-white': receiverId.value !== user.id, 
                    'bg-blue-500': receiverId === user.id
                }">
                {{ user.name }}
            </button>
        </div>

        <div class="border-2 border-slate-200 p-4">
            <div class="relative h-[400px]">
                <div class="absolute bottom-0 left-0 w-full">

                    <div class="text-left px-4">
                        <ul id="message">
                            <li> Test 1: Hello </li>
                            <li> TEst 1 : hi </li>
                        </ul>
                    </div>

                    <form @submit.prevent="sendMessage">
                        <div class="flex">
                            <input type="text" v-model="message" class="w-full border-2 border-slate-300 focus:outline-none">
                            <button type="submit" id="send" class="bg-blue-600 text-white w-[100px] p-4 rounded-md"> Send </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/stores/usersStore';
import { useChatStore } from '~/stores/chat';

const usersStore = useUsersStore();
const chatStore = useChatStore();
await usersStore.fetchIUsers();

const users = usersStore.users;

const message = ref('');
const receiverId = ref('');


const selectReciver = (id:number) =>{
    receiverId.value = id;

    chatStore.fetchMessages(id);
}
 
const sendMessage = () => {
    if (message.value.trim()) { 
        chatStore.sendMessage(receiverId.value, message.value); 
    }
};






</script>

