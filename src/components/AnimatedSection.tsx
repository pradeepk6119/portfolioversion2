import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once the animation has been triggered to maintain stable performance
          observer.unobserve(currentElement);
        }
      },
      {
        threshold: 0.1, // Trigger as soon as 10% of the section is visible
        rootMargin: '0px 0px -80px 0px', // Trigger slightly before the section fully enters the viewport
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      id={id}
      className={`${className} transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) transform will-change-[transform,opacity] ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
}
