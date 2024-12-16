import { defineStore } from 'pinia';
import { useNotificationStore } from '../stores/notifications';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as any[],
    loading: false,
    page: 1,
    limit: 20,
    hasMore: true,
  }),
  
  actions: {
    async fetchPosts() {
        if (this.loading || !this.hasMore) return;
        
        this.loading = true;
        try {
            const baseUrl = await getBaseUrl(); 
            const response = await useCustomFetch(`${baseUrl}/posts?page=${this.page}&limit=${this.limit}`);
            const rawValue = response._rawValue;
           
            if (rawValue && rawValue.data && Array.isArray(rawValue.data)) {
                const data = rawValue.data;
      
                
      
                if (data.length < this.limit) {
                    this.hasMore = false;
                }
                this.posts.push(...data);
                this.page++;
            } else {
                console.error('Response data is missing:', response);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
          this.loading = false;
        }
    },

    async likePost(postId:number){
      const notificationStore = useNotificationStore(); 
      const baseUrl = getBaseUrl();
      const post = this.posts.find(p => p.id === postId);
      if(post){
        try{
          await useCustomFetch(`${baseUrl}/posts/${postId}/like`,{method:'POST'});
          if(post.isLiked){
            post.isLiked = false;
            post.likes_count--
          }else{
            post.isLiked = true;
            post.likes_count++;
          }
          
        }catch(error){
          notificationStore.addNotification('Failed to like/unlike the post','error');
        }
      }
    }
  },

  
});
