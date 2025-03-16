import { defineStore } from "pinia";

type MessageBox = {
    id: number;
    name: string;
    profile_picture: string;
};

export const useMessagesStore = defineStore('messages', {
    
    state: () => ({
        showOldMessage:false,
        oldMessageList:[] as any,
        messages: [] as Array<{ receiverId: number; messages: Array<any> }>,
        togglerMessageBox: {} as Record<number, MessageBox>,
    }),

    actions: { 
        async getMessage(receiverId: number) {
            try {
                const response = await useCustomFetch('/messages/' + receiverId);
                const data = response.value;
                if (data.messages) {
                    let existingMessage = this.messages.find(m => m.receiverId === receiverId);

                    if (!existingMessage) {
                        this.messages.push({ receiverId, messages: [...data.messages] });
                    } else {
                        existingMessage.messages.push(...data.messages);
                    }
                 
                    this.togglerMessageBox[receiverId] = data.receiver;
                }
            } catch (error) {
                console.log(error);
            }  
        },

        pushMessage(receiverId: number, data: any) {
            const existingIndex = this.messages.findIndex(m => m.receiverId === receiverId);

            if (existingIndex !== -1) {
                this.messages[existingIndex].messages.push(data);
            } else {
                this.messages.push({ receiverId: receiverId, messages: [data] });
            }
        },

        async sendMessage(receiverId: number, data: any) {
            try {
                const response = await useCustomFetch('/messages/' + receiverId, {
                    method: 'POST',
                    body: data,
                });

                if (response.value && response.value.message) {
                    this.pushMessage(receiverId, response.value.message)
                }
            } catch (error) {
                console.log(error);
            }
        },

        hideShowMessageBox(receiverId: number) {
            delete this.togglerMessageBox[receiverId];
        },

        async getOldMessage(){
            try {
                const response = await useCustomFetch('/messages/old/list');
                const data = response.value;
                if (data.messages) {
                    this.oldMessageList = data.messages;
                }
            } catch (error) {
                console.log(error);
            }  
        },

        toggleMessageList(){
            this.showOldMessage = !this.showOldMessage;
        },
    }
});
