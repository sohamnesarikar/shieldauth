import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center w-full h-screen bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
