import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TagIcon } from '../../../utils/IconSVG';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
function MostSellingStoreComponent() {
  const [shops, setShops] = useState([]);
  const getShop = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}shop?limit=4&isChecked=true`);
      if (response.data.status === 'success') {
        setShops(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getShop();
  }, []);
  return (
    <div>
      <header className="text-[26px] leading-[32px] font-bold mt-12">Best Selling Store</header>
      <div className="grid grid-cols-4 mt-6 gap-6">
        {shops.map((el, id) => {
          return (
            <div key={id}>
              <div className="">
                <div className="h-[250px] relative">
                  <div
                    style={{ backgroundImage: `url(${el.background})` }}
                    className="h-[220px]  w-full rounded-xl bg-no-repeat transition-all bg-center bg-cover border-[1px] border-gray-300"
                  ></div>
                  <div className="absolute bottom-0 left-[10%] border-[2px] border-white rounded-full">
                    <div
                      style={{ backgroundImage: `url(${el.avatar})` }}
                      className="h-[60px] w-[60px] rounded-full bg-no-repeat transition-all bg-center bg-contain"
                    ></div>
                  </div>
                </div>
                <div className="px-3">
                  <div className="flex items-center gap-2">
                    <header className="text-xl font-bold">{el.name}</header>
                    <FontAwesomeIcon icon={faCircleCheck} className="text-base text-[#20D5EC]" />
                  </div>
                  <p className="text-sm text-gray-800 h-[40px] mt-1 line-clamp-2">{el.summary}</p>
                  <div className="mt-1 flex items-center">
                    <TagIcon height={'14px'} width={'14px'} />
                    <p className="ml-2 text-xs text-gray-600">{el.type.join(' , ')}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MostSellingStoreComponent;
