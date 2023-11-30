import SliderProduct from './SliderProduct/SliderProduct';
import InfoProduct from './InfoProduct/InfoProduct';
import IntroduceProduct from './IntroduceProduct/IntroduceProduct';
import DetailProduct from './DetailProduct/DetailProduct';
import ReviewProduct from './ReviewProduct/ReviewProduct';
import ProductLastSeen from './ProductLastSeen/ProductLastSeen';
import RelatedProduct from './RelatedProduct/RelatedProduct';
import SkeletonSlider from '../../components/Skeleton/SkeletonSlider';
import SkeletonProd from '../../components/Skeleton/SkeletonProd';
import SkeletonShopProd from '../../components/Skeleton/SkeletonShopProd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
function ProductPage() {
  const param = useParams();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [prodLastSeen, setProdLastSeen] = useState([]);
  const getProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prods/${param.id}`, {
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        setProduct(response.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error.response);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const updateLastSeenProd = () => {
    let response = JSON.parse(localStorage.getItem('prodLastSeen'));
    if (!response) {
      localStorage.setItem('prodLastSeen', JSON.stringify({ data: [param.id] }));
    } else if (response.data.includes(param.id)) {
      const foundId = response.data.findIndex((el) => el === param.id);
      if (foundId > 0) {
        response.data.splice(foundId, 1);
        response.data.unshift(param.id);
        localStorage.setItem('prodLastSeen', JSON.stringify({ data: response.data }));
      }
    } else if (response.data.length < 5) {
      response.data.unshift(param.id);
      localStorage.setItem('prodLastSeen', JSON.stringify({ data: response.data }));
    } else if (response.data.length === 5) {
      response.data.unshift(param.id);
      response.data.pop();
      localStorage.setItem('prodLastSeen', JSON.stringify({ data: response.data }));
    }
    response = JSON.parse(localStorage.getItem('prodLastSeen'));
    setProdLastSeen(response.data);
  };
  useEffect(() => {
    getProduct();
    updateLastSeenProd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
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
          {isLoading ? <SkeletonSlider /> : <SliderProduct productImages={product.images} />}
          {isLoading ? <SkeletonShopProd /> : <IntroduceProduct product={product} />}
        </div>
        <div className="basis-[40%]">
          {isLoading ? (
            <>
              <SkeletonProd />
            </>
          ) : (
            <InfoProduct product={product} />
          )}
          {product?.type?.includes('technology') && <DetailProduct />}
          <input multiple type="file" onChange={handleFileChange} className="mt-3"></input>
          <button onClick={handleSendImage} className="bg-primary-color block mt-3 px-4 py-2  text-white rounded-full">
            Save
          </button>
        </div>
      </div>
      <ReviewProduct product={product} />
      <div className="mt-8">
        <RelatedProduct type={product.type} />
      </div>
      <div className="mt-8">
        <ProductLastSeen data={prodLastSeen} />
      </div>
    </div>
  );
}

export default ProductPage;
