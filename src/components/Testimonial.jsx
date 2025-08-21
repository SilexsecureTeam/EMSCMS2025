import React, { useState, useEffect, useRef } from 'react';
import avatar from '../assets/avatar.png'
// import { QuoteIcon } from 'lucide-react';
import quote from '../assets/quote.png'

const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [maxIndex, setMaxIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
    
      const testimonials = [
        { id: 1,
         src:  avatar,
         alt: "Image 1",
         name: "Sarah T.",
        work: "CEO, Eat well",
        paragraph: "Lorem ipsum dolor sit amet consectetur. Odio mauris velit pharetra dictum porttitor. Viverra ornare pretium augue massa fusce quis tincidunt urna. Semper et ipsum vestibulum diam aliquam dis vel. Risus urna auctor varius amet arcu proin tempor in." },
        { id: 2,
         src:  avatar,
         alt: "Image 2",
         name: "Larry B.",
        work: "Entrepreneur",
        paragraph: "Lorem ipsum dolor sit amet consectetur. Odio mauris velit pharetra dictum porttitor. Viverra ornare pretium augue massa fusce quis tincidunt urna. Semper et ipsum vestibulum diam aliquam dis vel. Risus urna auctor varius amet arcu proin tempor in." },
        { id: 3,
         src: avatar,
         alt: "Image 3",
         name: "Smart T.",
        work: "Student",
        paragraph: "Lorem ipsum dolor sit amet consectetur. Odio mauris velit pharetra dictum porttitor. Viverra ornare pretium augue massa fusce quis tincidunt urna. Semper et ipsum vestibulum diam aliquam dis vel. Risus urna auctor varius amet arcu proin tempor in." },
      ];
      
      // Calculate cards per view based on screen width
      useEffect(() => {
        const calculateCardsPerView = () => {
          if (window.innerWidth >= 1024) {
            return 3; // Desktop
          } else if (window.innerWidth >= 640) {
            return 2; // Tablet
          } else {
            return 1; // Mobile
          }
        };
        
        const updateDimensions = () => {
          const newCardsPerView = calculateCardsPerView();
          setCardsPerView(newCardsPerView);
          setMaxIndex(Math.max(0, testimonials.length - newCardsPerView));
          
          // Ensure current index is within bounds after resize
          setCurrentIndex(prev => Math.min(prev, Math.max(0, testimonials.length - newCardsPerView)));
        };
        
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        
        return () => {
          window.removeEventListener('resize', updateDimensions);
        };
      }, [testimonials.length]);
      
      // Animation function for smooth dragging
      const animation = () => {
        if (trackRef.current) {
          setSliderPosition();
        }
        if (isDragging) {
          animationRef.current = requestAnimationFrame(animation);
        }
      };
      
      // Set the slider position
      const setSliderPosition = () => {
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${currentTranslate}px)`;
        }
      };
      
      // Get position for mouse or touch event
      const getPositionX = (event) => {
        return event.type.includes('mouse') 
          ? event.pageX 
          : event.touches[0].clientX;
      };
      
      // Handle touch/mouse start
      const handleStart = (event) => {
        setIsDragging(true);
        setStartPosition(getPositionX(event));
        animationRef.current = requestAnimationFrame(animation);
      };
      
      // Handle touch/mouse move
      const handleMove = (event) => {
        if (isDragging) {
          const currentPosition = getPositionX(event);
          // const cardWidth = containerRef.current ? containerRef.current.offsetWidth / cardsPerView : 0;
          setCurrentTranslate(prevTranslate + currentPosition - startPosition);
        }
      };
      
      // Handle touch/mouse end
      const handleEnd = () => {
        setIsDragging(false);
        cancelAnimationFrame(animationRef.current);
        
        // const cardWidth = containerRef.current ? containerRef.current.offsetWidth / cardsPerView : 0;
        const movedBy = currentTranslate - prevTranslate;
        
        // Determine if slide should move to next/prev
        if (movedBy < -50 && currentIndex < maxIndex) {
          setCurrentIndex(prev => prev + 1);
        } else if (movedBy > 50 && currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
        
        finishDrag();
      };
      
      // Finalize drag and update position
      const finishDrag = () => {
        const cardWidth = containerRef.current ? containerRef.current.offsetWidth / cardsPerView : 0;
        const newTranslate = -currentIndex * cardWidth;
        
        setCurrentTranslate(newTranslate);
        setPrevTranslate(newTranslate);
        
        if (trackRef.current) {
          trackRef.current.style.transition = 'transform 0.5s ease';
          trackRef.current.style.transform = `translateX(${newTranslate}px)`;
        }
      };
      
      // Go to a specific dot/index
      const goToIndex = (index) => {
        setCurrentIndex(index);
        const cardWidth = containerRef.current ? containerRef.current.offsetWidth / cardsPerView : 0;
        const newTranslate = -index * cardWidth;
        
        setCurrentTranslate(newTranslate);
        setPrevTranslate(newTranslate);
        
        if (trackRef.current) {
          trackRef.current.style.transition = 'transform 0.5s ease';
          trackRef.current.style.transform = `translateX(${newTranslate}px)`;
        }
      };
      
      // Update slider when current index changes
      useEffect(() => {
        if (!isDragging) {
          finishDrag();
        }
      }, [currentIndex, cardsPerView]);
      
      // Create dots based on cards per view
      const renderDots = () => {
        const dotsCount = Math.ceil(testimonials.length / cardsPerView);
        const dots = [];
        
        for (let i = 0; i < dotsCount; i++) {
          const isActive = Math.floor(currentIndex / cardsPerView) === i;
          dots.push(
            <button
              key={i}
              onClick={() => goToIndex(i * cardsPerView)}
              className={`w-4 h-4 rounded-full mx-1 transition-colors border-2 border-[#193728] duration-300 ${
                isActive ? 'bg-[#193728]' : 'bg-white'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          );
        }
        
        return dots;
      };

  return (
    <div className='next w-full py-16 lg:px-23 md:px-13 px-3'>
      <h2 className='md:text-[40px] text-2xl  text-center text-[#333333] font-semibold '>Why choose The Etiquette and Management School</h2>
      <h3 className='text-center mt-4 mb-8 text-[22px] font-normal block mx-auto max-w-[766px]'>Whether it's a first business on etiquette or the last one
      in management, EMS is here to support you on every step of your creative journey.</h3>

      <div 
        ref={containerRef}
        className="relative overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseMove={isDragging ? handleMove : null}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        {/* Slider Track */}
        <div 
          ref={trackRef}
          className="flex  transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${-currentIndex * (containerRef.current ? containerRef.current.offsetWidth / cardsPerView : 0)}px)` }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`flex-shrink-0 px-2 ${
                cardsPerView === 1 ? 'w-full' : 
                cardsPerView === 2 ? 'w-1/2' : 'w-1/3'
              }`}
            > 
              <div className='flex justify-center items-center max-w-[1600px] mx-auto'>
              <div className="border-2 w-fit shadow-lg border-[#193728] p-8 rounded-lg bg-white  flex  gap-x-2 justify-between">
                <div className='grid'>
                    <div className='flex gap-x-2 mb-5'>
                  <img 
                    src={testimonial.src}  
                    alt={testimonial.alt} 
                    className="w-14 h-14 mr-3 object-fill rounded-lg shadow-md"
                  />
                  <div>
                    <h2 className='font-bold text-[#193728] text-[20px]'>{testimonial.name}</h2>
                    <h4 className='text-[#111827]'>{testimonial.work}</h4>
                  </div>
                  </div>
                  
                  <div className='relative max-w-[350px]'>
                    <img src={quote} alt="quote" className='absolute left-[-20px] ' />
                  {/* <QuoteIcon size={20}  /> */}
                  <p className='text-[#333333] text-base'>{testimonial.paragraph}</p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6">
        {renderDots()}
      </div>
      
      {/* Swipe Hint */}
      <div className="flex items-center justify-center mt-4 text-gray-500 text-sm">
        {/* <span>Swipe to see more</span> */}
      </div>
    </div>
  )
}

export default Testimonial
