import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import woman from '../assets/businesswoman.jpg';
import logo from '../assets/Group.svg';
import { useNavigate } from 'react-router-dom';
import Authentication from '../hooks/auth';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().min(4, 'Password must be at least 4 characters long').required('Password is required'),
});

const Login = () => {
  const { login } = Authentication();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
     toast.promise(
          login(data),
          {
            loading: "Logging in...",
            success: (data) => data,
            error: (err) => err,
          }
        )
  };

  return (
    <div
      className="min-h-screen h-fit overflow-y-auto w-full md:px-20 px-5 py-12 lg:px-40 flex items-center md:items-start md:py-18"
      style={{
        backgroundImage: `url(${woman})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-transparent h-fit md:px-5 rounded-lg flex items-center">
        <div className="w-full">
          <div className="mb-8 w-full flex flex-col items-center text-center">
            <img src={logo} alt="logo" className="md:w-[329px] md:h-[80px] w-[200px] h-[35px]" />
            <h2 className="md:mt-10 mt-5 md:text-[28px] text-[18px] font-semibold text-black">Welcome back!</h2>
            <p className="md:text-[20px] text-[20px] font-normal text-[#4D4E50] mt-1">Please enter your details</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d3cdcd]"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d3cdcd]"
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-9 text-[#0B0A0A]">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  // You can manage rememberMe with useState if needed
                  className="mr-2"
                />
                Remember me
              </label>
              <a href="/forgot-password" className="text-[#0A572E] hover:underline">
                Forgot your password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full hover:bg-[#2d472c] text-[20px] cursor-pointer bg-[#2C473A] text-white py-3 rounded-lg font-semibold"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            {/* Error Message */}
            {loginError && <p className="text-red-500 text-sm mt-1 text-center">{loginError}</p>}

           

           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;