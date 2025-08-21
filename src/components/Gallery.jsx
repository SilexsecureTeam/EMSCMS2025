import React, { useState, useEffect } from "react";
import PageManagement from "../hooks/management";
import { Skeleton } from "@mui/material";

const Gallery = () => {
  const { getAllGalleries } = PageManagement();
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const IMG_URL = import.meta.env.VITE_IMAGE_URL;

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      try {
        const response = await getAllGalleries();
        const galleryData = Array.isArray(response.data)
          ? response.data
          : response.data
          ? [response.data]
          : [];

        const formattedGalleries = galleryData.map((gallery) => ({
          id: gallery.id,
          label: gallery.title,
          // Construct mainImage URL, with a fallback for robustness
          mainImage: gallery.image1 ? `${IMG_URL}${gallery.image1}` : null,
          // Construct subImages array, filtering out null/empty images
          subImages: [
            gallery.image1 ? `${IMG_URL}${gallery.image1}` : null,
            gallery.image2 ? `${IMG_URL}${gallery.image2}` : null,
            gallery.image3 ? `${IMG_URL}${gallery.image3}` : null,
            gallery.image4 ? `${IMG_URL}${gallery.image4}` : null,
            gallery.image5 ? `${IMG_URL}${gallery.image5}` : null,
          ].filter((img) => img),
        }));
        
        setGalleries(formattedGalleries);
      } catch (error) {
        console.error("Error fetching galleries:", error);
        setGalleries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const handleImageClick = (id) => {
    setSelectedImageId(id);
  };

  const handleBackClick = () => {
    setSelectedImageId(null);
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const selectedItem = galleries.find((item) => item.id === selectedImageId);

  return (
    <div className="py-10 md:pb-20 lg:px-18 md:px-12 px-6 relative z-0">
      {/* Modal for Fullscreen Image */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={modalImage}
              alt="Full Preview"
              className="max-h-full max-w-full object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-white text-3xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width="100%"
              height={256}
              animation="wave"
            />
          ))}
        </div>
      ) : (
        <>
          {/* Sub Images View */}
          {selectedImageId && selectedItem ? (
            <>
              <button
                onClick={handleBackClick}
                className="mb-6 bg-[#19392c] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                ← Back
              </button>

              <div className="rounded-xl">
                <h3 className="text-xl md:text-2xl poppins font-semibold text-[#333333] mb-4">
                  {selectedItem.label} Gallery
                </h3>
                {selectedItem.subImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {selectedItem.subImages.map((subImage, index) => (
                      <img
                        key={index}
                        src={subImage}
                        alt={`Sub-image ${index + 1}`}
                        onClick={() => openModal(subImage)}
                        className="w-full h-70 object-cover object-top rounded-lg shadow-md cursor-pointer hover:opacity-80 transition"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#19392c]">
                    No images found for this gallery.
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="w-full mx-auto text-center mb-12">
                <h2 className="text-2xl md:text-[35px] text-[#19392c] poppins font-bold">
                  Our Gallery
                </h2>
                <p className="mt-2 text-[#19392c] font-medium text-sm md:text-base">
                  Explore our collection of images
                </p>
              </div>

              {galleries.length === 0 ? (
                <div className="text-center py-8 text-[#19392c]">
                  No gallery entries found
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {galleries.map((item) => (
                    <div
                      key={item.id}
                      className="relative cursor-pointer group"
                      onClick={() => handleImageClick(item.id)}
                    >
                      <img
                        src={item.mainImage}
                        alt={item.label}
                        className="w-full h-64 object-cover object-top rounded-lg shadow-md transition-transform group-hover:scale-105"
                      />
                      <div className="bottom-0 w-full text-[#19392c] py-3 text-xl">
                        <p className="font-semibold pl-2">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Gallery;