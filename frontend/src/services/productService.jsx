import axios from "axios";
import Swal from "sweetalert2";

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
