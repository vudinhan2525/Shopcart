import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TagIcon } from '../../utils/IconSVG';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function StoreComponent({ shops, isSmall }) {
  const [shop, setShop] = useState([]);
  useEffect(() => {
    if (shops && shops.length > 0) {
      setShop(shops);
    }
  }, [shops]);
  return (
    <div className="w-full">
      <div className={`grid gap-6 ${isSmall ? 'grid-cols-3' : 'grid-cols-4'}`}>
        {shop.map((el, id) => {
          return (
            <Link to={`/shop/${el._id}`} key={id}>
              <div className="dark:text-dark-text dark:bg-dark-flat pb-4 rounded-lg">
                <div className="h-[250px] relative">
                  <div
                    style={{ backgroundImage: `url(${el.background})` }}
                    className="h-[220px]  w-full rounded-xl bg-no-repeat transition-all bg-center bg-cover border-[1px] border-gray-300"
                  ></div>
                  <div className="absolute bottom-0 left-[10%] border-[2px] border-white dark:border-dark-flat rounded-full">
                    <div
                      style={{ backgroundImage: `url(${el.avatar})` }}
                      className="h-[60px] w-[60px] rounded-full bg-no-repeat transition-all bg-center bg-contain"
                    ></div>
                  </div>
                </div>
                <div className="px-4 ">
                  <div className="flex items-center gap-2">
                    <header className="text-xl font-bold h-[28px] line-clamp-1">{el.name}</header>
                    <FontAwesomeIcon icon={faCircleCheck} className="text-base text-[#20D5EC]" />
                  </div>
                  <p className="text-sm text-gray-800 h-[40px] mt-1 line-clamp-2 dark:text-gray-500">{el.summary}</p>
                  <div className="mt-1 flex items-center">
                    <TagIcon height={'14px'} width={'14px'} />
                    <p className="ml-2 text-xs text-gray-600">{el.type.join(' , ')}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default StoreComponent;
