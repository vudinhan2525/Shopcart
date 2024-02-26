import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SortBar from '../../components/SortBar/SortBar';
import { Button } from '@material-tailwind/react';
import http from '../../utils/http';
import PaginateComponent from '../../components/PaginateComponent/PaginateComponent';
import CartList from '../../components/CartList/CartList';
const initialSortObj = {
  newest: '0',
  price: '0',
};
function SearchPage() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [paginate, setPaginate] = useState(1);
  const [filterObj, setFilterObj] = useState({
    priceMax: 1000,
    priceMin: 0,
    rating: 0,
  });
  const [sortObj, setSortObj] = useState(initialSortObj);
  const [activeSort, setActiveSort] = useState(0);
  useEffect(() => {
    getProd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  const getProd = async () => {
    try {
      const response = await http.get(`/search/searchFuzzy/${params.keyword}`);
      if (response.data.status === 'success') {
        const prodArr = [];
        response.data.data.forEach((el, idx) => {
          prodArr.push(el._id);
        });
        setProducts(prodArr);
      }
    } catch (error) {}
  };
  return (
    <div className="px-10">
      <div className="flex gap-6 pt-8">
        <div className="basis-[20%]">
          <div className="shadow-lg bg-white dark:bg-dark-flat rounded-lg">
            <SortBar setFilterObj={setFilterObj} />
          </div>
        </div>
        <div className="basis-[80%]">
          <header className="text-3xl font-bold">{`Results for '${params.keyword}'`}</header>
          <div className="w-[full] mt-4 text-gray-700 py-3 flex gap-3 items-center px-6 rounded-xl border-[1px] bg-[#EDEDED] border-gray-300">
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
          <div>
            <CartList filter={filterObj} sortBy={sortObj} shopProducts={products} />
            <PaginateComponent cntProd={products.length} paginate={paginate} setPaginate={setPaginate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
