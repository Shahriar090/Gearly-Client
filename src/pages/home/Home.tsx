import Carousel from "@/components/carousel/Carousel";
import FlashSale from "./flash-sale/FlashSale";
import TopCategories from "./top-categories/TopCategories";
import BestSellingProducts from "./best-selling/BestSellingProducts";
import NewArrivals from "./new-arrivals/NewArrivals";
import ExclusiveDeals from "./exclusive-deals/ExclusiveDeals";

const Home = () => {
  return (
    <div>
      <Carousel />
      <FlashSale />
      <TopCategories />
      <BestSellingProducts />
      <NewArrivals />
      <ExclusiveDeals />
    </div>
  );
};

export default Home;
