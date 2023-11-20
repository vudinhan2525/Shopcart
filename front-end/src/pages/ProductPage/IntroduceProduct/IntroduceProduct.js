import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/img/shop/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserIcon, StarDefault } from '../../../utils/IconSVG';
import IntroducePost from './IntroducePost/IntroducePost';
import { ChevronDown } from '../../../utils/IconSVG';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function IntroduceProduct({ product }) {
  const [detailProd, setDetailProd] = useState({});
  const [shop, setShop] = useState({});
  const getDetailProd = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}detailprods/${product.details}`, {
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        setDetailProd(response.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const getShop = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}shop/${product.shop}`, {
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        setShop(response.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    if (product && Object.keys(product).length !== 0) {
      getDetailProd();
      getShop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  return (
    <div className=" w-full bg-white rounded-xl mt-10 border-[1px] py-7 px-7 overflow-hidden relative">
      <div className="flex gap-4">
        <div>
          <div
            style={{ backgroundImage: `url(${shop.avatar})` }}
            className="w-[120px] h-[120px] bg-no-repeat bg-center bg-contain rounded-full"
          ></div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <header className="text-2xl font-semibold">{shop.name}</header>
            {shop.isChecked && <FontAwesomeIcon icon={faCircleCheck} className="text-lg text-[#20D5EC]" />}
          </div>
          <p className="mt-1">{shop.summary}</p>
          <p className="mt-2 text-sm text-gray-500">Last active: 6 minutes ago</p>
          <div className="flex gap-10 mt-1">
            <div className="flex items-center gap-1">
              <div className="w-[18px] h-[18px]">
                <UserIcon width="18px" height="18px" />
              </div>
              <p className="text-sm">{`Followers: ${shop.followers}k`}</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-[18px] h-[18px]">
                <StarDefault />
              </div>
              <p className="text-sm">{`Average Rating: ${shop.averageRating}`}</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="mt-2 text-white cursor-pointer bg-primary-color border-[1.5px] border-primary-color w-[120px] text-center rounded-full py-2 hover:opacity-90 transition-all">
              Follow
            </div>
            <div className="mt-2 text-primary-color cursor-pointer bg-white border-[1.5px] border-primary-color w-[120px] text-center rounded-full py-2 hover:bg-primary-color hover:text-white transition-all">
              Chat Now
            </div>
          </div>
        </div>
      </div>
      <IntroducePost product={detailProd} />
      <div className="absolute bottom-0 w-[100%] h-[30px] linear-ct"></div>
      <div className="absolute bottom-[0px] cursor-pointer flex border-2 translate-x-[-50%] left-[50%] mx-auto w-[120px] text-center rounded-full bg-white ">
        <div className="flex items-center mx-auto">
          <div className="py-[6px]">More</div>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

export default IntroduceProduct;
