import Payment from './Payment/Payment';
import AddressInfo from './AddressInfo/AddressInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderList from './OrderList/OrderList';
function OrderPage() {
  const [userData, setUserData] = useState({});
  const getUserData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users/me`, { withCredentials: true });
      if (response.data.status === 'success') {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="px-10">
      <p className="mt-5 mb-8">Home / Order</p>
      <div className="flex gap-6">
        <div className="basis-[65%]">
          <div className="border-[1px] border-gray-300 rounded-xl max-h-[802px] overflow-y-auto px-6 py-6">
            <header className="text-2xl font-semibold">Review Item And Shipping</header>
            <OrderList user={userData} />
          </div>
          <AddressInfo user={userData} />
        </div>
        <div className="basis-[35%] ">
          <div className="border-[1px] border-gray-300 rounded-xl px-6 py-6">
            <Payment />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
