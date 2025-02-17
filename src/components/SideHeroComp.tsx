import React from 'react';

interface BackgroundImageSectionProps {
  backgroundImage: string;
  imageSrc: string;
  altText?: string;
  className?: string;
}

const BackgroundImageSection: React.FC<BackgroundImageSectionProps> = ({
  backgroundImage,
  imageSrc,
  altText = 'Background Image',
  className = '',
}) => {
  return (
    <div className={`w-1/2 hidden md:flex items-end justify-center bg-cover bg-top ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <img src={imageSrc} alt={altText} className="w-3/4" />
    </div>
  );
};

export default BackgroundImageSection;
