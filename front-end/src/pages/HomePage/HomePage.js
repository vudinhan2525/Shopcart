import SliderComponent from '../../components/Slider/SliderComponent';
import CategoryComponent from '../../components/CategoryComponent/CategoryComponent';
import SuggestCart from '../../components/SuggestCart/SuggestCart';
import SaleOffComponent from './SaleOffComponent/SaleOffComponent';
import BestDealComponent from './BestDealComponent/BestDealComponent';
import img1 from '../../assets/img/slider/silder-04.jpeg';
import MostSellingStoreComponent from './MostSellingStoreComponent/MostSellingStoreComponent';
import ServicesHelp from './ServicesHelp/ServicesHelp';
function HomePage() {
  return (
    <div>
      <SliderComponent />
      <div className=" px-10 bg-white ">
        <CategoryComponent />
        <SuggestCart></SuggestCart>
        <SaleOffComponent />
        <BestDealComponent />
      </div>
      <div className="h-[650px] relative my-20 overflow-hidden">
        <div
          style={{ backgroundImage: `url(${img1})` }}
          className="h-full  w-full  bg-no-repeat transition-all hover:scale-[1.1] bg-center bg-cover"
        ></div>
        <div className="px-12 py-14 absolute top-[50%] translate-y-[-50%] rounded-3xl right-[10%] w-[40%] h-[450px] bg-[#FFE6CC]">
          <h4 className="text-primary-color text-[52px] leading-[60px] font-bold mt-3"> Get 5% Cash Back On $200</h4>
          <p className="mt-5 font-semibold text-primary-color text-lg">
            Shoping is a bit of relaxing hooby for me, which is sometimes troubling for the bank balance.
          </p>
          <button className="mt-5 text-white bg-primary-color py-3 px-6 rounded-full border  transition-all  hover:opacity-80">
            Learn more
          </button>
        </div>
      </div>
      <div className=" px-10 bg-white ">
        <MostSellingStoreComponent />
        <ServicesHelp></ServicesHelp>
      </div>
    </div>
  );
}

export default HomePage;
