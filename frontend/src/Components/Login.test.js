import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Login from "./Login";

jest.mock("axios");
jest.mock("sweetalert2");

const mockNavigate = jest.fn();
const mockSetIsAuthenticated = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );
  });

  test("renders login form", () => {
    expect(screen.getByPlaceholderText("Email ID")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("allows entering email and password", () => {
    const emailInput = screen.getByPlaceholderText("Email ID");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("handles successful login", async () => {
    const mockToken = "fake-token";
    axios.post.mockResolvedValueOnce({
      data: { data: { token: mockToken } },
    });

    const emailInput = screen.getByPlaceholderText("Email ID");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8000/api/login",
        {
          email: "test@example.com",
          password: "password123",
        }
      );
      expect(localStorage.getItem("token")).toBe(mockToken);
      expect(localStorage.getItem("tokenExpiration")).toBeTruthy();
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "success",
          title: "Login Successful",
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith("/products");
    });
  });

  test("handles login failure", async () => {
    const errorMessage = "Invalid credentials";
    axios.post.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    const emailInput = screen.getByPlaceholderText("Email ID");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8000/api/login",
        {
          email: "test@example.com",
          password: "wrongpassword",
        }
      );
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "error",
          title: "Invalid Email or Password",
          text: errorMessage,
        })
      );
      expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test("navigates to register page when clicking register link", () => {
    const registerLink = screen.getByText("Register? Click to sign up");
    fireEvent.click(registerLink);
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
