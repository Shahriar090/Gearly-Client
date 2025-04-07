import { useState } from "react";
import sliderImg1 from "../../assets/banner-1.png";
import sliderImg2 from "../../assets/banner-2.png";
import sliderImg3 from "../../assets/banner-3.png";
// mobile slider images
import mobileSlider1 from "../../assets/mobile-banner-1.png";
import mobileSlider2 from "../../assets/mobile-banner-3.png";
import mobileSlider3 from "../../assets/mobile-banner-4.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

// const images = [sliderImg1, sliderImg2, sliderImg3];

const images = [
  {
    desktop: sliderImg1,
    mobile: mobileSlider1,
  },
  {
    desktop: sliderImg2,
    mobile: mobileSlider2,
  },
  {
    desktop: sliderImg3,
    mobile: mobileSlider3,
  },
];
const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <div className="relative w-full h-[500px] group overflow-hidden border-b">
      {images.map((img, index) => (
        <picture
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <source media="(max-width:768px)" srcSet={img.mobile} />
          <img
            src={img.desktop}
            alt={`Slide${index}`}
            className="w-full h-full"
          />
        </picture>
      ))}

      {/* left button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full  transition  z-10"
      >
        <ChevronLeft />
      </button>
      {/* right button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full  transition z-10"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default HeroSlider;
