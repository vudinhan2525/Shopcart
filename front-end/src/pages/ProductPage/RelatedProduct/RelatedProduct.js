import { useEffect } from 'react';
import CartComponent from '../../../components/CartComponent/CartComponent';
import axios from 'axios';
import { useState } from 'react';
function RelatedProduct({ type }) {
  const [products, setProducts] = useState([]);
  const getRelatedProd = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prods?type[in]=${type.join(',')}&limit=5`);
      if (response.data.status === 'success') {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (type && type.length > 0) {
      getRelatedProd();
    }
  }, [type]);
  return (
    <div>
      <h4 className="text-[26px] leading-[32px] font-bold ">Related products</h4>
      <div className="grid grid-cols-5 mt-6 gap-4">
        {products.map((el, idx) => {
          return <CartComponent key={idx} isSmall={true} product={el} />;
        })}
      </div>
    </div>
  );
}

export default RelatedProduct;
