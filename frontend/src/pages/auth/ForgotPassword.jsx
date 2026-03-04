import { useState } from "react";
import { MdLockReset } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import { Button, Input, Label } from "../../components/ui";

const ForgotPassword = () => {
  const [step, setStep] = useState(3);

  return (
    <>
      <div className="max-w-110 w-full m-2 p-10 border border-gray-300 shadow-xl bg-white shadow-gray-300/50 rounded-xl">
        <div className="flex items-center gap-1">
          <IoMdArrowBack className="text-sm text-blue-600 font-semibold" />
          <p className="text-sm text-blue-600 font-semibold">Back to Login</p>
        </div>
        <MdLockReset className="text-5xl text-center w-full mt-4" />
        <h1 className="text-[28px] text-center mt-2 font-bold">
          Forgot Password?
        </h1>

        {step === 1 && (
          <form>
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

            <div className="w-full mt-5">
              <Button
                type="submit"
                className="w-full text-center shadow-lg shadow-blue-600/50 py-2.5 bg-blue-600 cursor-pointer text-white font-bold rounded-lg text-base transition-all duration-150 ease-in hover:bg-blue-700 active:scale-[0.98]"
                title="Send OTP"
              />
            </div>
          </form>
        )}

        {step === 2 && (
          <form>
            <div className="w-full mt-4">
              <Label
                htmlFor="otp"
                className="text-sm text-black font-medium mb-1.5 block"
                value="OTP"
              />

              <Input
                placeholder="OTP"
                id="otp"
                className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
              />
            </div>

            <div className="w-full mt-5">
              <Button
                type="submit"
                className="w-full text-center shadow-lg shadow-blue-600/50 py-2.5 bg-blue-600 cursor-pointer text-white font-bold rounded-lg text-base transition-all duration-150 ease-in hover:bg-blue-700 active:scale-[0.98]"
                title="Verify OTP"
              />
            </div>
          </form>
        )}

        {step === 3 && (
          <form>
            <div className="w-full mt-4">
              <Label
                htmlFor="new-password"
                className="text-sm text-black font-medium mb-1.5 block"
                value="New Password"
              />

              <Input
                type="password"
                placeholder="New Password"
                id="new-password"
                className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
              />
            </div>

            <div className="w-full mt-4">
              <Label
                htmlFor="confirm-password"
                className="text-sm text-black font-medium mb-1.5 block"
                value="Confirm Password"
              />

              <Input
                type="password"
                placeholder="Confirm Password"
                id="confirm-password"
                className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
              />
            </div>

            <div className="w-full mt-5">
              <Button
                type="submit"
                className="w-full text-center shadow-lg shadow-blue-600/50 py-2.5 bg-blue-600 cursor-pointer text-white font-bold rounded-lg text-base transition-all duration-150 ease-in hover:bg-blue-700 active:scale-[0.98]"
                title="Reset Password"
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
