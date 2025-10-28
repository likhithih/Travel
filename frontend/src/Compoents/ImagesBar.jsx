import React, { useState } from "react";

const ImagesBar = () => {
  const images = [
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide3.png",
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide4.png",
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Main Image */}
      <div className="w-full max-w-3xl">
        <img
          src={mainImage}
          className="w-full rounded-lg"
          alt="Main"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 max-w-3xl gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="thumb rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80"
            alt={`Thumb ${index + 1}`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagesBar;
