import axios from "axios";
import Swal from "sweetalert2";

export const logout = async () => {
  try {
    await axios.post(
      "http://localhost:8000/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    sessionStorage.removeItem("token");

    // Show SweetAlert on successful logout
    Swal.fire({
      icon: "success",
      title: "Logged out",
      text: "You have been logged out successfully!",
      confirmButtonText: "Okay",
    }).then(() => {
      // Redirect to the login page after the alert is closed
      navigate("/login"); // Adjust the path based on your routing
    });
  } catch (error) {
    console.error(
      "Logout failed:",
      error.response?.data?.message || error.message
    );

    // Show SweetAlert on logout failure
    Swal.fire({
      icon: "error",
      title: "Logout Failed",
      text:
        error.response?.data?.message ||
        "An error occurred during logout. Please try again.",
      confirmButtonText: "Okay",
    });
  }
};
