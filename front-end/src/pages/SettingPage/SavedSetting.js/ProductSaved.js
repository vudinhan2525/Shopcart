import { useEffect, useState } from 'react';
import CartComponent from '../../../components/CartComponent/CartComponent';
import http from '../../../utils/http';
function ProductSaved({ userData, refreshUserData }) {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await http.post(`/prods/getRelatedProd`, { data: userData.likes });
      if (response.data.status === 'success') {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {products.map((el, idx) => (
          <CartComponent
            key={idx}
            isSmall={true}
            product={el}
            refreshUserData={refreshUserData}
            userId={userData._id}
            userProducts={userData.products}
            userLikes={userData.likes}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSaved;
