import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef, useState } from "react";

const ProductImage = ({
  productImages,
}: {
  productImages: string[] | null;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  if (!productImages || productImages.length === 0) {
    return <p className="text-red-500">No product images available</p>;
  }

  // handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  // prev image
  const prevImg = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  // next image
  const nextImg = () => {
    setCurrentIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  // handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const bounds = imageRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;

    setZoomPos({ x, y });
  };
  return (
    <div className="w-full bg-white p-4 shadow">
      {/* main image with internal zoom effect */}
      <div
        ref={imageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative overflow-hidden group w-full h-[400px] cursor-zoom-in"
        style={{
          backgroundImage: `url(${productImages[currentIndex]})`,
          backgroundSize: isHovering ? "200%" : "100%",
          backgroundPosition: isHovering
            ? `${zoomPos.x}% ${zoomPos.y}%`
            : "center",
          backgroundRepeat: "no-repeat",
          transition:
            "background-size 0.3s ease, background-position 0.1s ease",
        }}
      >
        {/* fallback image for SEO and accessibility*/}
        <img
          src={productImages[currentIndex]}
          alt="Product"
          className="w-full h-full opacity-0 pointer-events-none"
        />
      </div>

      {/* thumbnails and arrow buttons */}

      <div className="flex gap-2 mt-3 justify-center items-center">
        {/* left arrow */}
        <button
          onClick={prevImg}
          className="bg-[var(--color-bg-gray)] shadow p-2 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>

        {/* thumbnails */}
        <div className="flex gap-2 items-center">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => handleThumbnailClick(index)}
              className={`w-20 h-20 object-cover border ${
                currentIndex === index
                  ? "border-[var(--color-blue)]"
                  : "border-[var(--color-gray)]"
              } cursor-pointer rounded`}
            />
          ))}
        </div>

        {/* right arrow */}
        <button
          onClick={nextImg}
          className="bg-[var(--color-bg-gray)] shadow p-2 rounded-full"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductImage;
