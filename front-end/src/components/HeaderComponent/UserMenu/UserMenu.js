import { Link } from 'react-router-dom';
import img from '../../../assets/img/user/avatar3d.jpg';
import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { useState } from 'react';
import { settingItems } from '../../../pages/SettingPage/SettingPage';
function UserMenu({ userData, setShowLogoutModal }) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div>
      <Menu open={openMenu} handler={setOpenMenu} allowHover>
        <MenuHandler>
          <Link
            to={'/setting/account'}
            className="select-none flex justify-center items-center gap-2 cursor-pointer pl-2 pr-3 py-1 text-[15px] rounded-full transition-all hover:bg-gray-200"
          >
            <div
              className="w-[40px] h-[40px] bg-no-repeat bg-center bg-contain rounded-full"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
            <p className="w-[60px] h-[20px] line-clamp-1">{userData.firstName + ' ' + userData.lastName}</p>
          </Link>
        </MenuHandler>
        <MenuList className="font-OpenSans">
          {settingItems.map((el, idx) => {
            return (
              <MenuItem key={idx} className="px-0 py-0">
                <Link
                  to={idx !== settingItems.length - 1 && el.link}
                  className="px-2 py-2 flex items-center gap-2 transition-all"
                  onClick={() => {
                    if (idx === settingItems.length - 1) {
                      setShowLogoutModal(true);
                    }
                  }}
                >
                  <div className="text-[#384853]">{el.icon}</div>
                  <div className="text-[#384853] text-base font-semibold">{el.text}</div>
                </Link>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </div>
  );
}

export default UserMenu;
