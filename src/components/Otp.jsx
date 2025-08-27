import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import woman from '../assets/businesswoman.jpg';
import logo from '../assets/Group.svg';
import { KeyRoundIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Authentication from '../hooks/auth';

const schema = yup.object().shape({
  otp: yup
    .string()
    .required('OTP is required')
    .matches(/^\d{4}$/, 'OTP must be exactly 4 digits'),
});

const Otp = () => {
  const { verifyOtp } = Authentication();
  const navigate = useNavigate();
  const [timer, setTimer] = React.useState(180);

  React.useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { otp: '' },
  });

  const otp = watch('otp') || '';

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      let otpArr = otp.split('');
      otpArr[index] = value;
      const newOtp = otpArr.join('').padEnd(4, '');
      setValue('otp', newOtp);
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleResend = () => {
    setTimer(180);
    setValue('otp', '');
    // Optionally call resend OTP API here
  };

  const onSubmit = async (data) => {
    try {
      await toast.promise(
        verifyOtp({ otp: data.otp }),
        {
          loading: "Verifying...",
          success: "OTP verified!",
          error: (err) => err?.message || "Verification failed",
        }
      );
      navigate('/dashboard');
    } catch (err) {
      // Error handled by toast
    }
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="min-h-screen h-fit overflow-y-auto w-full md:px-20 px-5 py-10 lg:px-40 flex items-center"
      style={{
        backgroundImage: `url(${woman})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-transparent p-8">
        <img src={logo} alt="logo" className="md:w-[309px] mb-10 md:mb-5 md:h-[70px] w-[200px] h-[35px]" />
        <KeyRoundIcon size={60} className="p-2.5 mb-5 bg-[#2C473A] rounded-full text-white" />
        <h2 className="md:text-[30px] text-[18px] font-semibold text-black mb-2">OTP Verification</h2>
        <p className="text-black mb-6 font-normal text-center text-[15px] md:text-[20px]">
          Enter the 4-digit code sent to your email
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
          <div className="flex md:space-x-5 space-x-3 mb-4">
            {[0, 1, 2, 3].map((index) => (
              <Controller
                key={index}
                name="otp"
                control={control}
                render={({ field }) => (
                  <input
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="sm:w-12 sm:h-12 w-10 h-10 text-center otp bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C473A] text-lg"
                  />
                )}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-red-500 text-sm mb-2">{errors.otp.message}</p>
          )}
          <div className="flex items-center md:justify-between justify-between w-full md:w-[75%] md:mx-auto text-sm text-black mb-15">
            <p>({formatTimer()})</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={timer !== 0}
              className="text-[#323233] md:text-[20px] text-sm font-normal"
            >
           
            </button>
          </div>
          <button
            type="submit"
            disabled={otp.length !== 4 || isSubmitting}
            className={`w-full md:w-[75%] md:mx-auto cursor-pointer mx-auto py-3 rounded-md font-semibold text-lg text-white ${
              otp.length === 4 ? 'bg-[#2C473A]' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Login
          </button>
        </form>
        {/* <p className="text-[16px] font-normal text-[#3C3939] text-center mt-6">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          <br />
          and{' '}
          <a href="#" className="underline">
            Terms of Service
          </a>{' '}
          |{' '}
          <a href="#" className="underline">
            Contact us
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Otp;