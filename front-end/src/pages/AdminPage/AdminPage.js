import { Link, useParams } from 'react-router-dom';
import { ShopIcon, MessageIcon } from '../../utils/IconSVG';
import Shop from './Shop/Shop';
import ShopDetail from './Shop/ShopDetail';
import { useContext } from 'react';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';
import MessageBox from './MessageBox/MessageBox';
const adminItems = [
  {
    text: 'Shop',
    icon: <ShopIcon clx="w-10 h-10" />,
    link: '/admin/shop',
  },
  {
    text: 'Message',
    icon: <MessageIcon clx="w-6 h-6" />,
    link: '/admin/message',
  },
];
function AdminPage() {
  const param = useParams();
  const { userData } = useContext(AuthContext);
  return (
    <div className="px-10 dark:bg-dark-ground">
      <div className="flex py-4 gap-8">
        <div className="basis-[18%] ">
          <div className="my-2 ">
            {adminItems.map((el, idx) => {
              return (
                <Link
                  key={idx}
                  to={el.link}
                  className={` ${
                    el.link.includes(param.adminOpt)
                      ? 'bg-gray-200 dark:bg-gray-800'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                  }   rounded-2xl cursor-pointer transition-all flex items-center gap-3 pl-5 py-3 mt-1`}
                >
                  <div className="text-[#384853] dark:text-dark-text ">{el.icon}</div>
                  <p className="text-[#384853] dark:text-dark-text text-lg font-semibold">{el.text}</p>
                </Link>
              );
            })}
          </div>
        </div>
        {/* <div className="w-[1px] ml-5 bg-gray-300 dark:bg-gray-700"></div> */}
        <div className="basis-[82%]">
          {param.adminOpt === 'shop' && <Shop userData={userData} />}
          {param.adminOpt === 'message' && <MessageBox />}
          {param.shopId && <ShopDetail />}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
