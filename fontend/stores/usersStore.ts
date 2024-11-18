import {defineStore} from 'pinia';
import { useNotificationStore } from '~/stores/notifications';

export const useUsersStore = defineStore('users', {
    state:() =>({
        users:[] as Array<{id:number,'name':string}>,
    }),

    actions:{
        async fetchIUsers(){
            const apiUrl = getBaseUrl();
            const notificationStore = useNotificationStore();
            try{
                const response = await fetch(`${apiUrl}/users`);

                if(!response.ok){
                    notificationStore.addNotification(
                        "The user can't fetch",
                        'Error',
                    );
                }

                this.users = await response.json();
            }catch(error){
                console.error;
                // notificationStore.addNotification(
                //     //
                // )
            }
        }
    }
});