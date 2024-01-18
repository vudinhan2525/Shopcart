import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import StoreComponent from '../../../components/StoreComponent/StoreComponent';
function MostSellingStoreComponent() {
  const [shops, setShops] = useState([]);
  const getShop = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}shop?limit=4&isChecked=true`);
      if (response.data.status === 'success') {
        setShops(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getShop();
  }, []);
  return (
    <div>
      <header className="text-[26px] leading-[32px] font-bold pt-12 mb-4 ">Best Selling Store</header>
      <StoreComponent shops={shops}></StoreComponent>
    </div>
  );
}

export default MostSellingStoreComponent;
