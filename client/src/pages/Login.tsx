import { useState, useEffect } from "react"
import { useLogin } from "../components/hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { login, isLoading, error } = useLogin()
  const [showError, setShowError] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login({ email, password })
  }

  useEffect(() => {
    if (error) {
      setShowError(true)
      const timer = setTimeout(() => setShowError(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <>
      <form
        className="login-form max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md flex flex-col gap-4 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          <h3 className="text-3xl font-semibold">Login</h3>
        </div>

        <label className="text-sm text-gray-700">Email:</label>
        <input
          type="email"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a0b56d]"
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          value={email}
        />

        <label className="text-sm text-gray-700">Password:</label>
        <input
          type="password"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a0b56d]"
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          value={password}
        />

        <button
          className="bg-[#a0b56d] hover:bg-[#8fa25e] text-white font-medium py-2 px-4 rounded disabled:opacity-60 transition"
          disabled={isLoading}
        >
          Log in
        </button>
  {showError && (
          <div className="flex justify-center">
            <div className="error max-w-full">
              <div className="error__icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    fill="#393a37"
                    d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
                  ></path>
                </svg>
              </div>
              <div className="error__title">{error}</div>
            </div>
          </div>
        )}
      </form>
    </>
  )
}

export default Login
