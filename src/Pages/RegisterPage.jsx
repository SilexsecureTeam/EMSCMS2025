import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from 'react'; // Added for useEffect
import { useNavigate } from 'react-router-dom'; // Added for navigation
import woman from '../assets/businesswoman.jpg';
import logo from '../assets/Group.svg';
import Authentication from '../hooks/auth';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\d+$/, 'Phone must be digits only')
    .required('Phone is required'),
  role: yup.string().required('Role is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const RegisterPage = () => {
  const { RegisterUser } = Authentication();
  const navigate = useNavigate(); 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Redirect to dashboard if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast('You are not logged in ');
      navigate('/login');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      await toast.promise(
        RegisterUser(data),
        {
          loading: 'Creating account...',
          success: (response) => {
            navigate('/dashboard'); // Redirect to dashboard on successful registration
            return response || 'Account created successfully!';
          },
          error: (err) => {
            if (err?.response?.data?.errors) {
              // Handle server-side validation errors
              Object.keys(err.response.data.errors).forEach((key) => {
                setError(key, { type: 'server', message: err.response.data.errors[key][0] });
              });
            }
            return err?.response?.data?.message || 'Registration failed';
          },
        }
      );
    } catch (error) {
      console.error('Registration error:', error);
    }
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
      <div className="bg-transparent h-fit md:px-5 rounded-lg flex items-center w-full">
        <div className="w-full">
          <div className="mb-8 w-full flex flex-col items-center text-center">
            <img src={logo} alt="logo" className="md:w-[329px] md:h-[80px] w-[200px] h-[35px]" />
            <h2 className="md:mt-10 mt-5 md:text-[28px] text-[18px] font-semibold text-black">Create your account</h2>
            <p className="md:text-[20px] text-[20px] font-normal text-[#4D4E50] mt-1">Please fill in your details</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  {...register('firstname')}
                  placeholder="First Name"
                  className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg"
                />
                {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
              </div>
              <div className="w-1/2">
                <input
                  {...register('lastname')}
                  placeholder="Last Name"
                  className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg"
                />
                {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
              </div>
            </div>
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Email"
                className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register('phone')}
                placeholder="Phone"
                className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div>
              <input
                {...register('role')}
                placeholder="Role"
                className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg"
              />
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>
            <div>
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div>
              <input
                {...register('password_confirmation')}
                type="password"
                placeholder="Confirm Password"
                className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg"
              />
              {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation.message}</p>}
            </div>
            {errors.apiError && <p className="text-red-500 text-sm mt-1">{errors.apiError.message}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full hover:bg-[#2d472c] text-[20px] cursor-pointer bg-[#2C473A] text-white py-3 rounded-lg font-semibold"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
            <div className="text-start pl-7 text-[18px] text-black mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-[#2C473A] font-semibold hover:underline">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;