import axios from "axios";
import Swal from "sweetalert2";
import axiosWithToken from "../api/axiosWithToken";

export const fetchProducts = async (
  page,
  setProducts,
  setFilteredProducts,
  setTotalPages
) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/products?per_page=8&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setProducts(response.data.data);
    setFilteredProducts(response.data.data);
    setTotalPages(response.data.meta.last_page);
  } catch (error) {
    console.error(
      "Failed to fetch products:",
      error.response?.data?.message || error.message
    );
  }
};

export const deleteProduct = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      Swal.fire("Deleted!", "Product has been deleted.", "success");
    } catch (error) {
      Swal.fire(
        "Error!",
        "Failed to delete product: " +
          (error.response?.data?.message || error.message),
        "error"
      );
    }
  }
};

export const addProduct = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const response = await axiosWithToken.post(
      "api/products",
      formData,
      config
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to add product");
    }
    return response.data.data;
  } catch (error) {
    console.error("Add Product Error:", error.response?.data || error.message);
    throw error;
  }
};
