import CartComponent from '../CartComponent/CartComponent';
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';
function SuggestCart() {
  const { userData } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const getSuggestProd = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prods?limit=5`);
      if (response.data.status === 'success') {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSuggestProd();
  }, []);
  return (
    <div>
      <h4 className="text-[26px] leading-[32px] font-bold ">Todays Best Deals For You! 🔥🔥🔥</h4>
      <div className="grid grid-cols-4 mt-6 gap-6">
        {products.map((el, idx) => {
          return <CartComponent product={el} key={idx} userId={userData._id} userProducts={userData.products} />;
        })}
      </div>
    </div>
  );
}

export default SuggestCart;
