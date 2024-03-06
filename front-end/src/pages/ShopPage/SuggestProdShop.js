import { useEffect, useState } from 'react';
import http from '../../utils/http';
import CartComponent from '../../components/CartComponent/CartComponent';
import AddProductCart from './AddProductCart';
function SuggestProdShop({ isAdmin, setShowAddProduct, shopProds, userData, refreshUserData }) {
  const [product, setProduct] = useState([]);

  const getProducts = async () => {
    const newArr = [];
    for (let i = 0; i < Math.min(shopProds.length, 5); i++) {
      newArr.push(shopProds[i]);
    }
    if (isAdmin) {
      newArr.pop();
    }
    try {
      const response = await http.post(`/prods/getRelatedProd`, { data: newArr }, { withCredentials: true });
      if (response.data.status === 'success') {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (shopProds) {
      getProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopProds]);
  return (
    <div className="">
      <header className="text-2xl font-OpenSans mt-4 font-semibold">Suggest Products</header>
      <div className="grid grid-cols-5 gap-4 mt-4">
        <AddProductCart />
        {product.map((el, idx) => {
          return (
            <CartComponent
              product={el}
              key={idx}
              isSmall={true}
              refreshUserData={refreshUserData}
              userId={userData._id}
              userProducts={userData.products}
              userLikes={userData.likes}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SuggestProdShop;
