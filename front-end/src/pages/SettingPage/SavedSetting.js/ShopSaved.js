import { useEffect, useState } from 'react';
import http from '../../../utils/http';
import StoreComponent from '../../../components/StoreComponent/StoreComponent';
function ShopSaved({ userData, refreshUserData }) {
  const [shop, setShop] = useState({});
  const getShop = async () => {
    try {
      const response = await http.post(`/shop/getRelatedShop`, { data: userData.shop });
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
  return (
    <div>
      <StoreComponent shops={shop} isSmall={true} />
    </div>
  );
}

export default ShopSaved;
