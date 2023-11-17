import SliderProduct from './SliderProduct/SliderProduct';
import InfoProduct from './InfoProduct/InfoProduct';
import IntroduceProduct from './IntroduceProduct/IntroduceProduct';
import DetailProduct from './DetailProduct/DetailProduct';
import ReviewProduct from './ReviewProduct/ReviewProduct';
import CartComponent from '../../components/CartComponent/CartComponent';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
function ProductPage() {
  const param = useParams();
  const [product, setProduct] = useState({});
  const getProduct = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prods/${param.id}`, {
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="px-12 ">
      <p className="mt-5 mb-8">{`Home / SmartPhones / ${product.name}`}</p>
      <div className="flex gap-4">
        <div className="basis-[60%]">
          <SliderProduct />
          <IntroduceProduct product={product} />
        </div>
        <div className="basis-[40%]">
          <InfoProduct product={product} />
          {product?.type?.includes('technology') && <DetailProduct />}
        </div>
      </div>
      <ReviewProduct product={product} />
      <div className="mt-8">
        <h4 className="text-[26px] leading-[32px] font-bold ">Related products</h4>
        <div className="grid grid-cols-5 mt-6 gap-4">
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-[26px] leading-[32px] font-bold ">Products you last seen</h4>
        <div className="grid grid-cols-5 mt-6 gap-4">
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
          <CartComponent isSmall={true} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
