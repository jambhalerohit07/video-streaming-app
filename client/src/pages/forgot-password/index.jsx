import { addToast, Button, Card, Form, Input } from "@heroui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore/useAuthStore";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateUsername = (value) => {
    if (!value) return "Username is required";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(value)
      ? ""
      : "Username must be at least 3 chars and alphanumeric";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";

    const regex = /^(?=.*\d).{6,}$/;

    return regex.test(value)
      ? ""
      : "Password must be 6+ chars and include a number";
  };
  const validateConfirmPassword = (value) => {
    if (!value) return "Password is required";

    const regex = /^(?=.*\d).{6,}$/;

    return value !== formData.password
      ? "Password does not match"
      : regex.test(value)
      ? ""
      : "Password must be 6+ chars and include a number";
  };

  const handelForgotPassword = async () => {
    const uError = validateUsername(formData.username);
    const pError = validatePassword(formData.password);
    const newError = validateConfirmPassword(formData.confirmPassword);
    setUsernameError(uError);
    setPasswordError(pError);
    setConfirmPasswordError(newError);
    if (uError || pError || newError) {
      return;
    }

    try {
      const { username, password } = formData;
      const response = await forgotPassword({
        username,
        newPassword: password,
      });
      debugger;
      if (response?.data?.statusCode === 200) {
        addToast({
          title: response?.data?.message,
          color: "success",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log("Error while forgot password", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>

        {/* <Form onSubmit={handelForgotPassword}> */}
        <div className="mb-4 w-full">
          <Input
            label="Username"
            placeholder="Enter your username"
            variant="bordered"
            fullWidth
            labelPlacement="outside"
            value={formData.username}
            onChange={(e) => {
              const val = e.target.value;
              // setUsername(val);
              setFormData({ ...formData, username: val });
              setUsernameError(validateUsername(val));
            }}
            isInvalid={!!usernameError}
            errorMessage={usernameError}
            classNames={{
              inputWrapper: "rounded-md",
            }}
            isRequired
          />
        </div>

        <div className="mb-2 w-full">
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            variant="bordered"
            labelPlacement="outside"
            fullWidth
            value={formData.password}
            onChange={(e) => {
              const val = e.target.value;
              // setPassword(val);
              setFormData({ ...formData, password: val });
              setPasswordError(validatePassword(val));
            }}
            isInvalid={!!passwordError}
            errorMessage={passwordError}
            classNames={{
              inputWrapper: "rounded-md",
            }}
            isRequired
          />
        </div>
        <div className="mb-2 w-full">
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Enter confirm new password"
            variant="bordered"
            labelPlacement="outside"
            fullWidth
            value={formData.confirmPassword}
            onChange={(e) => {
              const val = e.target.value;
              // setPassword(val);
              setFormData({ ...formData, confirmPassword: val });
              setConfirmPasswordError(validateConfirmPassword(val));
            }}
            isInvalid={!!confirmPasswordError}
            errorMessage={confirmPasswordError}
            classNames={{
              inputWrapper: "rounded-md",
            }}
            isRequired
          />
        </div>
        <div className="flex justify-end gap-3 w-full">
          <Button color="primary" size="md" onPress={handelForgotPassword}>
            Submit
          </Button>

          <Button
            color="danger"
            variant="flat"
            size="md"
            onPress={() => navigate("/login")}
          >
            Cancel
          </Button>
        </div>
        {/* </Form> */}
      </Card>
    </div>
  );
};

export default ForgotPassword;
