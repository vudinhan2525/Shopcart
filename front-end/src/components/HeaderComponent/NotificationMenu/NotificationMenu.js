import { useEffect, useRef, useState } from 'react';
import { BellIcon } from '../../../utils/IconSVG/index';
import { Menu, MenuHandler, MenuList, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import GeneralNoti from './GeneralNoti';
import http from '../../../utils/http';
const data = [
  {
    label: 'General',
    value: 'general',
  },
];
function NotificationMenu({ userData }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeTab, setActiveTab] = useState(data[0].value);
  const [notiGeneral, setNotiGeneral] = useState([]);
  const childRef = useRef();
  const getAllNoti = async () => {
    let arr = [];
    userData.notifications.forEach((el, idx) => {
      arr.push(el.notiId);
    });
    try {
      const response = await http.post(`/noti/getRelatedNoti`, { data: arr });
      if (response.data.status === 'success') {
        setNotiGeneral(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      getAllNoti();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Menu
      placement="bottom-end"
      open={openMenu}
      allowHover
      handler={setOpenMenu}
      dismiss={{
        itemPress: false,
        isRequired: {},
      }}
    >
      <MenuHandler>
        <div className="dark:text-dark-text relative dark:hover:text-black ml-2 cursor-pointer px-3 py-3 rounded-full transition-all hover:bg-gray-200">
          <BellIcon width="26px" height="26px" />
          <div className="absolute rounded-full text-sm bg-orange-600 px-2 top-0 right-0 font-semibold text-dark-text">
            {userData &&
              userData.notifications.reduce((acc, cur) => {
                if (cur.isRead === false) return (acc += 1);
                else return acc;
              }, 0)}
          </div>
        </div>
      </MenuHandler>
      <MenuList className="text-black  font-OpenSans w-[450px] py-4 px-0 outline-none">
        <div className=" flex justify-between items-end outline-none px-3">
          <p className="font-semibold text-base">Notifications</p>
          <div
            onClick={() => childRef.current.readAllNoti()}
            className="font-medium text-gray-700 hover:text-black cursor-pointer"
          >
            Mark all as read
          </div>
        </div>
        <Tabs id="custom-animation " value={activeTab} className="outline-none font-OpenSans">
          <TabsHeader
            className=" rounded-none mt-2 border-b border-blue-gray-50 bg-transparent p-0 px-3"
            indicatorProps={{
              className: 'bg-transparent border-b-[0px] border-gray-900 shadow-none rounded-none',
            }}
          >
            {data.map((el, idx) => {
              return (
                <Tab
                  className="pl-0 mr-2 reset-width-ct"
                  key={el.value}
                  value={el.value}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(el.value);
                  }}
                >
                  <div className="font-OpenSans  flex items-center gap-1">
                    <p className={`text-sm font-semibold ${el.value === activeTab ? 'text-black' : 'text-gray-700'}`}>
                      {el.label}
                    </p>
                    {idx === 1 && (
                      <div className="text-xs w-[25px] h-[18px] text-white rounded-full leading-[18px] bg-red-700">
                        {userData.notifications.reduce((acc, cur) => {
                          if (cur.isRead === false) return (acc += 1);
                          else return acc;
                        }, 0)}
                      </div>
                    )}
                  </div>
                </Tab>
              );
            })}
          </TabsHeader>
          <TabsBody>
            {data.map((el) => {
              return (
                <TabPanel key={el.value} value={el.value} className="px-0 font-OpenSans font-medium">
                  {el.value === 'general' && (
                    <GeneralNoti getAllNoti={getAllNoti} ref={childRef} userData={userData} notiGeneral={notiGeneral} />
                  )}
                </TabPanel>
              );
            })}
          </TabsBody>
        </Tabs>
      </MenuList>
    </Menu>
  );
}

export default NotificationMenu;
