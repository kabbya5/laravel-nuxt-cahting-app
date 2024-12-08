import { defineStore } from 'pinia';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as any[],
    loading: false,
    page: 1,
    limit: 30,
    hasMore: true,
  }),
  
  actions: {
    async fetchPosts() {
        if (this.loading || !this.hasMore) return;
        
        this.loading = true;
        try {
            const baseUrl = await getBaseUrl(); 
            const response = await useCustomFetch(`${baseUrl}/posts?page=${this.page}&limit=${this.limit}`);
            console.log('response',response);
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
  },

  
});
