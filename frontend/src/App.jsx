import { Route, Routes } from "react-router";
import { ForgetPassword, Home, Login, Signup, VerifyOtp } from "./pages/auth";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
