import { useState } from 'react';
import { axiosClient, axiosAuth } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../hooks/store'; 
const Authentication = () => {

  const [loading, setLoading] = useState(false);
  const router = useNavigate()
  const dispatch = useDispatch()
  // Register

  const RegisterUser = async (data) => {
    try {
      setLoading(true);
      const res = await axiosAuth.post("/register", data);
      router("/login");
      console.log('Register:', res);
      return Promise.resolve("User created successfully");
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Failed to create account");
    } finally {
      setLoading(false);
    }
  }


  // Login
  const login = async (data) => {
    try {
      setLoading(true);
      const res = await axiosClient.post("/login", data);
      console.log(res)
      if(res?.data?.status == true) {
        router("/otp");
      }
    }
    catch (error) {
       const resError = error.response?.data;
      const errorMessage = resError?.message || resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Failed to login");
    }
    finally {
      setLoading(false);
    }
  }


  // Verify OTP
  const verifyOtp = async (data) => {
    try{
      const res = await axiosClient.post('/verify-otp', data);
      console.log('Verify OTP:', res.data);
      if (res?.data?.token && res?.data?.user) {
        dispatch(setToken(res.data.token));
        dispatch(setUser(res.data.user));
      }
      router('/dashboard');
      return Promise.resolve("OTP verified successfully");
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage =  resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Failed to verify OTP, expired or invalid");
    }
  }

  // Forgot Password
  const forgotPassword = async (data) => {
    try {
      const res = await axiosClient.post('/forgot-password', data);
      console.log('Forgot Password:', res.data);
      router("/reset-password");
      return Promise.resolve("Forgot password email sent successfully");
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage = resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Failed to send forgot password email");
    }
    
  }

  // Reset Password
  const resetPassword = async (data) => {
    try {
      const res = await axiosClient.post('/reset-password', data);
      console.log('Reset Password:', res.data);
      router("/login");
      return Promise.resolve("Password reset successfully");
    } catch (error) {
      const resError = error.response?.data;
      const errorMessage = resError?.data;
      console.error(error);
      return Promise.reject(errorMessage || "Failed to reset password");
    }
  }


 const logout = async () => {
  setLoading(true);
  try {
    try {
      await axiosClient.post('/logout');
    } catch (error) {
      console.warn('Logout API error (ignored):', error?.response?.data?.message || error.message);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setToken(""));
    dispatch(setUser(null));
    router("/");
    return Promise.resolve("Logged out successfully");
  } catch (error) {
    console.error('Logout error:', error);
    const resError = error?.response?.data;
    const errorMessage = resError?.message || "An error occurred";
    return Promise.reject(errorMessage);
  } finally {
    setLoading(false);
  }
};


  return {
    RegisterUser,
    login,
    verifyOtp,
    forgotPassword,
    resetPassword,
    logout,
    loading
  }

}


export default Authentication

