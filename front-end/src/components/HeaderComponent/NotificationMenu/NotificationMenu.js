import { useEffect, useState } from 'react';
import { BellIcon } from '../../../utils/IconSVG/index';
import { Menu, MenuHandler, MenuList, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import InboxList from './InboxList';
import GeneralNoti from './GeneralNoti';
import http from '../../../utils/http';
const data = [
  {
    label: 'Inbox',
    value: 'inbox',
  },
  {
    label: 'General',
    value: 'general',
  },
];
function NotificationMenu({ userData }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeTab, setActiveTab] = useState(data[0].value);
  const [notiGeneral, setNotiGeneral] = useState([]);
  const getAllNoti = async () => {
    try {
      const response = await http.post(`/noti/getRelatedNoti`, { data: userData.notifications });
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
        <div className="ml-2 cursor-pointer px-3 py-3 rounded-full transition-all hover:bg-gray-200">
          <BellIcon width="26px" height="26px" />
        </div>
      </MenuHandler>
      <MenuList className="text-black font-OpenSans w-[450px] py-4 outline-none">
        <div className=" flex justify-between items-end outline-none px-3">
          <p className="font-semibold text-base">Notifications</p>
          <div className="font-medium text-gray-700 hover:text-black cursor-pointer">Mark all as read</div>
        </div>
        <Tabs id="custom-animation " value={activeTab} className="outline-none font-OpenSans">
          <TabsHeader
            className=" rounded-none mt-2 border-b border-blue-gray-50 bg-transparent p-0 px-3"
            indicatorProps={{
              className: 'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
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
                  <div className="font-OpenSans  flex items-center gap-2">
                    <p className={`text-sm font-semibold ${el.value === activeTab ? 'text-black' : 'text-gray-700'}`}>
                      {el.label}
                    </p>
                  </div>
                </Tab>
              );
            })}
          </TabsHeader>
          <TabsBody>
            {data.map((el) => {
              return (
                <TabPanel key={el.value} value={el.value} className="px-0 font-OpenSans font-medium">
                  {el.value === 'inbox' && <InboxList />}
                  {el.value === 'general' && <GeneralNoti notiGeneral={notiGeneral} />}
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
