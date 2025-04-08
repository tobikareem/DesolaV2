import { useRef, WheelEvent } from 'react';

export const useSmoothScroll =()=> {
  const smoothScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return smoothScroll;
};


export const useScroll = ()=> {

  const scrollContainerRef = useRef<HTMLDivElement>(null);
    const handleScroll = (event: WheelEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += event.deltaY;
        }
    };
    return {handleScroll, scrollContainerRef};
}