import { LogOut, Home, Users, Monitor, BarChart2, MessageSquare, Settings, NotebookTextIcon, SquareDashedBottom } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Group.svg';
import { useSidebar } from '../../context/SidebarContext';
import Authentication from '../../hooks/auth';
import { toast } from 'react-hot-toast';

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const navigate = useNavigate();
  const { logout } = Authentication();

  const handleNavClick = () => {
    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');
    try {
      await logout();
      toast.success('Logged out successfully', { id: toastId });
      navigate('/');
    } catch (error) {
      toast.error(error?.toString() || 'Logout failed', { id: toastId });
      console.error(error);
    }
  };

  // Navigation items with corresponding routes
  const navItems = [
    { icon: <Home />, path: '/dashboard', tooltip: 'Dashboard' },
    { icon: <NotebookTextIcon />, path: '/dashboard/pages', tooltip: 'Pages' },
    { icon: <Monitor />, path: '/dashboard/blog', tooltip: 'Blog' },
    { icon: <SquareDashedBottom />, path: '/dashboard/programme', tooltip: 'Program' },
    { icon: <Users />, path: '/dashboard/career', tooltip: 'Career' },
    { icon: <BarChart2 />, path: '/dashboard/gallery', tooltip: 'Gallery' },
    { icon: <MessageSquare />, path: '/dashboard/contact', tooltip: 'Contact' },
    { icon:<NotebookTextIcon />, path: '/dashboard/enrol-now', tooltip: 'Enroll Now' },
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-[160px] bg-white flex flex-col items-center py-8 
        transform transition-transform duration-300 z-90 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:translate-x-0 sm:static sm:flex
      `}
    >
      <div className="mb-18">
        <img src={logo} className="w-[148px] h-[36px]" alt="logo" />
      </div>

      <div className="flex flex-col gap-4 items-center flex-1 mt-8">
        {navItems.map((item, index) => (
          <div key={index} onClick={handleNavClick}>
            <Link to={item.path} className="relative group">
              <div className="p-2 bg-[#C5AC8E] text-white hover:bg-[#2C473A] rounded">
                {item.icon}
              </div>
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-[#2C473A] text-white text-base rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {item.tooltip}
              </span>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-18 pb-8 pt-3">
        <button
          className="px-3 py-2 border border-[#E95050] text-[#E95050] cursor-pointer rounded-lg text-xs flex items-center"
          onClick={handleLogout}
        >
          <LogOut size={14} className="mr-1" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;