import { useState } from 'react';
import CartComponent from '../../../components/CartComponent/CartComponent';
import { useEffect } from 'react';
import axios from 'axios';
const types = ['Gadgets', 'Fashion', 'Toys', 'Education', 'Beauty', 'Fitness', 'Furniture'];
const typeSend = ['gadget', 'clothes', 'toys', 'education', 'beauty', 'fitness', 'furniture'];
function BestDealComponent() {
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState(1);
  const getBestDealProd = async (a) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prods?type[in]=${a}&limit=8`);
      if (response.data.status === 'success') {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBestDealProd('gadget');
  }, []);
  return (
    <div>
      <header className="text-[26px] leading-[32px] font-bold mt-12">Todays Best Deals For You!</header>
      <div className="flex gap-4 mt-4">
        {types.map((el, idx) => {
          return (
            <div
              onClick={() => {
                setTab(idx + 1);
                getBestDealProd(typeSend[idx]);
              }}
              key={idx}
              className={`${
                tab === idx + 1 && 'active-ct'
              } border-[1px] border-gray-400 font-semibold cursor-pointer px-4 py-3 text-sm rounded-3xl`}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 mt-6 gap-6">
        {products.map((el, idx) => {
          return <CartComponent key={idx} product={el} />;
        })}
      </div>
    </div>
  );
}

export default BestDealComponent;
