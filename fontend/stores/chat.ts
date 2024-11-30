import {defineStore} from 'pinia';

interface Message{
    id:number,
    sender:{name:string; id:number},
    receiver:{name:string, id:number},
    messages:string,
}

interface SendMessageRequest {
    receiver_id: number;
    message: string;
}

export const useChatStore = defineStore('chat', {
    state:() =>({
        selectedFriendId:null as number | null,
        messages:[] as Message[],
        isLoading:false,
    }),

    actions:{
        async fetchMessages(friendId:number){
            this.isLoading = true;
            try{
                const response = useCustomFetch<{messages:Message[]}>(`/chats/${friendId}`);
                this.messages = response.rawValue.messages;
            }catch(error){
                console.log(error);
                alert('Fail To Fetch Message');
            }finally{
                this.isLoading = false;
            }
        },

        async sendMessage(receiverId:number, message:string){
            const requestBody: SendMessageRequest = {
                receiver_id: receiverId,
                message: message,
            }
            
            const respone = await useCustomFetch(`/chats`,{
                method: 'POST',
                body: requestBody,   
            })

            if(respone.error) {
                console.error('Failed to send message:', respone.error)
            } else {
                console.log('Message sent:', respone.data)
            }
        }
    }
})