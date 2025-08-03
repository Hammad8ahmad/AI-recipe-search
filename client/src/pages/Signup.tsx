import { useState, useEffect } from "react";
import { useSignup } from "../components/hooks/useSignup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { signup, isLoading, error } = useSignup();

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

    await signup({ email, password });
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
      className="signup-form max-w-md mx-4 sm:mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md flex flex-col gap-4 border border-gray-200"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center">
        <h3 className="text-3xl font-semibold text-center text-[#393a37]">
          Sign up
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
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2.5 text-gray-500"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>

      {showError.includes("Password") && (
        <p className="text-red-500 text-sm">{showError}</p>
      )}

      <button
        className="bg-[#a0b56d] hover:bg-[#8fa25e] text-white font-medium py-2 px-4 rounded disabled:opacity-60 transition"
        disabled={isLoading}
      >
        {isLoading ? "Signing up..." : "Sign up"}
      </button>

      {showError &&
        !showError.includes("email") &&
        !showError.includes("Password") && (
          <p className="text-red-500 text-center">{showError}</p>
        )}
    </form>
  );
};

export default Signup;
