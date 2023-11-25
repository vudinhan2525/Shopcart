import CartComponent from '../../components/CartComponent/CartComponent';
import SortBar from '../../components/SortBar/SortBar';
import SliderComponent from '../../components/Slider/SliderComponent';
import ProductLastSeen from '../ProductPage/ProductLastSeen/ProductLastSeen';
import { useEffect, useState } from 'react';
function TypePage() {
  const [prodLastSeen, setProdLastSeen] = useState([]);
  useEffect(() => {
    let response = JSON.parse(localStorage.getItem('prodLastSeen'));
    setProdLastSeen(response.data);
  }, []);
  return (
    <>
      <SliderComponent />
      <div className={`px-12`}>
        <p className="mt-8">Home / SmartPhone</p>
        <h1 className="text-3xl font-semibold">SmartPhones for you !</h1>
        <div className="flex mt-8 gap-6">
          <div className="basis-[20%] shadow-lg bg-white">
            <SortBar />
          </div>
          <div className="basis-[80%] grid grid-cols-4 gap-4">
            <CartComponent isSmall={true}></CartComponent>
            <CartComponent isSmall={true}></CartComponent>
            <CartComponent isSmall={true}></CartComponent>
            <CartComponent isSmall={true}></CartComponent>
            <CartComponent isSmall={true}></CartComponent>
            <CartComponent isSmall={true}></CartComponent>
          </div>
        </div>
        <div className="mt-10">
          <ProductLastSeen data={prodLastSeen} />
        </div>
      </div>
    </>
  );
}

export default TypePage;
