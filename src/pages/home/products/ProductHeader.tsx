import { FaFacebookMessenger, FaPinterest } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { GoBookmark } from "react-icons/go";
import { MdAddToPhotos } from "react-icons/md";
const ProductHeader = () => {
  return (
    <div className="wrapper bg-white rounded-full shadow-md border padding margin">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <h3 className="text-xs md:text-sm text-[var(--color-black)] font-medium">
            Share:
          </h3>
          <div className="flex items-center gap-2">
            <FaFacebookMessenger size={17} />
            <FaPinterest size={17} />
            <IoLogoWhatsapp size={17} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-xs md:text-sm text-[var(--color-black)] font-medium">
              Save
            </span>
            <GoBookmark size={17} />
          </div>
          <div className="flex items-center gap-1">
            <MdAddToPhotos size={17} />
            <span className="text-xs md:text-sm text-[var(--color-black)] font-medium">
              Add To Compare
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
