import { useFetch, useRequestHeaders, useRuntimeConfig } from '#app';

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

export const useCustomFetch = async (url: string, opts: FetchOptions = {}): Promise<any> => {
  const config = useRuntimeConfig();
  const csrfToken = localStorage.getItem('csrf_token');

  // Set default headers
  let headers: Record<string, string> = {
    Accept: 'application/json',
    ...opts.headers,
  };

  // Add CSRF token if available
  if (csrfToken) {
    headers['X-XSRF-TOKEN'] = csrfToken;
  }

  // Include cookies on the server-side
  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(['cookie']),
      Referer: config.public.baseURL,
    };
  }

  try {
    const { data, error } = await useFetch(url, {
      baseURL: config.public.apiBaseUrl,
      headers,
      credentials: 'include',
      ...opts,
    });

    if (error.value) {
      throw new Error(`Fetch error: ${error.value.message}`);
    }

    return data; // Return the response data
  } catch (err) {
    console.error('Error in useCustomFetch:', err);
    throw err; // Rethrow the error for further handling
  }
};