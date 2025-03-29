import Carousel from "@/components/carousel/Carousel";
import FlashSale from "./flash-sale/FlashSale";
import TopCategories from "./top-categories/TopCategories";
import BestSellingProducts from "./best-selling/BestSellingProducts";

const Home = () => {
  return (
    <div>
      <Carousel />
      <FlashSale />
      <TopCategories />
      <BestSellingProducts />
    </div>
  );
};

export default Home;
