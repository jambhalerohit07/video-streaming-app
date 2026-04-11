import {
  addToast,
  Button,
  Card,
  Form,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore/useAuthStore";

const Signup = () => {
  const signUp = useAuthStore((state) => state.signUp);
  const navigate = useNavigate();
  const [formData, setFromData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    file: null,
  });

  const [error, setError] = useState({});

  console.log("Error kyy formData", formData);

  const validateFields = (name, value) => {
    debugger;
    switch (name) {
      case "firstName":
        if (!value) setError({ ...error, firstName: "First name is required" });
        else setError({ ...error, firstName: "" });
        break;
      case "lastName":
        if (!value) setError({ ...error, lastName: "Last name is required" });
        else setError({ ...error, lastName: "" });
        break;
      case "email":
        if (!value) setError({ ...error, email: "Email is required" });
        else setError({ ...error, email: "" });
        break;
      case "password":
        if (!value) setError({ ...error, password: "Password is required" });
        else setError({ ...error, password: "" });
        break;
      case "role":
        if (!value) setError({ ...error, role: "Role is required" });
        else setError({ ...error, role: "" });
        break;
      case "file":
        if (!value) setError({ ...error, file: "File is required" });

        const file = value;
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!allowedTypes.includes(file.type)) {
          setError({ ...error, file: "Only JPG, PNG or PDF allowed" });
        } else if (file.size > 2 * 1024 * 1024) {
          setError({ ...error, file: "File must be less than 2MB" });
        } else {
          setError({ ...error, file: "" });
        }
      default:
        break;
    }
    console.log("value ????", value);
    setFromData({ ...formData, [name]: value });
  };

  const validateAllFields = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (!formData.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }
    if (!formData.file) {
      newErrors.file = "File is required";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handelSignupSubmit = async () => {
    if (!validateAllFields()) {
      return;
    }

    try {
      const response = await signUp(formData);
      debugger;
      if (response?.data?.statusCode === 200) {
        addToast({
          title: response?.data?.message,
          color: "success",
        });
        navigate("/login");
      }
    } catch (error) {}

    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-3xl p-6 bg-white shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <div className="grid grid-cols-2 gap-3 mb-4 w-full">
          <Input
            label="First Name"
            placeholder="Enter first name"
            variant="bordered"
            fullWidth
            labelPlacement="outside"
            value={formData.firstName}
            onChange={(e) => {
              const val = e.target.value;
              validateFields("firstName", val);
            }}
            isInvalid={!!error.firstName}
            errorMessage={error.firstName}
            classNames={{
              inputWrapper: "rounded-md",
            }}
            isRequired
          />

          <div className="mb-2 w-full">
            <Input
              label="Last Name"
              placeholder="Enter last name"
              variant="bordered"
              labelPlacement="outside"
              fullWidth
              value={formData.lastName}
              onChange={(e) => {
                const val = e.target.value;
                validateFields("lastName", val);
              }}
              isInvalid={!!error.lastName}
              errorMessage={error.lastName}
              classNames={{
                inputWrapper: "rounded-md",
              }}
              isRequired
            />
          </div>

          <div className="mb-2 w-full">
            <Input
              label="Email"
              placeholder="Enter email"
              variant="bordered"
              labelPlacement="outside"
              fullWidth
              value={formData.email}
              onChange={(e) => {
                const val = e.target.value;
                validateFields("email", val);
              }}
              isInvalid={!!error.email}
              errorMessage={error.email}
              classNames={{
                inputWrapper: "rounded-md",
              }}
              isRequired
            />
          </div>
          <div className="mb-2 w-full">
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              variant="bordered"
              labelPlacement="outside"
              fullWidth
              value={formData?.password}
              onChange={(e) => {
                const val = e.target.value;
                validateFields("password", val);
              }}
              isInvalid={!!error.password}
              errorMessage={error.password}
              classNames={{
                inputWrapper: "rounded-md",
              }}
              isRequired
            />
          </div>
          <div className="mb-2 w-full">
            <Select
              label="Role"
              placeholder="Select role"
              variant="bordered"
              labelPlacement="outside"
              fullWidth
              selectedKeys={[formData?.role]}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0];
                validateFields("role", value);
              }}
              isInvalid={!!error.role}
              errorMessage={error.role}
              classNames={{
                inputWrapper: "rounded-md",
              }}
              isRequired
            >
              <SelectItem key={"admin"}>{"Admin"}</SelectItem>
              <SelectItem key={"user"}>{"User"}</SelectItem>
            </Select>
          </div>
          <div className="mb-2 w-full">
            <Input
              label="Profile Picture"
              type="file"
              variant="bordered"
              labelPlacement="outside"
              fullWidth
              // value={formData?.file}
              onChange={(e) => {
                const file = e.target.files[0];
                validateFields("file", file);
              }}
              isInvalid={!!error.file}
              errorMessage={error.file}
              classNames={{
                inputWrapper: "rounded-md",
              }}
              isRequired
            />
          </div>
        </div>

        <div className="w-full flex justify-center mt-4">
          <Button onPress={handelSignupSubmit} color="primary" size="md">
            Submit
          </Button>
        </div>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span className="text-blue-600 underline cursor-pointer">
            <Link to="/login">Sign In</Link>
          </span>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
