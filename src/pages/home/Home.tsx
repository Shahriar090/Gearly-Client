import FlashSale from "./flash-sale/FlashSale";
import TopCategories from "./top-categories/TopCategories";
import BestSellingProducts from "./best-selling/BestSellingProducts";
import NewArrivals from "./new-arrivals/NewArrivals";
import ExclusiveDeals from "./exclusive-deals/ExclusiveDeals";
import HeroSlider from "@/components/carousel/HeroSlider";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <FlashSale />
      <TopCategories />
      <BestSellingProducts />
      <NewArrivals />
      <ExclusiveDeals />
    </div>
  );
};

export default Home;
