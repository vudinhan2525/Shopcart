import CartComponent from '../../components/CartComponent/CartComponent';
import SortBar from '../../components/SortBar/SortBar';
import SliderComponent from '../../components/Slider/SliderComponent';
import ProductLastSeen from '../ProductPage/ProductLastSeen/ProductLastSeen';
import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import PaginateComponent from '../../components/PaginateComponent/PaginateComponent';
import http from '../../utils/http';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import convertType from '../../utils/convertType';
const initialSortObj = {
  newest: '0',
  price: '0',
};
function TypePage() {
  const { userData, refreshUserData } = useContext(AuthContext);
  const scrollRef = useRef(null);
  const param = useParams();
  const [prodLastSeen, setProdLastSeen] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterObj, setFilterObj] = useState({
    priceMax: 1000,
    priceMin: 0,
    rating: 0,
  });
  const [sortObj, setSortObj] = useState(initialSortObj);
  const [activeSort, setActiveSort] = useState(0);
  const [paginate, setPaginate] = useState(1);
  const [cntProd, setCntProd] = useState(1);
  const [breadProps, setBreadProps] = useState('');

  const getProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}prods/getProdType?limit=8&page=${paginate}&price[lte]=${
          filterObj.priceMax
        }&price[gte]=${filterObj.priceMin}&avgRatings[gte]=${filterObj.rating}${
          sortObj.newest !== '0' ? '&sort=-dateUp' : ''
        }${sortObj.price !== '0' ? `&sort=${sortObj.price === '-1' ? '-' : ''}price` : ''}`,
        { data: param.types.split(',') },
      );
      if (response.data.status === 'success') {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCountProds = async () => {
    try {
      const response = await http.get(`prods/countProd?types=${param.types}`);
      if (response.data.status === 'success') {
        setCntProd(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getBreadProps = () => {
    const types = param.types.split(',');
    let ans = '';
    for (let i = 0; i < types.length; i++) {
      ans += convertType(types[i]);
      if (i !== types.length - 1) {
        ans += ',';
      }
    }
    setBreadProps(ans);
  };
  useEffect(() => {
    let response = JSON.parse(localStorage.getItem('prodLastSeen'));
    setProdLastSeen(response.data);

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  useEffect(() => {
    getCountProds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  useEffect(() => {
    if (filterObj && Object.keys(filterObj).length > 0 && sortObj && Object.keys(sortObj).length > 0) {
      getProduct();
      getBreadProps();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, filterObj, sortObj, paginate]);
  return (
    <div className="">
      <SliderComponent />
      <div className={`px-12 dark:text-dark-text dark:bg-dark-ground`} ref={scrollRef}>
        <div className="pt-8">
          <BreadCrumbs props={['Home', breadProps]} route={['/']} />
        </div>
        <h1 className="text-3xl font-semibold">{`${
          breadProps.split(',')[breadProps.split(',').length - 1]
        } for you !`}</h1>
        <div className="flex mt-8 gap-6">
          <div className="basis-[20%] shadow-lg bg-white dark:bg-dark-flat rounded-lg">
            <SortBar setFilterObj={setFilterObj} />
          </div>
          <div className="basis-[80%] ">
            <div className="w-[full] text-gray-700 py-3 flex gap-3 items-center px-6 rounded-xl border-[1px] bg-[#EDEDED] border-gray-300">
              <header>Sort by:</header>
              <Button
                onClick={() => {
                  setSortObj(initialSortObj);
                  setActiveSort(0);
                }}
                className="px-4 font-OpenSans shadow-none hover:shadow-none"
                color={activeSort === 0 ? 'deep-orange' : 'white'}
              >
                Best Selling
              </Button>
              <Button
                onClick={() => {
                  setSortObj((prev) => {
                    return { price: '0', newest: '-1' };
                  });
                  setActiveSort(1);
                }}
                className="px-4 font-OpenSans shadow-none hover:shadow-none"
                color={activeSort === 1 ? 'deep-orange' : 'white'}
              >
                Newest
              </Button>
              <Button
                onClick={() => {
                  setSortObj((prev) => {
                    return { newest: '0', price: '-1' };
                  });
                  setActiveSort(2);
                }}
                className="px-4 font-OpenSans shadow-none hover:shadow-none"
                color={activeSort === 2 ? 'deep-orange' : 'white'}
              >
                Price: High-Low
              </Button>
              <Button
                onClick={() => {
                  setSortObj((prev) => {
                    return { newest: '0', price: '1' };
                  });
                  setActiveSort(3);
                }}
                className="px-4 font-OpenSans shadow-none hover:shadow-none"
                color={activeSort === 3 ? 'deep-orange' : 'white'}
              >
                Price: Low-High
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {products.map((el, idx) => {
                return (
                  <CartComponent
                    product={el}
                    key={idx}
                    isSmall={true}
                    userId={userData._id}
                    userProducts={userData.products}
                    refreshUserData={refreshUserData}
                    userLikes={userData.likes}
                  ></CartComponent>
                );
              })}
            </div>
            <PaginateComponent cntProd={cntProd} paginate={paginate} setPaginate={setPaginate} />
          </div>
        </div>
        <div className="mt-10">
          <ProductLastSeen data={prodLastSeen} userData={userData} refreshUserData={refreshUserData} />
        </div>
      </div>
    </div>
  );
}

export default TypePage;
