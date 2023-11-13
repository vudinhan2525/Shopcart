import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import img from '../../assets/img/user/avatar3d.jpg';
import { UserIcon, GearIcon, CartIcon, LocationIcon, MessageIcon } from '../../utils/IconSVG';
import { useState } from 'react';
import { MessageSetting, AccountSetting, AddressSetting, Setting } from './index';
const settingItems = [
  {
    text: 'My Account',
    icon: <UserIcon clx="w-7 h-7" />,
  },
  {
    text: 'Orders',
    icon: <CartIcon clx="w-7 h-7" />,
  },
  {
    text: 'Message',
    icon: <MessageIcon clx="w-7 h-7" />,
  },
  {
    text: 'Address',
    icon: <LocationIcon clx="w-7 h-7" />,
  },
  {
    text: 'Setting',
    icon: <GearIcon clx="w-7 h-7" />,
  },
];
const settingTemplate = [<AccountSetting />, <></>, <MessageSetting />, <AddressSetting />, <Setting />];
function SettingPage() {
  const [settingActive, setSettingActive] = useState(0);
  return (
    <div className="px-10">
      <div className="flex py-8 px-10">
        <div className="basis-[18%] ">
          <div className="flex items-center gap-2 cursor-pointer  group">
            <div>
              <div
                style={{ backgroundImage: `url(${img})` }}
                className="w-[70px] h-[70px] bg-no-repeat bg-center bg-contain rounded-full"
              ></div>
            </div>
            <div className="relative w-full">
              <header className="text-lg font-bold">An Vũ</header>
              <p className="text-xs text-gray-600">View profile</p>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-sm right-[3%] group-hover:right-0 top-[50%] transition-all translate-y-[-50%] absolute"
              />
            </div>
          </div>
          <div className="my-2 ">
            {settingItems.map((el, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (idx !== 1) setSettingActive(idx);
                  }}
                  className={` ${
                    settingActive === idx ? 'bg-gray-200' : 'hover:bg-gray-200'
                  }  rounded-2xl cursor-pointer transition-all flex items-center gap-3 pl-5 py-3 mt-1`}
                >
                  <div className="text-[#384853] ">{el.icon}</div>
                  <p className="text-[#384853] text-lg font-semibold">{el.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[1px] ml-5 bg-gray-300"></div>
        <div className="basis-[82%]">{settingTemplate[settingActive]}</div>
      </div>
    </div>
  );
}

export default SettingPage;
