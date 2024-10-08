import Swal from "sweetalert2";
import axiosWithToken from "./../api/axiosWithToken";

export const login = async (email, password) => {
  try {
    const response = await axiosWithToken.post("api/login", {
      email,
      password,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const logout = async (navigate) => {
  try {
    await axiosWithToken.post("api/logout", {});
    localStorage.removeItem("token");

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
