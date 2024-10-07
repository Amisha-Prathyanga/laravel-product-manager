// // src/api.jsx
// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:8000/api",
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'X-Requested-With': 'XMLHttpRequest',
//     }
// });

// // Add request interceptor for token
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Add response interceptor for error handling
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const errorMessage = error.response?.data?.message || error.message;
//         console.error('API Error:', errorMessage);
//         return Promise.reject(error);
//     }
// );

// export const loginUser = async (data) => {
//     try {
//         // Get CSRF cookie
//         await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
//             withCredentials: true
//         });

//         // Perform login
//         const response = await api.post("/login", data);

//         // Validate response format
//         if (!response.data.success) {
//             throw new Error(response.data.message || 'Login failed');
//         }

//         return response;
//     } catch (error) {
//         console.error('Login Error:', error.response?.data || error.message);
//         throw error;
//     }
// };

// export const fetchProducts = () => api.get("/products");
// export const addProduct = async (data) => {
//     const response = await api.post("/products", data);
//     if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to add product');
//     }
//     return response.data.data;
// };

// export const editProduct = async (id, formData) => {
//     const config = {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         }
//     };
//     // Use POST method with _method=PUT for Laravel's form-data handling
//     formData.append('_method', 'PUT');
//     const response = await api.post(`/products/${id}`, formData, config);
//     if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to update product');
//     }
//     return response.data.data;
// };

// export const deleteProduct = async (id) => {
//     const response = await api.delete(`/products/${id}`);
//     if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to delete product');
//     }
//     return response.data.data;
// };

// src/api.jsx
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Add request interceptor for token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
    console.error("API Error:", errorMessage);
    return Promise.reject(error);
  }
);

export const loginUser = async (data) => {
  try {
    // Get CSRF cookie
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });

    // Perform login
    const response = await api.post("/login", data);

    // Validate response format
    if (!response.data.success) {
      throw new Error(response.data.message || "Login failed");
    }

    return response;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchProducts = () => api.get("/products");
// export const addProduct = async (data) => {
//     const response = await api.post("/products", data);
//     if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to add product');
//     }
//     return response.data.data;
// };

export const addProduct = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const response = await api.post("/products", formData, config);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to add product");
    }
    return response.data.data;
  } catch (error) {
    console.error("Add Product Error:", error.response?.data || error.message);
    throw error;
  }
};

// export const editProduct = async (id, data) => {
//     const response = await api.put(`/products/${id}`, data);
//     if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to update product');
//     }
//     return response.data.data;
// };

export const editProduct = async (id, formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  // Use POST method with _method=PUT for Laravel's form-data handling
  formData.append("_method", "PUT");
  const response = await api.post(`/products/${id}`, formData, config);
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to update product");
  }
  return response.data.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to delete product");
  }
  return response.data.data;
};
