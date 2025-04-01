export const useSmoothScroll =()=> {
  const smoothScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return smoothScroll;
};