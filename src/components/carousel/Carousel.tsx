import { useState } from "react";
import bannerImg1 from "../../assets/banner-img-1.png";
import bannerImg2 from "../../assets/banner-img-2.png";
import bannerImg3 from "../../assets/banner-img-3.png";

const Carousel = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [bannerImg1, bannerImg2, bannerImg3];

  const goToNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length); // Cycle to the next image
  };

  const goToPrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length); // Cycle to the previous image
  };

  const selectImage = (index: number) => {
    setSelectedImage(index); // Set the selected image to the clicked thumbnail
  };

  return (
    <div className="carousel-container relative w-full mx-auto">
      {/* Main Image */}
      <div className="main-image-container w-full p-0 md:p-4">
        <img
          src={images[selectedImage]}
          alt={`Main Image ${selectedImage}`}
          className="main-image w-full mx-auto object-cover"
        />
      </div>

      {/* Navigation Arrows */}
      <button
        className="left-arrow absolute top-1/2 hidden md:block left-4 transform -translate-y-1/2 bg-black opacity-70 text-white p-2 rounded-full"
        onClick={goToPrevImage}
      >
        {"<"}
      </button>
      <button
        className="right-arrow absolute top-1/2 hidden md:block right-4 transform -translate-y-1/2 bg-black opacity-70 text-white p-2 rounded-full"
        onClick={goToNextImage}
      >
        {">"}
      </button>

      {/* Thumbnail Image Carousel */}
      <div className="thumbnail-carousel absolute  md:bottom-[-30px] left-1/2 transform -translate-x-1/2 flex gap-2 w-[70%] justify-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="thumbnail-wrapper cursor-pointer"
            onClick={() => selectImage(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className={`thumbnail-image w-full h-full md:w-36 md:h-36 object-cover p-1 border-2 rounded-lg ${
                selectedImage === index ? "border-green-500" : "border-2"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
