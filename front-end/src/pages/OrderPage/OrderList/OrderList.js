import { useEffect } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProdList } from '../../../slice/product.slice';
function OrderList({ user }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productList);
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      dispatch(getProdList(user.products));
    }
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
