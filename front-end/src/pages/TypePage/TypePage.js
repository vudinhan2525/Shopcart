import CartComponent from '../../components/CartComponent/CartComponent';
import SortBar from '../../components/SortBar/SortBar';
import SliderComponent from '../../components/Slider/SliderComponent';
import ProductLastSeen from '../ProductPage/ProductLastSeen/ProductLastSeen';
import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';
import axios from 'axios';

function TypePage() {
  const { userData } = useContext(AuthContext);
  const scrollRef = useRef(null);
  const param = useParams();
  const [prodLastSeen, setProdLastSeen] = useState([]);
  const [products, setProducts] = useState([]);
  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}prods/getProdType?types=${param.types}&limit=8`,
      );
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let response = JSON.parse(localStorage.getItem('prodLastSeen'));
    setProdLastSeen(response.data);
    getProduct();
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return (
    <div className="">
      <SliderComponent />
      <div className={`px-12`} ref={scrollRef}>
        <p className="mt-8">Home / SmartPhone</p>
        <h1 className="text-3xl font-semibold">SmartPhones for you !</h1>
        <div className="flex mt-8 gap-6">
          <div className="basis-[20%] shadow-lg bg-white">
            <SortBar />
          </div>
          <div className="basis-[80%] ">
            <div className="grid grid-cols-4 gap-4">
              {products.map((el, idx) => {
                return (
                  <CartComponent
                    product={el}
                    key={idx}
                    isSmall={true}
                    userId={userData._id}
                    userProducts={userData.products}
                  ></CartComponent>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <ProductLastSeen data={prodLastSeen} />
        </div>
      </div>
    </div>
  );
}

export default TypePage;
