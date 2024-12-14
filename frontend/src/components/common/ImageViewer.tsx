import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";

type Props = {
  images: string[];
  initialIndex: number;
};

const ImageViewer: React.FC<Props> = ({ images, initialIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

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
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="w-[75vw] lg:w-[85vw] sm:w-full rounded-lg shadow-lg p-4 sm:px-2"
    >
      <div className="flex justify-between items-center">
        <button
          onClick={goToPrev}
          className="text-white sm:hidden text-2xl sm:text-base"
        >
          <FaChevronLeft />
        </button>
        <div
          className={`px-4 relative overflow-hidden w-full max-h-[80vh] object-cover transition-opacity duration-500 ${
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
                <FaCircle className="text-green-500 text-sm" />
              ) : (
                <FaCircle className="text-white text-xs" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
