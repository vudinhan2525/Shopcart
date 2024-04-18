import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { UserIcon, GearIcon, CartIcon, LocationIcon, MessageIcon, LogoutIcon, InvoiceIcon } from '../../utils/IconSVG';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';
import { Message, AccountSetting, AddressSetting, Setting, Saved, Invoice } from './index';
import { Link, useParams } from 'react-router-dom';
export const settingItems = [
  {
    text: 'My Account',
    icon: <UserIcon clx="w-7 h-7" />,
    link: '/setting/account',
  },
  {
    text: 'Orders',
    icon: <CartIcon clx="w-7 h-7" />,
    link: '/order',
  },
  {
    text: 'Invoices',
    icon: (
      <div className="ml-1">
        <InvoiceIcon fill={'#384853'} />
      </div>
    ),
    link: '/setting/invoice',
  },
  {
    text: 'Saved',
    icon: <FontAwesomeIcon icon={faBookmark} className="ml-1 mr-1 w-5 h-5" />,
    link: '/setting/saved',
  },
  {
    text: 'Message',
    icon: <MessageIcon clx="w-7 h-7" />,
    link: '/setting/message',
  },
  {
    text: 'Address',
    icon: <LocationIcon clx="w-7 h-7" />,
    link: '/setting/address',
  },
  {
    text: 'Setting',
    icon: <GearIcon clx="w-7 h-7" />,
    link: '/setting/settings',
  },
  {
    text: 'Logout',
    icon: <LogoutIcon clx="w-7 h-7" />,
  },
];

function SettingPage() {
  const param = useParams();
  const { userData, refreshUserData } = useContext(AuthContext);
  const [themeState, setThemeState] = useState(1);
  useEffect(() => {
    if (localStorage.getItem('config')) {
      const obj = JSON.parse(localStorage.getItem('config'));
      if (obj.mode === 'dark') {
        setThemeState(2);
      }
    }
  }, []);
  //if (!isLoggedIn) return <Navigate to={'/register'}></Navigate>;
  return (
    <div className="px-10 dark:bg-dark-ground">
      <div className="flex py-8 px-10 ">
        <div className="basis-[20%] ">
          <div className="flex items-center gap-2 cursor-pointer  group">
            <div>
              <div
                style={{ backgroundImage: `url(${userData.avatar})` }}
                className="w-[70px] h-[70px] bg-no-repeat bg-center bg-contain rounded-full"
              ></div>
            </div>
            <div className="relative dark:text-dark-text w-full">
              <header className="text-lg  font-bold">{userData.firstName + ' ' + userData.lastName}</header>
              <p className="text-xs text-gray-600 dark:text-gray-400">View profile</p>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-sm right-[3%] group-hover:right-0 top-[50%] transition-all translate-y-[-50%] absolute"
              />
            </div>
          </div>
          <div className="my-2 ">
            {settingItems.map((el, idx) => {
              if (idx === settingItems.length - 1) {
                return <div key={idx}></div>;
              }
              return (
                <Link
                  key={idx}
                  to={el.link}
                  className={` ${
                    el.link.includes(param.settingOpt)
                      ? 'bg-gray-200 dark:bg-gray-800'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                  }   rounded-2xl cursor-pointer transition-all flex items-center gap-3 pl-5 py-3 mt-1`}
                >
                  <div className="text-[#384853] dark:text-dark-text ">
                    {el.text !== 'Invoices' ? (
                      el.icon
                    ) : (
                      <>
                        {themeState === 1 && (
                          <div className="ml-1">
                            <InvoiceIcon fill={'#384853'} />
                          </div>
                        )}
                        {themeState === 2 && (
                          <div className="ml-1">
                            <InvoiceIcon fill={'#E4E6EB'} />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-[#384853] dark:text-dark-text text-lg font-semibold">{el.text}</p>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="w-[1px] ml-5 bg-gray-300 dark:bg-gray-700"></div>
        <div className="basis-[80%]">
          {param.settingOpt === 'account' && <AccountSetting userData={userData} />}
          {param.settingOpt === 'message' && <Message />}
          {param.settingOpt === 'invoice' && <Invoice userData={userData} />}
          {param.settingOpt === 'address' && <AddressSetting userData={userData} />}
          {param.settingOpt === 'settings' && <Setting themeState={themeState} setThemeState={setThemeState} />}
          {param.settingOpt === 'saved' && <Saved userData={userData} refreshUserData={refreshUserData} />}
        </div>
      </div>
    </div>
  );
}

export default SettingPage;
