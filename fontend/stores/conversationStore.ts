import {defineStore} from 'pinia';
import { useNotificationStore } from '~/stores/notifications';

export const useConversationStore = defineStore('conversations', {
    state:() => ({
        conversations:[] as Array<{id:number,user1:number,user2:number}>,
        messages: {} as Record<number, Array<{ conversationId: number }>>,
    }),

    actions:{
        async fetchConversions(){
            const apiUrl = getBaseUrl();
            const notificationStore = useNotificationStore();
            try{
              const respone = await useCustomFetch(`/conversations`);

              if(respone && respone.rawValue){
                    this.conversations = respone.rawValue.conversations;
              }
            }catch(error){
                console.log('error');
            }
        },

        async fetchMessage(conversationId:number){
            try{
                const response = await useCustomFetch(`message/${conversationId}`);
                this.messages[conversationId] = response.rawValue.messages;
            }catch(error){
                console.log(error);
            }
        },

        addMessage(conversationId:number,message:any){
            if(!this.messages[conversationId]){
                this.messages[conversationId] = [];
            }

            this.messages[conversationId].push(message);
        },

        async createConversation(data:any){
            try{
                const response = await useCustomFetch(`/message`, {
                    method:'POST',
                    body:data,
                });
            }catch(error){
                console.log(error);
            }
        },
    }
});