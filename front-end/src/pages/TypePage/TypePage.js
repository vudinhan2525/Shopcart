import Slider1 from '../../components/Slider/slider1';
import CartComponent from '../../components/CartComponent/CartComponent';
import SortBar from '../../components/SortBar/SortBar';
function TypePage() {
  return (
    <div className={`px-12`}>
      <Slider1 />
      <p className="mt-8">Home / Iphone</p>
      <h1 className="text-3xl font-semibold">Iphones for you !</h1>
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
