
import Echo from 'laravel-echo';
import Pusher, { type ChannelAuthorizationCallback } from 'pusher-js';

declare global{
  interface Window{
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

export default defineNuxtPlugin( () => {
  const config = useRuntimeConfig();
  window.Pusher = Pusher;

  const echo = new Echo({

    broadcaster: 'reverb',
    key: config.public.REVERB_APP_KEY,
    wsHost: config.public.REVERB_HOST,
    wsPort: config.public.REVERB_PORT ?? 80,
    wssPort: config.public.REVERB_PORT ?? 443,
    forceTLS: (config.public.REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],

    authorizer: (channel :any , options :any) => {
        return {
            authorize: (socketId :string, callback : ChannelAuthorizationCallback) => {
                useCustomFetch('/api/broadcusting/auth',{
                    method:"POST",
                    body: JSON.stringify({
                      socket_id: socketId,
                      channel_name: channel.name,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                })
                .then((response) =>{
                  callback(null, response);
                })
                .catch((error:Error) => {
                  callback(error, null)
                })
            }
        };
    },
  });

  window.Echo = echo;
  return{
    provide:{
      echo
    }
  }
})
