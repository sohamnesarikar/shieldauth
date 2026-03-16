import axiosInstance from "./axios";

export const login = async (email, password) => {
  try {
    const res = await axiosInstance.post("/api/v1/auth/login", {
      email,
      password,
    });
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const verify = async (email, otp) => {
  try {
    const res = await axiosInstance.post("/api/v1/auth/verify", {
      email,
      otp,
    });
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const home = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/home");
    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
