import { Route, Routes } from "react-router";
import { ForgetPassword, Login, Signup, VerifyEmail } from "./pages/auth";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
