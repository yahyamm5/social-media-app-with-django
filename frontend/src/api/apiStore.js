import axios from 'axios';
import { create } from 'zustand'
import createAuthRefreshInterceptor from 'axios-auth-refresh';


const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});


export const userApiStore = create((set) => ({
    users: [],
    user: null,
    posts: [],
    accessToken: null,
    loading: false,
    error: null,
    setAccessToken: (token) => set({ accessToken: token }),

    fetchUsers: async () => {
        set({ loading: true });
        try {
            const response = await api.get('users/');
            set({ users: response.data, loading: false });
        } catch (error) {
            set({ error: `Failed to land users ${error}`, loading: false });
        }
    },
    
    signup: async (username, email, password) => {
        set({ loading: true, error: null});
        try {
            const response = await api.post('users/', {username,email,password});
            set({ loading: false });
            return { success: true, data: response.data };
        } catch (error) {
            set({ error: error, loading: false });
            return { success: false, error: error };
        }
    },

    login: async (username, password) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('token/', { username, password });
            const { access } = response.data;

            set({accessToken: access, loading: false});
            return { success: true };
        } catch (error) {
            set({error: "Invalid username or password", loading: false });
            return { success: false, error: error };
        }
    },

    refreshAccessToken: async () => {
        try {
            const response = await api.post('token/refresh/');
            const { access } = response.data;
            set({ accessToken: access });
            return access;
        } catch (error) {
            set({ accessToken: null , error:error})
        }
    },

    logout: async () => {
        try {
            await api.post('logout/');
        } catch (error) {
            console.error("Logout failed on server", error);
        } finally {
            set({ user: null, accessToken: null, users: [], posts: [], error: null});
        }
    },

    fetchFeed: async () => {
        set({ loading: true, error: null })
        try {
            const response = await api.get('feed/');
            set({ posts: response.data.posts, loading: false });
        } catch (error) {
            set({ error: `Failed to load feed ${error}`, loading: false  })
        }
    },

}));

api.interceptors.request.use((config) => {
    const token = userApiStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const refreshAuthLogic = (failedRequest) => 
    api.post('token/refresh/').then((tokenRefreshResponse) => {
        const { access } = tokenRefreshResponse.data;
        userApiStore.getState().setAccessToken(access);
        failedRequest.response.config.headers.Authorization = `Bearer ${access}`;
        return Promise.resolve();
    }).catch((error) => {
        userApiStore.getState().logout();
        return Promise.reject(error);
    });

createAuthRefreshInterceptor(api, refreshAuthLogic);