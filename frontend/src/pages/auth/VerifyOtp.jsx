import { MdMarkEmailRead } from "react-icons/md";
import { Button, Input, Label } from "../../components/ui";
import { useEffect, useState } from "react";
import { verify } from "../../api/authApi";
import { Link, useNavigate } from "react-router";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await verify(email, otp);
      console.log(data);
      localStorage.removeItem("email");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-110 w-full m-2 p-10 border border-gray-300 shadow-xl bg-white shadow-gray-300/50 rounded-xl">
        <MdMarkEmailRead className="text-5xl text-center w-full" />
        <h1 className="text-[28px] text-center mt-2 font-bold">
          Verify using OTP
        </h1>
        <p className="text-base text-gray-600 mx-auto mt-2 text-center max-w-72 md:max-w-96">
          We've sent a 6-digit code to user@example.com. Please enter it below
          to verify your account.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <Label
              htmlFor="otp"
              className="text-sm text-black font-medium mb-1.5 block"
              value="OTP"
            />

            <Input
              placeholder="OTP"
              type="number"
              id="otp"
              className="w-full border border-gray-400 text-base px-3 py-2 leading-normal rounded-lg bg-white"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div className="w-full mt-5">
            <Button
              type="submit"
              className="w-full text-center shadow-lg shadow-blue-600/50 py-2.5 bg-blue-600 cursor-pointer text-white font-bold rounded-lg text-base transition-all duration-150 ease-in hover:bg-blue-700 active:scale-[0.98]"
              disabled={isLoading}
              title={isLoading ? "Verifying..." : "Verify OTP"}
            />
          </div>

          <p className="text-sm text-gray-600 text-center mt-4">
            Go back to{" "}
            <Link
              to={"/login"}
              className="text-blue-600 font-semibold underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default VerifyOtp;
