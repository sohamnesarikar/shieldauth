import { useState } from "react";
import { PiCashRegisterThin } from "react-icons/pi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-50">
      <div className="max-w-110 w-full m-2 p-4">
        <PiCashRegisterThin className="text-5xl text-center mb-3 w-full" />
        <h1 className="text-[28px] text-center mb-6 font-bold">
          Create your account
        </h1>
        <form>
          <div className="w-full">
            <label
              htmlFor="username"
              className="text-sm text-black font-medium mb-1.5 block"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
            />
          </div>

          <div className="w-full mt-4">
            <label
              htmlFor="email"
              className="text-sm text-black font-medium mb-1.5 block"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
            />
          </div>

          <div className="w-full mt-4">
            <label
              htmlFor="password"
              className="text-sm text-black font-medium mb-1.5 block"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
              />
              {showPassword ? (
                <FaRegEyeSlash
                  className="absolute top-3 right-2.5 text-md cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaRegEye
                  className="absolute top-3 right-2.5 text-md cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>

          <div className="w-full mt-5">
            <button
              type="submit"
              className="w-full text-center py-2.5 bg-blue-600 cursor-pointer text-white font-bold rounded-lg text-base transition-colors duration-150 ease-in hover:bg-blue-700 active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account? <span>Log in</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
