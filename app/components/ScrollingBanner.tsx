import React from 'react';

const ScrollingBanner = () => {
  return (
    <div className="bg-purple-700 text-white py-1 overflow-hidden w-full h-8">
      <div className="flex w-max animate-scroll">
        <p className="text-sm px-4">
          To order, please contact us directly at +16892678636 (WhatsApp available). The website cart is for official queries only.
        </p>
        <p className="text-sm px-4">
          To order, please contact us directly at +16892678636 (WhatsApp available). The website cart is for official queries only.
        </p>
        <p className="text-sm px-4">
          To order, please contact us directly at +16892678636 (WhatsApp available). The website cart is for official queries only.
        </p>
        <p className="text-sm px-4">
          To order, please contact us directly at +16892678636 (WhatsApp available). The website cart is for official queries only.
        </p>
      </div>
    </div>
  );
};

export default ScrollingBanner;