import Carousel from "@/components/carousel/Carousel";
import FlashSale from "./flash-sale/FlashSale";
import TopCategories from "./top-categories/TopCategories";

const Home = () => {
  return (
    <div>
      <Carousel />
      <FlashSale />
      <TopCategories />
    </div>
  );
};

export default Home;
