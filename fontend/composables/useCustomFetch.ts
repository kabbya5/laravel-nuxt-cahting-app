import { useFetch, useRequestHeaders, useRuntimeConfig } from '#app';
import { useAuthStore } from '~/stores/authStore';

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
  method?: string;
};

export const useCustomFetch = async <T>(url: string, opts: FetchOptions = {}): Promise<T> => {
  const config = useRuntimeConfig();
  const csrfToken = localStorage.getItem('csrf_token');
  const authStore = useAuthStore();
  const authToken = authStore.getToken();

  let headers: Record<string, string> = {
    Accept: 'application/json',
    ...opts.headers,
  };

  if (csrfToken) {
    headers['X-XSRF-TOKEN'] = csrfToken;
  }

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  if (typeof window === 'undefined') {
    headers = {
      ...headers,
      ...useRequestHeaders(['cookie']),
      Referer: config.public.baseURL,
    };
  }

  try {
    // Use the Nuxt useFetch API
    const { data, error } = await useFetch<T>(url, {
      baseURL: `${config.public.baseURL}/api`,
      credentials: 'include',
      headers,
      method: opts.method || 'GET',
      ...opts,
    });

    if (error.value) {
      const message = error.value.message || 'Unknown error';
      throw new Error(`Fetch error: ${message}`);
    }

    return data;
  } catch (err) {
    console.error('Error in customFetch:', err);
    throw new Error(`Error in customFetch: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
};
