import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import woman from '../assets/businesswoman.jpg';
import logo from '../assets/Group.svg';
import Authentication from '../hooks/auth';
import { toast } from 'react-hot-toast';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmation_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const ResetPasswordPage = () => {
  const { resetPassword } = Authentication();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmation_password: '',
    },
  });

  const onSubmit = async (data) => {
   toast.promise(
     resetPassword(data),
     {
       loading: 'Resetting password...',
       success: 'Password reset successful',
       error: (err) =>
         err?.response?.data?.message ||
         err?.message ||
         'Password reset failed',
     }
   );
  }

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
            <img
              src={logo}
              alt="logo"
              className="md:w-[329px] md:h-[80px] w-[200px] h-[35px]"
            />
            <h2 className="md:mt-10 mt-5 md:text-[28px] text-[18px] font-semibold text-black">
              Reset Password
            </h2>
            <p className="md:text-[20px] text-[20px] font-normal text-[#4D4E50] mt-1">
              Enter your new password
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              name="password"
              type="password"
              placeholder="New Password"
              {...register('password')}
              className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
            <input
              name="confirmation_password"
              type="password"
              placeholder="Confirm Password"
              {...register('confirmation_password')}
              className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg"
              required
            />
            {errors.confirmation_password && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmation_password.message}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full hover:bg-[#2d472c] text-[20px] cursor-pointer bg-[#2C473A] text-white py-3 rounded-lg font-semibold"
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;