import { faBox, faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import { useState } from 'react';
import ProductSaved from './ProductSaved';
const data = [
  {
    label: 'Product',
    iconLabel: <FontAwesomeIcon icon={faBox} className="w-5 h-5" />,
    value: 'product',
  },
  {
    label: 'Shop',
    iconLabel: <FontAwesomeIcon icon={faStore} className="w-5 h-5" />,
    value: 'shop',
  },
];
function Saved({ userData, refreshUserData }) {
  const [activeTab, setActiveTab] = useState(data[0].value);
  return (
    <div className="px-4">
      <Tabs id="custom-animation" value={activeTab} className="font-OpenSans">
        <TabsHeader
          className="w-[40%]  rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className: 'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
          }}
        >
          {data.map((el) => {
            return (
              <Tab key={el.value} value={el.value} onClick={() => setActiveTab(el.value)}>
                <div className="font-OpenSans flex items-center gap-2">
                  {el.iconLabel}
                  <p className="text-lg font-semibold">{el.label}</p>
                </div>
              </Tab>
            );
          })}
        </TabsHeader>
        <TabsBody>
          {data.map((el) => {
            return (
              <TabPanel key={el.value} value={el.value} className="font-OpenSans font-medium">
                {el.value === 'product' && <ProductSaved userData={userData} refreshUserData={refreshUserData} />}
              </TabPanel>
            );
          })}
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default Saved;
