import { useState } from 'react';
import CartComponent from '../../../components/CartComponent/CartComponent';
import { useEffect } from 'react';
import axios from 'axios';
function BestDealComponent() {
  const [products, setProducts] = useState([]);
  const getBestDealProd = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prods?type[in]=gadget&limit=8`);
      if (response.data.status === 'success') {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBestDealProd();
  }, []);
  return (
    <div>
      <header className="text-[26px] leading-[32px] font-bold mt-12">Todays Best Deals For You!</header>
      <div className="flex gap-4 mt-4">
        <div className="border-[1px] border-gray-400 font-semibold cursor-pointer active-ct px-4 py-3 text-sm rounded-3xl">
          Gadgets
        </div>
        <div className="border-[1px] border-gray-400 font-semibold cursor-pointer px-4 py-3 text-sm rounded-3xl">
          Fashion
        </div>
        <div className="border-[1px] border-gray-400 font-semibold cursor-pointer px-4 py-3 text-sm rounded-3xl">
          Toys
        </div>
        <div className="border-[1px] border-gray-400 font-semibold cursor-pointer px-4 py-3 text-sm rounded-3xl">
          Education
        </div>
        <div className="border-[1px] border-gray-400 font-semibold cursor-pointer px-4 py-3 text-sm rounded-3xl">
          Beauty
        </div>
        <div className="border-[1px] border-gray-400 font-semibold cursor-pointer px-4 py-3 text-sm rounded-3xl">
          Fitness
        </div>
        <div className="border-[1px] border-gray-400 font-semibold cursor-pointer px-4 py-3 text-sm rounded-3xl">
          Furniture
        </div>
      </div>
      <div className="grid grid-cols-4 mt-6 gap-6">
        {products.map((el, idx) => {
          return <CartComponent product={el} />;
        })}
      </div>
    </div>
  );
}

export default BestDealComponent;
