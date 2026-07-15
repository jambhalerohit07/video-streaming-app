import React, { useState } from "react";
import { Button, Input, Card, Form, addToast, Divider } from "@heroui/react";
import Loader from "../../components/Loader.jsx";
import useAuthStore from "../../store/authStore/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed, Globe } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const apiLoading = useAuthStore((state) => state.apiLoading);
  const login = useAuthStore((state) => state.login);
  const googleAuth = useAuthStore((state) => state.googleAuth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handleLogin = async () => {
    debugger;
    const uError = validateUsername(username);
    const pError = validatePassword(password);
    setUsernameError(uError);
    setPasswordError(pError);
    if (uError || pError) {
      return;
    }
    try {
      const response = await login({
        username: username,
        password: password,
      });
      if (response?.data?.statusCode === 200) {
        addToast({
          title: response?.data?.message,
          color: "success",
        });
        navigate("/");
      }
    } catch (error) {}
  };

  const handelGoogleLogin = async (tokenResponse) => {
    try {
      await googleAuth(tokenResponse);
    } catch (error) {
      addToast({
        title: error || "Login Failed",
        color: "danger",
      });
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: (tokenResponse) => {
      handelGoogleLogin(tokenResponse);
    },
    onError: () => {
      addToast({
        title: "Login Failed",
        color: "danger",
      });
    },
  });

  if (apiLoading) {
    return <Loader />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center md:justify-end sm:justify-center bg-cover bg-center bg-no-repeat p-6 relative"
      // style={{ backgroundImage: `url('../../../../public/youtube_image.jpg')` }}
    >
      <Card className="w-full max-w-md p-6 bg-white/90 shadow-lg rounded-lg relative z-10">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

        <div className="mb-4 w-full">
          <Input
            label="Username"
            placeholder="Enter your username"
            variant="bordered"
            fullWidth
            labelPlacement="outside"
            value={username}
            onChange={(e) => {
              const val = e.target.value;
              setUsername(val);
              setUsernameError(validateUsername(val));
            }}
            isInvalid={!!usernameError}
            errorMessage={usernameError}
            classNames={{ inputWrapper: "rounded-md" }}
            isRequired
          />
        </div>

        <div className="mb-2 w-full">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            variant="bordered"
            fullWidth
            labelPlacement="outside"
            value={password}
            onChange={(e) => {
              const val = e.target.value;
              setPassword(val);
              setPasswordError(validatePassword(val));
            }}
            isInvalid={!!passwordError}
            errorMessage={passwordError}
            classNames={{ inputWrapper: "rounded-md" }}
            isRequired
            endContent={
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </Button>
            }
          />
        </div>

        <div className="flex w-full justify-end mb-3">
          <p className="text-sm text-blue-600 underline hover:text-blue-800 cursor-pointer">
            <Link to="/forgot-password">Forgot your password?</Link>
          </p>
        </div>

        <Button
          color="danger"
          size="lg"
          fullWidth
          className="mt-2"
          onPress={handleLogin}
        >
          Login
        </Button>

        <div className="my-5">
          <Divider />
          <p className="text-center text-sm text-gray-500 -mt-3 bg-white w-fit mx-auto px-3">
            OR
          </p>
        </div>

        <Button
          variant="bordered"
          size="lg"
          fullWidth
          startContent={<FcGoogle size={22} />}
          onPress={() => googleLogin()}
        >
          Continue with Google
        </Button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span className="text-blue-600 underline hover:text-blue-800 cursor-pointer">
            <Link to="/register">Sign up</Link>
          </span>
        </p>
      </Card>
    </div>
  );
}
