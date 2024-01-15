import CartComponent from '../CartComponent/CartComponent';
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';
import PaginateComponent from '../PaginateComponent/PaginateComponent';
import http from '../../utils/http';
function SuggestCart() {
  const { userData, refreshUserData } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [paginate, setPaginate] = useState(1);
  const [cntProd, setCntProd] = useState(1);
  const getSuggestProd = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prods?limit=8&page=${paginate}`);
      if (response.data.status === 'success') {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCountProds = async () => {
    try {
      const response = await http.get('prods/countProd');
      if (response.data.status === 'success') {
        setCntProd(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSuggestProd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginate]);
  useEffect(() => {
    getCountProds();
  }, []);
  return (
    <div>
      <h4 className="text-[26px] leading-[32px] font-bold ">Todays Best Deals For You! 🔥🔥🔥</h4>
      <div className="grid grid-cols-4 mt-6 gap-6 animate-slideTopDown">
        {products.map((el, idx) => {
          return (
            <CartComponent
              product={el}
              key={idx}
              refreshUserData={refreshUserData}
              userId={userData._id}
              userProducts={userData.products}
              userLikes={userData.likes}
            />
          );
        })}
      </div>
      <PaginateComponent paginate={paginate} cntProd={cntProd} setPaginate={setPaginate} />
    </div>
  );
}

export default SuggestCart;
