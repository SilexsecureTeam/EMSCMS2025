const ManagementCard = ({ title, active = false, onClick }) => {
  return (
    <div className={`rounded-lg shadow px-10 z-20 flex flex-col items-start justify-center max-w-[456px] h-[200px] ${active ? 'bg-[#10172B] text-white' : 'bg-white'}`}>
      <h3 className="font-medium mb-4 text-[20px] md:text-[25px]">{title}</h3>
      <div className="flex">
        <button
          className={`text-[15px] w-[136px] font-meduim px-3 py-3 ${
            active ? 'bg-[#C5AC8E] text-white' : 'bg-gray-200'
          }`}
          onClick={onClick}
        >
          View Details
        </button>
        {active && (
          <button className="text-[15px] w-[136px] px-3 py-3 text-black bg-white">Turn site off</button>
        )}
      </div>
    </div>
  );
}

export default ManagementCard