import { useActiveSection } from '../context/ActiveSectionContext';

 const NavItem = ({ icon, section, tooltip }) => {
  const { active, setActive } = useActiveSection();

  return (
    <button
      onClick={() => setActive(section)}
      className={`w-[60px] h-[60px] p-2 font-bold cursor-pointer text-white rounded-lg flex items-center justify-center transition-all relative group ${
        active === section
          ? 'bg-[#2C473A] text-white'
          : 'bg-[#C5AC8E] text-white hover:bg-[#2C473A] hover:text-white'
      }`}
    >
      {icon}
      {tooltip && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-[#2C473A] text-white text-[12px] font-semibold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          {tooltip}
        </div>
      )}
    </button>
  );
}

export default NavItem