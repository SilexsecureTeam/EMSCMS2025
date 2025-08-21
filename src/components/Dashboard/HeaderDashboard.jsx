import { useState, useEffect } from 'react';
import { Bell, Menu, ChevronDown, MessageCircleMoreIcon, SettingsIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import usa from '../../assets/usa.svg';
import avatar from '../../assets/avatar.png';
import Authentication from '../../hooks/auth';
import { toast } from 'react-hot-toast';

const HeaderDashboard = () => {
  const { setIsSidebarOpen } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = Authentication();

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: 'en',
    name: 'Eng (us)',
    flagSrc: usa,
  });

  // Get token and user from localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Redirect to homepage if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const languages = [
    { code: 'en', name: 'English', flagSrc: '/api/placeholder/24/16' },
    { code: 'es', name: 'Español', flagSrc: '/api/placeholder/24/16' },
    { code: 'fr', name: 'Français', flagSrc: '/api/placeholder/24/16' },
    { code: 'de', name: 'Deutsch', flagSrc: '/api/placeholder/24/16' },
    { code: 'zh', name: '中文', flagSrc: '/api/placeholder/24/16' },
  ];

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  // Extract the active section from the current path
  const activeSection = location.pathname.replace('/dashboard/', '') || 'dashboard';

  // Handle logout using Authentication hook
  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');
    try {
      await logout();
      toast.success('Logged out successfully', { id: toastId });
      setIsProfileDropdownOpen(false);
      navigate('/');
    } catch (error) {
      toast.error(error?.toString() || 'Logout failed', { id: toastId });
      setIsProfileDropdownOpen(false);
      navigate('/');
    }
  };

  return (
    <header className="bg-[#2C473A] text-white px-4 py-4 flex items-center justify-between md:px-6 md:py-10">
      <div className="flex items-center gap-4">
        <button className="sm:hidden" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <h1 className="font-bold text-[13px] md:text-[28px]">
          EMS Admin | {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <button
            className="flex items-center cursor-pointer gap-2 px-2 py-1 text-xs md:text-sm rounded hover:bg-[#3a5c4c]"
            onClick={toggleLanguageDropdown}
          >
            <img
              src={selectedLanguage.flagSrc}
              alt={`${selectedLanguage.name} flag`}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="hidden text-[#000000] text-[18px] font-semibold md:inline">
              {selectedLanguage.name}
            </span>
            <ChevronDown size={18} />
          </button>

          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-50">
              <ul className="py-1 text-gray-800">
                {languages.map((language) => (
                  <li
                    key={language.code}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                    onClick={() => selectLanguage(language)}
                  >
                    <img
                      src={language.flagSrc}
                      alt={`${language.name} flag`}
                      className="w-6 h-4 rounded-sm object-cover border border-gray-300"
                    />
                    <span>{language.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button className="p-1 relative">
          <MessageCircleMoreIcon size={18} className="md:w-6 md:h-6 cursor-pointer text-black" fill="white" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>
        </button>
        <button className="p-1 relative">
          <Bell size={18} className="md:w-6 md:h-6 cursor-pointer text-black" fill="white" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-1">
          <SettingsIcon size={18} className="md:w-6 md:h-6 cursor-pointer text-black" fill="white" />
        </button>
        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center overflow-hidden"
            onClick={() => setIsProfileDropdownOpen((open) => !open)}
          >
            <img src={avatar} alt="User avatar" className="w-full h-full object-fill" />
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 text-black">
              <div className="px-4 py-2 font-semibold">
                {(user.firstname || user.lastname)
                  ? `${user.firstname || ''} ${user.lastname || ''}`.trim()
                  : user.email || 'Profile'}
              </div>
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  // Optionally navigate to profile page
                  setIsProfileDropdownOpen(false);
                }}
              >
                View Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;