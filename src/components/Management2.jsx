import React, { memo, useEffect, useState } from 'react';
import { MoveRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageManagement from '../hooks/management';
import toast from 'react-hot-toast';

const Management2 = memo(() => {
  const { getPrograms } = PageManagement();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const data = await getPrograms();
      const programData = Array.isArray(data) ? data : data.data || [];
      const mappedPrograms = programData
        .map((program) => ({
          id: program.id,
          title: program.title || 'Untitled Program',
          path: `/programs/${program.slug}`,
          paragraph: program.description || 'No description available',
          img: program.image ? `${import.meta.env.VITE_IMAGE_URL}${program.image}` : null,
        }))
      setPrograms(mappedPrograms);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load programs');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="sm:px-20 lg:px-15 md:px-10 px-5 home-2 py-10 pb-1 md:pb-10 text-">
      <h1 className="mb-3 text-[#333333] text-center inter font-semibold text-3xl md:text-[35px]">
        The Etiquette & Management Programs
      </h1>
      <p className="mb-8 font-light text-[#333333] max-w-[680px] text-center mx-auto inter text-lg md:text-[22px]">
        World-class domestic and etiquette training, customized for the realities of Nigerian and global households
      </p>
      <div className="flex flex-wrap -mx-2">
        {loading ? (
          <div className="w-full text-center py-8 text-gray-500">
            Loading programs...
          </div>
        ) : programs.length === 0 ? (
          <div className="w-full text-center py-8 text-gray-500">
            No programs found.
          </div>
        ) : (
          programs.map((program) => {
            const isActive = program.id === activeId;
            return (
              <div
                key={program.id}
                className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
                onClick={() => handleClick(program.id)}
              >
                <Link to={program.path}>
                  <div
                    className={`group relative cursor-pointer bg-[#19392c] h-96 lg:h-115 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 border border-gray-700/30 flex flex-col ${
                      isActive ? 'bg-white text-black' : ''
                    }`}
                  >
                    {/* Top Half with Image Reveal */}
                    <div className="relative h-1/2 flex justify-center items-center transition-all duration-300">
                      {program.img ? (
                        <div
                          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
                            isActive || 'group-hover:opacity-100'
                          }`}
                          style={{ backgroundImage: `url(${program.img})` }}
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 bg-gray-500 transition-opacity duration-300 ${
                            isActive || 'group-hover:opacity-100'
                          }`}
                        >
                          <span className="absolute inset-0 flex items-center justify-center text-white text-sm">
                            No Image
                          </span>
                        </div>
                      )}
                      <div className="relative inline-block z-10">
                        <div
                          className={`absolute inset-0 rounded-full backdrop-blur-md bg-black/30 transition-all duration-300 ${
                            isActive || 'group-hover:opacity-100'
                          }`}
                        />
                        <h2
                          className={`relative z-10 text-white text-center py-3 px-6 rounded-full border border-[#c5ac8e] text-[14px] md:text-[15px] font-medium tracking-wide uppercase bg-transparent ${
                            isActive ? 'text-black' : ''
                          }`}
                        >
                          {program.title}
                        </h2>
                      </div>
                    </div>

                    {/* Bottom Half with paragraph + arrow */}
                    <div
                      className={`flex flex-col justify-between h-1/2 p-6 border-t border-t-[#c5ac8e] transition-all duration-300 ${
                        isActive
                          ? 'bg-white text-black'
                          : 'group-hover:bg-white group-hover:text-black text-white'
                      }`}
                    >
                      <p className="text-sm md:text-[15px] font-normal leading-relaxed mb-4 line-clamp-4">
                        {program.paragraph.length > 120
                          ? program.paragraph.slice(0, 120) + '...'
                          : program.paragraph}
                      </p>
                      <div className="flex items-center justify-start w-full">
                        <div className="bg-[#c5ac8e]/20 hover:bg-[#c5ac8e]/30 rounded-full p-3 transition-all duration-200">
                          <MoveRightIcon
                            className={`text-inherit ${
                              isActive ? 'translate-x-1' : 'group-hover:translate-x-1'
                            } transition-transform duration-200`}
                            size={20}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});

export default Management2;