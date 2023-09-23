import CartComponent from '../../components/CartComponent/CartComponent';
import SortBar from '../../components/SortBar/SortBar';
import SliderComponent from '../../components/Slider/SliderComponent';
function TypePage() {
  return (
    <div className={`px-12`}>
      <SliderComponent />
      <p className="mt-8">Home / SmartPhone</p>
      <h1 className="text-3xl font-semibold">SmartPhones for you !</h1>
      <div className="flex mt-8 gap-6">
        <div className="basis-[20%] shadow-lg">
          <SortBar />
        </div>
        <div className="basis-[80%] grid grid-cols-4 gap-6">
          <CartComponent></CartComponent>
          <CartComponent></CartComponent>
          <CartComponent></CartComponent>
          <CartComponent></CartComponent>
          <CartComponent></CartComponent>
        </div>
      </div>
    </div>
  );
}

export default TypePage;
