import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCircle, FaXmark } from "react-icons/fa6";
import IconButton from "../buttons/IconButton";

interface ImageModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const ViewImageModel: React.FC<ImageModalProps> = ({
  images,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const modalRef: any = useRef(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > swipeThreshold) {
      goToNext();
    }

    if (swipeDistance < -swipeThreshold) {
      goToPrev();
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <IconButton
        icon={FaXmark}
        onClick={onClose}
        buttonStyle="absolute top-4 right-4 sm:top-6 sm:right-6 text-white bg-green-200/30 p-2 rounded-full hover:bg-orange-600 transition-color"
      />
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={modalRef}
        className="relative max-w-[80%] md:max-w-full w-full rounded-lg shadow-lg p-4 sm:px-2"
      >
        <div className="flex justify-between items-center">
          <button
            onClick={goToPrev}
            className="text-white sm:hidden text-2xl sm:text-base"
          >
            <FaChevronLeft />
          </button>
          <div
            className={`px-4 sm:px-2 relative overflow-hidden w-full max-h-[80vh] object-cover transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={images[currentIndex]}
              alt="Journal Image"
              className="mx-auto w-full max-h-[80vh] selectDisable rounded-lg big-shadow"
              style={{ width: "auto", height: "auto", maxWidth: "100%" }}
            />
          </div>
          <button
            onClick={goToNext}
            className="text-white sm:hidden text-2xl sm:text-base"
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="text-center text-white mt-6">
          <div className="flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                type="button"
                className="focus:outline-none"
              >
                {currentIndex === index ? (
                  <FaCircle className="text-green-500" />
                ) : (
                  <FaCircle className="text-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImageModel;
