import { useEffect, useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import axios from 'axios';
function OrderList({ user }) {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}prods/getRelatedProd`, {
        data: user.products,
      });
      if (response.data.status === 'success') {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="mt-6 flex flex-col gap-6 ">
      {products.map((el, idx) => (
        <OrderItem key={idx} product={el} />
      ))}
    </div>
  );
}

export default OrderList;
