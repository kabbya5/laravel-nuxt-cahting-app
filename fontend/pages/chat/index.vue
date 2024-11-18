<template class="bg-white dark:bg-black"> 
    <div class="container mx-auto">
        <div class="p-4 flex align-items-center flex-wrap">
            <button v-for="user in users" :key="user.id" class="px-4 m-3 min-w-fit py-2 bg-black text-white rounded-md">
                {{ user.name }}
            </button>
        </div>

        <div class="border-2 border-slate-200 p-4">
            <div class="relative h-[600px]">
                <div class="absolute bottom-0 left-0 w-full">

                    <div class="text-left px-4">
                        <ul id="message">
                            <li> Test 1: Hello </li>
                            <li> TEst 1 : hi </li>
                        </ul>
                    </div>

                    <form action="#">
                        <div class="flex">
                            <input type="text" name="message" class="w-full border-2 border-slate-300 focus:outline-none">
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

const usersStore = useUsersStore();
await usersStore.fetchIUsers();

const users = usersStore.users;

</script>

