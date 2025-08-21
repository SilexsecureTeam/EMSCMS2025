import  { useState } from 'react';
import woman from '../assets/businesswoman.jpg';
import logo from '../assets/Group.svg';
import Authentication from '../hooks/auth';


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { forgotPassword } = Authentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await forgotPassword({ email });
      setSuccess('You will receive a password reset link shortly');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send reset link');
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
            <h2 className="md:mt-10 mt-5 md:text-[28px] text-[18px] font-semibold text-black">Forgot Password</h2>
            <p className="md:text-[20px] text-[20px] font-normal text-[#4D4E50] mt-1">Enter your email to reset password</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-5 py-2.5 border border-[#D3CDCD] bg-white rounded-lg"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
            <button
              type="submit"
              className="w-full hover:bg-[#2d472c] text-[20px] cursor-pointer bg-[#2C473A] text-white py-3 rounded-lg font-semibold"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
