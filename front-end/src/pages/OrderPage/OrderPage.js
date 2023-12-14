import Payment from './Payment/Payment';
import AddressInfo from './AddressInfo/AddressInfo';
import { useContext } from 'react';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';
import OrderList from './OrderList/OrderList';
function OrderPage() {
  const { userData, refreshUserData } = useContext(AuthContext);
  return (
    <div className="px-10">
      <p className="mt-5 mb-8">Home / Order</p>
      <div className="flex gap-6">
        <div className="basis-[65%]">
          <div className="border-[1px] border-gray-300 rounded-xl max-h-[802px] overflow-y-auto px-6 py-6">
            <header className="text-2xl font-semibold">Review Item And Shipping</header>
            <OrderList user={userData} refreshUserData={refreshUserData} />
          </div>
          <AddressInfo userData={userData} />
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
