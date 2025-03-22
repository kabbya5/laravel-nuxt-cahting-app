<template>
  <div class="fixed bottom-4 right-3 flex space-x-4"
     v-if="Object.keys(messageStore.togglerMessageBox).length > 0">
   
   <div class="w-96 bg-gray-100 p-3 rounded-lg shadow-lg" 
        v-for="[id, messageBox] in Object.entries(messageStore.togglerMessageBox)" 
        :key="id">
        
     <div class="flex justify-between items-center bg-green-500 text-white p-2 rounded-t-lg">
       <div class="flex items-center">
          <img :src="messageBox.profile_picture" alt="" class="w-8 h-8 rounded-full mr-2">
          <span> {{messageBox.name}} </span>
       </div>
      
       <button class="text-xl" @click="toggleMessageBox(messageBox.id)">&times;</button>
     </div>
 
     <div class="p-2 space-y-2 h-80 overflow-y-auto pb-10" 
        :ref="(el) => setMessageBoxRef(el, messageBox.id)" @scroll="handelScroll(messageBox.id)">
        <div v-for="msg in getMessages(messageBox.id)" :key="msg.id">
          <div v-if="msg.sender_id == userId" class="w-full flex justify-end bg-white text-gray-800 p-2 rounded-lg shadow">
              <p class="">{{ msg.content }}</p>
          </div>
          <div v-else class="bg-green-100 text-black text-semibold p-2 rounded-lg shadow">
              <p class="">{{ msg.content }}</p>
          </div>
        </div>
     </div>
 
     <div class="mt-2 flex items-center border-t pt-2">
       <input v-model="newMessage[messageBox.id]" type="text" 
         placeholder="Type a message..."
         class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
       <button @click="sendMessage(messageBox.id)" 
         class="ml-2 bg-green-500 text-white px-3 py-1 rounded-lg shadow">Send</button>
     </div>
 
   </div>
 </div>
</template>

<script setup lang="ts">
import { useMessagesStore } from '@/stores/messageToggler';
import { useAuthStore } from '@/stores/authStore';
import { ref, nextTick, computed, onMounted, watch } from 'vue';

const { getUser } = useAuthStore();
const messageStore = useMessagesStore();

const messageBoxRefs = ref<{ [key: number]: HTMLElement | null }>({});
const newMessage = ref<{ [key: number]: string }>({});

const userId = computed(() => getUser()?.id || '');

const toggleMessageBox = (receiverId: number) => {
  messageStore.hideShowMessageBox(receiverId);
};

const sendMessage = (receiverId: number) => {
  if (!newMessage.value[receiverId]) return;


  messageStore.sendMessage(receiverId, {
    content: newMessage.value[receiverId],
  });

  newMessage.value[receiverId] = "";
  scrollToBottom(receiverId);
};

const getMessages = (receiverId: number): any[] => {
  const userMessages = messageStore.messages.find(m => m.receiverId === receiverId);
  return userMessages?.messages ?? [];
};

const setMessageBoxRef = (el: HTMLElement | null, id: number) => {
  if (el) {
    messageBoxRefs.value[id] = el;
  }
};

const scrollToBottom = (receiverId: number) => {
  nextTick(() => {
    const messageBox = messageBoxRefs.value[receiverId];
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight;
    }
  });
};

const handelScroll = (receiverId:number) =>{
  const messageBox = messageBoxRefs.value[receiverId];
  if(messageBox){
    const {scrollTop, scrollHeight, clientHeight} = messageBox;
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) <= 100;
    if(isNearBottom){
        messageStore.readMessage(receiverId);
    }
  }
}

onMounted(() => {
  // Scroll to bottom for all message boxes on mount
  Object.keys(messageStore.togglerMessageBox).forEach(id => {
    scrollToBottom(Number(id));
  });
});

watch(
  () => messageStore.messages,
  () => {
    // Scroll to bottom when messages change
    Object.keys(messageStore.togglerMessageBox).forEach(id => {
      scrollToBottom(Number(id));
    });
  },
  { deep: true }
);

watch(
  () => messageStore.togglerMessageBox,
  () => {
    // Scroll to bottom when a new message box is opened
    Object.keys(messageStore.togglerMessageBox).forEach(id => {
      scrollToBottom(Number(id));
    });
  },
  { deep: true }
);
</script>

<style scoped>
/* Add your styles here */
</style>