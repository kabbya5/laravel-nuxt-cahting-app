
import Echo from 'laravel-echo';
import Pusher, { type ChannelAuthorizationCallback } from 'pusher-js';
import { useAuthStore } from '~/stores/authStore';

declare global{
  interface Window{
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

export default defineNuxtPlugin( () => {
  const authStore = useAuthStore();
  const token = authStore.getToken();
  const csrfToken =  localStorage.getItem('csrf_token') ?? null;
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;
  window.Pusher = Pusher;
  let headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (csrfToken) {
    headers['X-XSRF-TOKEN'] = csrfToken;
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const echo = new Echo({

    broadcaster: 'reverb',
    key: config.public.REVERB_APP_KEY,
    wsHost: config.public.REVERB_HOST,
    wsPort: config.public.REVERB_PORT ?? 80,
    wssPort: config.public.REVERB_PORT ?? 443,
    forceTLS: (config.public.REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    
  
    authorizer: (channel: any, options: any) => {
      return {
        authorize: async (socketId: string, callback:ChannelAuthorizationCallback) => {
          console.log('Channel Name:', channel.name);
          try {
            const response = await $fetch(`${baseURL}/api/broadcasting/auth`, {
              method: 'POST',
              body: {
                socket_id:  socketId,
                channel_name: channel.name
              },
              headers,
              credentials: 'include'
            });
            console.log('Channel Name:', channel.name);
            console.log('Authorization successful:', response);
            callback(null, response); 
          } catch (error) {
            console.error('Authorization error:', error);
            callback(error, null); 
          }
        }
        
      };
    }
  });

  window.Echo = echo;
  return{
    provide:{
      echo
    }
  }
})
