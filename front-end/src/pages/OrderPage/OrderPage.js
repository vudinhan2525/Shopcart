import Payment from './Payment/Payment';
import AddressInfo from './AddressInfo/AddressInfo';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';
import OrderList from './OrderList/OrderList';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import http from '../../utils/http';
function OrderPage() {
  const { userData, refreshUserData } = useContext(AuthContext);
  const [addressSelected, setAddressSelected] = useState({});
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(0);
  const [prodSelected, setProdSelected] = useState({ _id: 'none', price: 0, quantity: 0 });
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0 && isLoading === false) {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  const getProducts = async () => {
    try {
      setIsLoading(true);
      let prodArr = [];
      for (let i = 0; i < userData.products.length; i++) {
        prodArr.push(userData.products[i].productId);
      }
      const response = await http.post('/prods/getRelatedProd', { data: prodArr }, { withCredentials: true });
      if (response.data.status === 'success') {
        const prods = response.data.data;
        for (let i = 0; i < userData.products.length; i++) {
          prods[i].quantity = userData.products[i].quantity;
        }
        setProducts(prods);
      }
      setIsLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    if (products && products.length > 0) {
      if (selected === -1) {
        setProdSelected({ _id: 'none', price: 0, quantity: 0 });
      } else {
        const newProd = { ...products[selected] };
        setProdSelected(newProd);
      }
    }
  }, [products, selected]);
  return (
    <div className="px-10 dark:text-dark-text dark:bg-dark-ground">
      <div className="pt-5 mb-8">
        <BreadCrumbs props={['Home', 'Order']} route={['/']} />
      </div>
      <div className="flex gap-6">
        <div className="basis-[65%]">
          <div className="border-[1px] border-gray-300 dark:border-gray-600 rounded-xl px-6 py-6">
            <header className="text-2xl font-semibold">Review Item And Shipping</header>
            <OrderList
              selected={selected}
              setSelected={setSelected}
              isLoading={isLoading}
              setProducts={setProducts}
              products={products}
              userData={userData}
              refreshUserData={refreshUserData}
            />
          </div>
          <AddressInfo userData={userData} setAddressSelected={setAddressSelected} />
        </div>
        <div className="basis-[35%] ">
          <div className="border-[1px] border-gray-300 dark:border-gray-600 rounded-xl px-6 py-6">
            <Payment
              prodSelected={prodSelected}
              setProdSelected={setProdSelected}
              addressSelected={addressSelected}
              userData={userData}
              refreshUserData={refreshUserData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
