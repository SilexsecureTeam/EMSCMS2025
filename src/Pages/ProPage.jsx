import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import PageManagement from '../hooks/management';
import toast from 'react-hot-toast';
import Header2 from '../components/Header2';
import Contact2 from '../components/Contact2';
import Footer2 from '../components/Footer2';

const ProPage = () => {
  const { getPrograms } = PageManagement();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const data = await getPrograms();
      const programData = Array.isArray(data) ? data : data.data || [];
      // Map the fetched data to match the expected structure
      const mappedPrograms = programData.map((program) => ({
        id: program.id,
        imageSrc: program.image ? `${import.meta.env.VITE_IMAGE_URL}${program.image}` : null, // Use API image or null
        alt: program.title ? `${program.title} description` : 'Program description',
        title: program.title || 'Untitled Program',
        summary: program.description || 'No description available',
        link: `/programs/${program.slug || program.id}`, 
      }));
      setPrograms(mappedPrograms);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load programs');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="max-w-[1500px] mx-auto">
      <Header2 />
      <div className="lg:px-15 md:px-10 px-5 py-12 md:pb-12">
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl poppins font-bold text-[#333333]">
              Our Programs
            </h2>
            <p className="mt-2 poppins max-w-[430px] mx-auto text-[#333333]">
              Explore our diverse range of programs designed to empower you with
              skills and knowledge for personal and professional growth.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg rounded-t-2xl overflow-hidden flex flex-col">
                  <Skeleton variant="rectangular" className="w-full h-48" animation="wave" />
                  <div className="p-4 flex flex-col flex-grow">
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="100%" height={60} />
                    <Skeleton variant="text" width="30%" height={20} />
                  </div>
                </div>
              ))}
            </div>
          ) : programs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No programs found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map(({ id, imageSrc, alt, title, summary, link }) => (
                <div
                  key={id}
                  className="bg-white rounded-lg rounded-t-2xl overflow-hidden flex flex-col"
                >
                  <div className="h-48">
                    {!imageLoaded[id] && (
                      <Skeleton
                        variant="rectangular"
                        className="w-full h-full"
                        animation="wave"
                      />
                    )}
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={alt}
                        className="w-full h-48 object-cover"
                        onLoad={() => handleImageLoad(id)}
                        style={{ display: imageLoaded[id] ? 'block' : 'none' }}
                      />
                    ) : (
                      <div
                        className="w-full h-48 bg-gray-500 flex items-center justify-center"
                        style={{ display: imageLoaded[id] ? 'block' : 'none' }}
                      >
                        <span className="text-white text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-[20px] font-semibold poppins text-[#2E2F33] mb-2">
                      {title}
                    </h3>
                    <p className="text-[#5F6980] poppins text-sm mb-4 flex-grow">
                      {summary}
                    </p>
                    <div className="flex items-center justify-between text-gray-500 text-xs">
                      <Link
                        to={link}
                        className="font-medium text-[#193728] poppins hover:underline"
                        aria-label={`View ${title} details`}
                      >
                        View Program
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <Contact2 />
      <Footer2 />
    </div>
  );
};

export default ProPage;