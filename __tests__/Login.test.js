import React from "react";
//import "react-native-mock-render/mock";
// import "react-native-mock-render";
import { render, fireEvent, waitFor } from "jest";
import axios from "axios";
import LoginScreen from "../App/Screens/LoggedOut/Login";

// Mock axios
jest.mock("axios");
// jest.mock("react-native", () => require("react-native-mock-render"), { virtual: true });
// jest.mock("react-native-svg", () => require("react-native-svg-mock"), { virtual: true });


describe("LoginScreen", () => {
  test("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    // Check if important elements are rendered
    expect(getByText("Sign In to KMITL Parking")).toBeDefined();
    expect(getByPlaceholderText("Email")).toBeDefined();
    expect(getByPlaceholderText("Password")).toBeDefined();
    expect(getByText("Sign In")).toBeDefined();
    expect(getByText("Not have account?")).toBeDefined();
  });

  test("logs in successfully", async () => {
    const onLoginMock = jest.fn();
    axios.post.mockResolvedValue({
      data: {
        message: "Login Successful"
      }
    });

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen onLogin={onLoginMock} />
    );

    // Enter email and password
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");

    // Simulate button press
    fireEvent.press(getByText("Sign In"));

    // Wait for the login process to complete
    await waitFor(() => {
      expect(onLoginMock).toHaveBeenCalledTimes(1);
      expect(onLoginMock).toHaveBeenCalledWith("test@example.com");
    });
  });

  test("displays error message on login failure", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: "Login Failed"
        }
      }
    });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    // Enter email and password
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");

    // Simulate button press
    fireEvent.press(getByText("Sign In"));

    // Wait for the login process to complete
    await waitFor(() => {
      expect(getByText("Sign In Failed")).toBeDefined();
      expect(getByText("Login Failed")).toBeDefined();
    });
  });
});
