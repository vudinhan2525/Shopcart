import http from '../../../utils/http';
import { useEffect, useState } from 'react';
import StoreComponent from '../../../components/StoreComponent/StoreComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import CreateShopModal from './CreateShopModal';

function Shop({ userData }) {
  const [shop, setShop] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const getShop = async () => {
    try {
      const response = await http.post(`/shop/getRelatedShop`, { data: userData.adminShop });
      if (response.data.status === 'success') {
        setShop(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      getShop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  const emptyShop = (
    <div
      onClick={() => setShowCreateModal(true)}
      className="h-[350px] cursor-pointer border-[10px] border-dashed rounded-xl w-full bg-gray-100"
    >
      <div className="h-[300px] w-full flex flex-col justify-center items-center">
        <div className="h-[120px] w-[120px] mt-12 flex justify-center items-center ">
          <FontAwesomeIcon className="h-[120px] w-[120px] text-gray-500" icon={faCirclePlus} />
        </div>
        <p className="mt-3 text-lg font-semibold text-gray-800">Open a new shop.</p>
        <p className="text-sm w-full text-center text-gray-600">Add more shop and selling your product.</p>
      </div>
    </div>
  );
  return (
    <div>
      {showCreateModal && <CreateShopModal setShowCreateModal={setShowCreateModal} />}
      <div>
        <header className="text-2xl font-bold">Shops</header>
        <p className="text-sm text-gray-700">Manage all your shops here</p>
      </div>
      <div className="mt-4">
        <StoreComponent shops={shop} isSmall={true} emptyShop={emptyShop} />
      </div>
    </div>
  );
}

export default Shop;
