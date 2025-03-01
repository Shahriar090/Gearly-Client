import { useState } from "react";
import bannerImg1 from "../../assets/banner-1.png";
import bannerImg2 from "../../assets/banner-img-2 (2).png";
import bannerImg3 from "../../assets/banner-img-3.png";
import bannerImg4 from "../../assets/banner-img-4.png";
import { Button } from "../ui/button";

const Carousel = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [bannerImg1, bannerImg2, bannerImg3, bannerImg4];

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
    <section id="carousel-container">
      <div className="relative w-full mx-auto">
        {/* Main Image */}
        <div className="main-image-container w-full">
          <img
            src={images[selectedImage]}
            alt={`Main Image ${selectedImage}`}
            className="main-image w-full h-full md:h-[580px] mx-auto object-cover "
          />
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-2 bottom-1 space-x-1 hidden md:block z-50">
          <Button variant="outline" onClick={goToPrevImage}>
            {" "}
            {"<"}
          </Button>

          <Button variant="outline" onClick={goToNextImage}>
            {">"}
          </Button>
        </div>

        {/* Thumbnail Image Carousel */}
        <div className="thumbnail-carousel absolute  md:bottom-0 right-0  flex gap-2 w-full justify-center md:justify-end">
          {images.map((image, index) => (
            <div
              key={index}
              className="thumbnail-wrapper cursor-pointer"
              onClick={() => selectImage(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className={`thumbnail-image w-full h-full border-2 md:w-24 md:h-24 object-cover rounded-lg ${
                  selectedImage === index ? "border-green-500" : "border-2"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
