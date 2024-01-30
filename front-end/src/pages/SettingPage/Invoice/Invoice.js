import { useEffect, useState } from 'react';
import http from '../../../utils/http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function Invoice({ userData }) {
  const [billData, setBillData] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      getBill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  useEffect(() => {
    if (billData && billData.length > 0) {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billData]);
  const getBill = async () => {
    try {
      const response = await http.get(`/bill/${userData._id}`);
      if (response.data.status === 'success') {
        setBillData(response.data.data);
      }
    } catch (error) {}
  };
  const getProducts = async () => {
    try {
      let prodArr = [];

      billData.forEach((el) => {
        prodArr.push(el.products.product);
      });
      const response = await http.post(`prods/getRelatedProd`, { data: prodArr });
      if (response.data.status === 'success') {
        setProducts(response.data.data);
      }
    } catch (error) {}
  };
  return (
    <div className="px-10 py-10">
      <header className="text-2xl font-bold">Invoices</header>
      <div>
        {products.map((el, idx) => {
          return (
            <div className="px-6 py-4 border-[1px] border-gray-400 rounded-xl mt-4" key={idx}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-500">{`BillID:  ${billData[idx]._id.slice(13).toUpperCase()}`}</div>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faTruck} className="text-primary-dark-color" />
                  <p className="text-sm text-primary-dark-color">
                    {billData[idx].status === 'pending'
                      ? 'Order is being delivered'
                      : 'The order has been delivered successfully'}
                  </p>
                  <div className="bg-gray-300 w-[1px] h-[20px]"></div>
                  <p className="text-orange-600 font-semibold ">
                    {billData[idx].status === 'pending' ? 'PENDING' : 'COMPLETED'}
                  </p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-300 my-2"></div>
              <Link to={`/product/${el._id}`} className="flex gap-4">
                <div
                  style={{ backgroundImage: `url(${el?.images[0]})` }}
                  className="h-[80px] w-[80px] bg-no-repeat bg-center  bg-contain rounded-lg"
                ></div>
                <div className="basis-[75%]">
                  <p className="text-lg font-semibold">{el.name}</p>
                  <div className="text-sm text-gray-700">{`x${billData[idx].products.quantity}`}</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-semibold">{`$${el.price * billData[idx].products.quantity}`}</p>
                </div>
              </Link>
              <div className="w-full h-[1px] bg-gray-300 my-2"></div>
              <div className="flex gap-1 justify-end  items-center mr-[20px]">
                <p className="text-base font-medium">Total: </p>
                <p className="text-xl font-semibold text-orange-800">{`${billData[idx].products.price}$`}</p>
              </div>
              <div className="flex justify-end gap-4 mt-2">
                <Link
                  to={`/product/${el._id}?rating=1`}
                  className="px-4 py-2 bg-orange-600 text-white text-sm cursor-pointer rounded-lg"
                >
                  Rating
                </Link>
                <div className="px-4 py-2 border-[1px] border-gray-400 text-sm cursor-pointer rounded-lg">
                  Contact Seller
                </div>
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Invoice;
