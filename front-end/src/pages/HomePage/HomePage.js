import SliderComponent from '../../components/Slider/SliderComponent';
import CategoryComponent from '../../components/CategoryComponent/CategoryComponent';
import SuggestCart from '../../components/SuggestCart/SuggestCart';
function HomePage() {
  return (
    <div>
      <SliderComponent />
      <div className=" px-10 bg-[#F5F5F7] ">
        <CategoryComponent />
        <SuggestCart></SuggestCart>
      </div>
    </div>
  );
}

export default HomePage;
