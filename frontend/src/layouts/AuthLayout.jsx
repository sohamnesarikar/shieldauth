import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import ResetPassword from "../pages/auth/ResetPassword";
import Signup from "../pages/auth/Signup";
import VerifyEmail from "../pages/auth/VerifyEmail";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center w-full h-screen bg-gray-50">
        {/* <Signup /> */}
        {/* <Login /> */}
        {/* <ForgotPassword /> */}
        {/* <VerifyEmail /> */}
        <ResetPassword />
      </div>
    </div>
  );
};

export default AuthLayout;
