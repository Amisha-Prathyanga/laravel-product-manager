// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api", // Adjust the URL based on your backend API
// });

// export const registerUser = (data) => api.post("/register", data);
// export const loginUser = (data) => api.post("/login", data);
// export const fetchProducts = () => api.get("/products");
// export const addProduct = (data, token) =>
//   api.post("/products", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// export const editProduct = (id, data, token) =>
//   api.put(`/products/${id}`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// export const deleteProduct = (id, token) =>
//   api.delete(`/products/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });


// src/api.jsx
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

// Add request interceptor for token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error.response?.data?.message || error.message;
        console.error('API Error:', errorMessage);
        return Promise.reject(error);
    }
);

export const loginUser = async (data) => {
    try {
        // Get CSRF cookie
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
            withCredentials: true
        });
        
        // Perform login
        const response = await api.post("/login", data);
        
        // Validate response format
        if (!response.data.success) {
            throw new Error(response.data.message || 'Login failed');
        }
        
        return response;
    } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchProducts = () => api.get("/products");
export const addProduct = async (data) => {
    const response = await api.post("/products", data);
    if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to add product');
    }
    return response.data.data;
};

export const editProduct = async (id, data) => {
    const response = await api.put(`/products/${id}`, data);
    if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update product');
    }
    return response.data.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete product');
    }
    return response.data.data;
};