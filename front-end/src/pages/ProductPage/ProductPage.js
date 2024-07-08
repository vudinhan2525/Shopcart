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
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import convertType from '../../utils/convertType';
function ProductPage() {
  const param = useParams();
  const { userData, refreshUserData, setShowLoginModal } = useContext(AuthContext);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [prodLastSeen, setProdLastSeen] = useState([]);
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const getProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}prods/${param.id}`, {
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        setProduct(response.data.data);
        getBreadCrumbsProps(response.data.data);
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
  const getBreadCrumbsProps = (product) => {
    let ans = '';
    for (let i = 0; i < product.type.length; i++) {
      ans += convertType(product.type[i]);
      if (i !== product.type.length - 1) {
        ans += ',';
      }
    }
    setBreadCrumbs(ans);
  };
  useEffect(() => {
    getProduct();
    updateLastSeenProd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  return (
    <div className="px-12 dark:text-dark-text dark:bg-dark-ground">
      <div className="pt-5 mb-8">
        <BreadCrumbs props={['Home', breadCrumbs, product.name]} route={['/', `/type/${product.type?.join(',')}`]} />
      </div>
      <div className="flex gap-4">
        <div className="basis-[60%]">
          {isLoading ? <SkeletonSlider /> : <SliderProduct productImages={product.images} />}
          {isLoading ? (
            <SkeletonShopProd />
          ) : (
            <IntroduceProduct
              setShowLoginModal={setShowLoginModal}
              userData={userData}
              refreshUserData={refreshUserData}
              product={product}
            />
          )}
        </div>
        <div className="basis-[40%]">
          {isLoading ? (
            <>
              <SkeletonProd />
            </>
          ) : (
            <InfoProduct
              product={product}
              userData={userData}
              setShowLoginModal={setShowLoginModal}
              refreshUserData={refreshUserData}
            />
          )}
          {product?.type?.includes('technology') && <DetailProduct />}
        </div>
      </div>
      <ReviewProduct product={product} />
      <div className="mt-8">
        <RelatedProduct
          setShowLoginModal={setShowLoginModal}
          type={product.type}
          userData={userData}
          refreshUserData={refreshUserData}
        />
      </div>
      <div className="mt-8">
        <ProductLastSeen
          setShowLoginModal={setShowLoginModal}
          data={prodLastSeen}
          userData={userData}
          refreshUserData={refreshUserData}
        />
      </div>
    </div>
  );
}

export default ProductPage;
