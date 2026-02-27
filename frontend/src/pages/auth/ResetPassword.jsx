import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";
import { Button, Input, Label } from "../../components/ui";

const ResetPassword = () => {
  return (
    <>
      <div className="max-w-110 w-full m-2 p-10 border border-gray-300 shadow-xl bg-white shadow-gray-300/50 rounded-xl">
        <div className="flex items-center gap-1">
          <IoMdArrowBack className="text-sm text-blue-600 font-semibold" />
          <p className="text-sm text-blue-600 font-semibold">Back to Login</p>
        </div>
        <RiLockPasswordLine className="text-5xl text-center w-full mt-4" />
        <h1 className="text-[28px] text-center font-bold mt-2">
          Reset Password
        </h1>
        <p className="text-base text-gray-600 mx-auto mt-2 text-center max-w-72 md:max-w-96">
          Please enter your new password below to regain access to your account.
        </p>
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
      </div>
    </>
  );
};

export default ResetPassword;
