import { useEffect } from 'react';
import CartComponent from '../../../components/CartComponent/CartComponent';
import axios from 'axios';
import SkeletonItem from '../../../components/Skeleton/SkeletonItem';
import { useState } from 'react';
function RelatedProduct({ type, userData, refreshUserData }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRelatedProd = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prods?type[in]=${type.join(',')}&limit=5`);
      if (response.data.status === 'success') {
        setProducts(response.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    if (type && type.length > 0) {
      getRelatedProd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  return (
    <div>
      <h4 className="text-[26px] leading-[32px] font-bold ">Related products</h4>
      <div className="grid grid-cols-5 mt-6 gap-4">
        {products.map((el, idx) => {
          if (isLoading) return <SkeletonItem key={idx} />;
          return (
            <CartComponent
              key={idx}
              isSmall={true}
              product={el}
              refreshUserData={refreshUserData}
              userId={userData._id}
              userProducts={userData.products}
              userLikes={userData.likes}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RelatedProduct;
