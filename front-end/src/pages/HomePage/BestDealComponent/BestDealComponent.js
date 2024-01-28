import CartComponent from '../../../components/CartComponent/CartComponent';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../components/AuthProvider/AuthProvider';
import axios from 'axios';
import SkeletonItem from '../../../components/Skeleton/SkeletonItem';
const types = ['Gadgets', 'Fashion', 'Toys', 'Education', 'Beauty', 'Fitness', 'Furniture'];
const typeSend = ['gadget', 'clothes', 'toys', 'education', 'beauty', 'fitness', 'furniture'];
function BestDealComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState(1);
  const { userData, refreshUserData } = useContext(AuthContext);

  const getBestDealProd = async (a) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prods?type[in]=${a}&limit=8`);
      if (response.data.status === 'success') {
        setProducts(response.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
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
              className={`bg-gray-100 dark:bg-gray-800 dark:border-[0px] ${
                tab === idx + 1 && 'dark:bg-primary-dark-color bg-primary-color text-white'
              } border-[1px] border-gray-400  font-semibold cursor-pointer px-4 py-3 text-sm rounded-3xl`}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 mt-6 gap-6">
        {products.map((el, idx) => {
          if (isLoading) return <SkeletonItem key={idx} />;
          return (
            <CartComponent
              key={idx}
              product={el}
              userId={userData._id}
              userProducts={userData.products}
              userLikes={userData.likes}
              refreshUserData={refreshUserData}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BestDealComponent;
