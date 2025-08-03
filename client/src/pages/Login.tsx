import { useState, useEffect } from "react";
import { useLogin } from "../components/hooks/useLogin";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showError, setShowError] = useState<string>("");
  const { login, isLoading, error } = useLogin();

  const validate = () => {
    if (!email || !password) {
      setShowError("All fields must be filled");
      return false;
    } else if (!email.includes("@") || !email.includes(".")) {
      setShowError("Enter a valid email address");
      return false;
    } else if (password.length < 6) {
      setShowError("Password must be at least 6 characters long");
      return false;
    }

    setShowError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) {
      setTimeout(() => {
        setShowError("");
      }, 2000);
      return;
    }

    await login({ email, password });
  };

  useEffect(() => {
    if (error) {
      setShowError(error);
      const timer = setTimeout(() => {
        setShowError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <form
      className="login-form max-w-md mx-4 sm:mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md flex flex-col gap-4 border border-gray-200"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center">
        <h3 className="text-3xl font-semibold text-center text-[#393a37]">
          Log in
        </h3>
      </div>

      <label className="text-sm text-gray-700">Email:</label>
      <input
        type="email"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a0b56d]"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      {showError.includes("email") && (
        <p className="text-red-500 text-sm">{showError}</p>
      )}

      <label className="text-sm text-gray-700">Password:</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#a0b56d]"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-2/4 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </span>
      </div>
      {showError.includes("Password") && (
        <p className="text-red-500 text-sm">{showError}</p>
      )}

      <button
        className="bg-[#a0b56d] hover:bg-[#8fa25e] text-white font-medium py-2 px-4 rounded disabled:opacity-60 transition"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log in"}
      </button>
        <p className=" text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#a0b56d] hover:underline">
            Sign up
          </Link>
        </p>      

      {showError &&
        !showError.includes("email") &&
        !showError.includes("Password") && (
          <p className="text-red-500 text-center">{showError}</p>
        )}
    </form>
  );
};

export default Login;
