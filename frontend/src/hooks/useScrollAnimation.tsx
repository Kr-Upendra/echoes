import { useEffect, useState, useRef } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  direction?: "top" | "bottom" | "left" | "right";
  animationClass?: string;
  duration?: string;
  delay?: string;
}

const useScrollAnimation = ({
  threshold = 0.1,
  direction = "bottom",
  animationClass = "opacity-100 translate-x-0",
  duration = "500",
  delay = "0",
}: UseScrollAnimationOptions) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [threshold]);

  const getTranslation = () => {
    switch (direction) {
      case "left":
        return "translate-x-[-200px]";
      case "right":
        return "translate-x-[200px]";
      case "top":
        return "translate-y-[-200px]";
      case "bottom":
      default:
        return "translate-y-[200px]";
    }
  };

  const animationStyles = isVisible
    ? `${animationClass} transition-all duration-${duration} ease-in-out delay-${delay}`
    : `opacity-0 ${getTranslation()} transition-all duration-${duration} ease-in-out delay-${delay}`;

  return { cardRef, animationStyles };
};

export default useScrollAnimation;
