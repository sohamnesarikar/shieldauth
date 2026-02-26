import { PiCashRegisterThin } from "react-icons/pi";
import { Button, Input, Label } from "../components/ui";

const Signup = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-50">
      <div className="max-w-110 w-full m-2 p-4">
        <PiCashRegisterThin className="text-5xl text-center mb-3 w-full" />
        <h1 className="text-[28px] text-center mb-6 font-bold">
          Create your account
        </h1>
        <form>
          <div className="w-full">
            <Label
              htmlFor="username"
              className="text-sm text-black font-medium mb-1.5 block"
              value="Username"
            />

            <Input
              placeholder="Username"
              id="username"
              className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
            />
          </div>

          <div className="w-full mt-4">
            <Label
              htmlFor="email"
              className="text-sm text-black font-medium mb-1.5 block"
              value="Email"
            />

            <Input
              type="email"
              placeholder="Email"
              id="email"
              className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
            />
          </div>

          <div className="w-full mt-4">
            <Label
              htmlFor="password"
              className="text-sm text-black font-medium mb-1.5 block"
              value="Password"
            />

            <Input
              type="password"
              placeholder="Password"
              id="password"
              className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
            />
          </div>

          <div className="w-full mt-5">
            <Button
              type="submit"
              className="w-full text-center py-2.5 bg-blue-600 cursor-pointer text-white font-bold rounded-lg text-base transition-colors duration-150 ease-in hover:bg-blue-700 active:scale-[0.98]"
              title="Create Account"
            />
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
