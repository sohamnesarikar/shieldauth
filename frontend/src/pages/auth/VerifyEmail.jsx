import { MdMarkEmailRead } from "react-icons/md";
import { Button, Input, Label } from "../../components/ui";

const VerifyEmail = () => {
  return (
    <>
      <div className="max-w-110 w-full m-2 p-10 border border-gray-300 shadow-xl bg-white shadow-gray-300/50 rounded-xl">
        <MdMarkEmailRead className="text-5xl text-center w-full" />
        <h1 className="text-[28px] text-center mt-2 font-bold">
          Verify Your Email
        </h1>
        <p className="text-base text-gray-600 mx-auto mt-2 text-center max-w-72 md:max-w-96">
          We've sent a 6-digit code to user@example.com. Please enter it below
          to verify your account.
        </p>
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
              title="Verify Email"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyEmail;
