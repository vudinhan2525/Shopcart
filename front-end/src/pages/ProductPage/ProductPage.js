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
  const [selectedFiles, setSelectedFiles] = useState(null);
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
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSendImage = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}prods/${param.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded:', response.data);
      // Handle successful upload response here
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error cases here
    }
  };
  return (
    <div className="px-12 ">
      <p className="mt-5 mb-8">{`Home / SmartPhones / ${product.name}`}</p>
      <div className="flex gap-4">
        <div className="basis-[60%]">
          <SliderProduct productImages={product.images} />
          <IntroduceProduct product={product} />
        </div>
        <div className="basis-[40%]">
          <InfoProduct product={product} />
          {product?.type?.includes('technology') && <DetailProduct />}
          <input multiple type="file" onChange={handleFileChange} className="mt-3"></input>
          <button onClick={handleSendImage} className="bg-primary-color block mt-3 px-4 py-2  text-white rounded-full">
            Save
          </button>
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
