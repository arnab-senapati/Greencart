import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import imageSlides from '../assets/assets';

const ImageSlider = () => {
  const sliderRef = useRef(null);
  const innerSliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = imageSlides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  useEffect(() => {
    const sliderWidth = sliderRef.current?.clientWidth || 0;
    if (innerSliderRef.current) {
      innerSliderRef.current.style.transform = `translateX(-${currentSlide * sliderWidth}px)`;
    }
  }, [currentSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={sliderRef} className="relative w-full h-[300px] sm:h-[350px] md:h-[420px] overflow-hidden">
        <div ref={innerSliderRef} className="flex transition-transform duration-700 ease-in-out">
          {imageSlides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Arrows */}
        <button onClick={prevSlide} className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-green-600 hover:bg-green-800 text-white p-2 rounded-full shadow-md z-30 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button onClick={nextSlide} className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-green-600 hover:bg-green-800 text-white p-2 rounded-full shadow-md z-30 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
        </button>

        {/* Overlay */}
        <div className="absolute inset-0 flex justify-center items-end md:items-center z-20 px-4 md:px-12 pb-6">
          <div className="text-white max-w-screen-xl w-full">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow max-w-xl mb-4">
              {imageSlides[currentSlide].title}
            </h1>
            <Link
              to={imageSlides[currentSlide].link}
              className="inline-block bg-primary hover:bg-primary-dull text-white font-medium px-6 py-3 rounded transition"
            >
              {imageSlides[currentSlide].buttonText}
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center mt-3 space-x-2">
        {imageSlides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentSlide ? 'bg-green-700 scale-125' : 'bg-gray-400'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;