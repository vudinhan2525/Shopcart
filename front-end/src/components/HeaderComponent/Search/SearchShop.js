import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import convertType from '../../../utils/convertType';
import { TagIcon } from '../../../utils/IconSVG';

function SearchShop({ searchShop }) {
  const [shopType, setShopType] = useState([]);
  useEffect(() => {
    if (searchShop && searchShop.length > 0) {
      let arr = [];
      searchShop.forEach((el, idx) => {
        let tmp = '';
        el.type.forEach((el2, id) => {
          const res = convertType(el2);
          tmp += res;
          if (id !== el.type.length - 1) {
            tmp += ',';
          }
        });
        arr.push(tmp);
      });
      setShopType(arr);
    }
  }, [searchShop]);
  return (
    <div>
      {searchShop.map((el, idx) => {
        return (
          <Link to={`/product/${el._id}`} key={idx} className="hover:bg-gray-100 transition-all flex px-4 py-1 gap-3">
            <div
              style={{ backgroundImage: `url(${el?.avatar})` }}
              className="h-[50px] min-w-[50px] w-[50px] bg-white border-[1px] bg-no-repeat bg-center bg-contain rounded-full"
            ></div>
            <div>
              <div className="flex item-center gap-2">
                <header className=" line-clamp-1 font-semibold">{el.name}</header>
                {el.isChecked && <FontAwesomeIcon icon={faCircleCheck} className="text-lg text-[#20D5EC] mt-1" />}
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <TagIcon height={'10px'} width={'10px'} />
                <p className="text-xs">{shopType[idx]}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SearchShop;
