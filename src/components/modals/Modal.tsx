import React from 'react';

interface ModalProps {
  children?: React.ReactNode;
  close?: () => void;
  position?: 'fixed' | 'absolute';
  className?: string;
  display?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  display = false,
  children,
  close,
  position = 'fixed',
  className = '',
}) => {
  return (
    <div
      onClick={close}
      className={`${
        display ? 'opacity-100 visible' : 'opacity-0 invisible'
      } transition-opacity duration-300 ${position} inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] fixed`}
    >
      <div
        id="content"
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl p-7 max-h-[650px] transform ${
          display ? 'scale-100' : 'scale-0'
        } transition-transform duration-300 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
