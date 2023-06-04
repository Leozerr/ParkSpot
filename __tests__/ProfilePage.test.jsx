import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfileScreen from "../App/Screens/LoggedIn/ProfilePage";

describe("ProfileScreen", () => {
  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<ProfileScreen />);
    
    // Assert that the header text is rendered
    expect(getByText("My Profile")).toBeDefined();

    // Assert that the input fields are rendered
    expect(getByPlaceholderText("Loading..")).toBeDefined();
    expect(getByPlaceholderText("Password")).toBeDefined();
    expect(getByPlaceholderText("Confirm Password")).toBeDefined();

    // Assert that the update button is rendered
    expect(getByText("Update")).toBeDefined();
  });

  test("updates username and password when update button is pressed", () => {
    const { getByPlaceholderText, getByText } = render(<ProfileScreen />);
    
    // Type username and password in the input fields
    fireEvent.changeText(getByPlaceholderText("Loading.."), "NewUsername");
    fireEvent.changeText(getByPlaceholderText("Password"), "NewPassword");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "NewPassword");

    // Press the update button
    fireEvent.press(getByText("Update"));

    // Assert that the values are updated
    expect(getByPlaceholderText("Loading..").props.value).toBe("NewUsername");
    expect(getByPlaceholderText("Password").props.value).toBe("NewPassword");
    expect(getByPlaceholderText("Confirm Password").props.value).toBe("NewPassword");
  });
});
