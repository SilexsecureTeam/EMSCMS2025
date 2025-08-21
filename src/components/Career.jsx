import React, { useEffect, useState } from 'react';
import PageManagement from '../hooks/management';
import { toast } from 'react-hot-toast';
import Skeleton from '@mui/material/Skeleton';

const Career = () => {
  const { getCareer } = PageManagement();
  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_URL || '';

  useEffect(() => {
    const fetchCareer = async () => {
      setLoading(true);
      try {
        const response = await getCareer();
        const data = response?.data;
        if (data) {
          // Normalize content
          const normalizedContent = typeof data.content === 'string' && data.content
            ? JSON.parse(data.content)
            : Array.isArray(data.content)
              ? data.content
              : [];
          setCareerData({
            ...data,
            content: normalizedContent,
          });
        } else {
          setCareerData(null);
          toast.error('No career data found');
        }
      } catch (error) {
        console.error('Error fetching career:', error);
        toast.error(error.response?.data?.message || 'Failed to load career data');
        setCareerData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCareer();
  }, []);

  // Fallback data
  const fallbackData = {
    title: 'Why Work With Us?',
    placement_header:
      'At Etiquette Management School, we are redefining excellence in domestic and hospitality service. As a leading training institution committed to raising the standard of professional domestic staffing, we invest in people, purpose, and performance.',
    content: [
      'Professional Growth :We offer a dynamic and supportive environment where your skills are continually nurtured through hands-on training, mentorship, and exposure to best practices in domestic service and hospitality management.',
      'Impactful Work :Our graduates serve in some of the most prestigious homes and institutions. Whether you train, support, or manage, your work directly shapes lives and careers, creating a ripple effect of excellence in homes and communities.',
      'Integrity & Respect :We believe in the dignity of domestic work and treat every member of our team and talent pool with professionalism, respect, and fairness.',
      'Career Advancement Opportunities :We don\'t just train—we connect. Through our growing employer network and placement support, we help skilled professionals find meaningful, long-term employment.',
      'Inclusive & Supportive Culture :From trainers to trainees, every voice matters. We foster a culture where everyone is seen, supported, and encouraged to thrive.',
    ],
    email: 'info@etiquettemanagementschool.com',
    image: '/assets/career1.png',
  };

  const data = careerData || fallbackData;

  return (
    <div className="lg:px-15 md:px-10 px-5 pb-15 home-2">
      <div className="w-full flex flex-col md:flex-row items-stretch justify-between">
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={288} className="min-h-72 md:h-auto w-full md:w-1/2" />
        ) : (
          <img
            src={data.image}
            alt={data.title}
            className="object-cover min-h-72 md:h-auto w-full md:w-1/2"
          />
        )}
        <div className="bg-[#19392C] w-full md:w-1/2 flex justify-center items-center flex-col p-10 md:p-15">
          <div className="w-fit text-start">
            {loading ? (
              <>
                <Skeleton variant="text" width={200} height={28} className="mb-2" />
                <Skeleton variant="rectangular" width={80} height={4} className="mb-8" />
                <Skeleton variant="text" width="100%" height={20} className="mb-4" />
                <Skeleton variant="text" width="100%" height={20} className="mb-4" />
                <Skeleton variant="text" width="100%" height={20} className="mb-3" />
                <Skeleton variant="text" width="100%" height={20} className="mb-3" />
                <Skeleton variant="text" width="100%" height={20} className="mb-3" />
                <Skeleton variant="text" width="100%" height={20} className="mb-3" />
                <Skeleton variant="text" width="100%" height={20} className="mb-3" />
              </>
            ) : (
              <>
                <h2 className="text-lg poppins md:text-xl font-semibold text-[#F9FAFB] mb-2">
                  {data.title}
                </h2>
                <hr className="bg-[#F9FAFB] w-20 h-1 mb-8" />
                <p className="text-sm md:text-base text-[#F9FAFB] poppins mb-4">
                  {data.placement_header}
                </p>
                <p className="text-sm md:text-base text-[#F9FAFB] poppins mb-4">
                  When you join our team or become part of our talent pool, you align with an institution that values:
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-[#F9FAFB]">
                  {data.content.map((item, index) => {
                    const [label, description] = item.split(':').map(str => str.trim());
                    return (
                      <li key={index} className="pb-3 poppins">
                        <span className="font-semibold mr-3">{label} :</span>
                        {description}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#383737] p-5 md:p-10 lg:p-15">
        <div className="w-fit text-start mb-10">
          {loading ? (
            <>
              <Skeleton variant="text" width={300} height={28} className="mb-2" />
              <Skeleton variant="rectangular" width={80} height={8} />
            </>
          ) : (
            <>
              <h2 className="text-lg poppins md:text-xl poppins font-semibold text-[#F9FAFB] mb-2">
                Are you interested in working with us or being considered for a placement?
              </h2>
              <hr className="bg-[#19392C] w-20 h-2" />
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-6">
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={60} />
          ) : (
            <div className="bg-[#193728] text-center p-10">
              <p className="text-white poppins font-light text-sm md:text-base">
                To join our team, kindly submit your CV and Cover Letter to:{' '}
                <a
                  href={`mailto:${data.email}?subject=Job Application`}
                  className="text-white underline hover:text-gray-300 mr-2"
                >
                  {data.email}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Career;