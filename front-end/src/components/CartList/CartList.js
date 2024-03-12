import { useContext, useEffect, useState } from 'react';
import CartComponent from '../CartComponent/CartComponent';
import http from '../../utils/http';
import { AuthContext } from '../AuthProvider/AuthProvider';
import AddProductCart from '../../pages/ShopPage/AddProductCart';

function CartList({ filter, sortBy, shopProducts, setShowAddProduct }) {
  const [products, setProducts] = useState([]);
  const { userData, refreshUserData } = useContext(AuthContext);
  const getProduct = async () => {
    try {
      const response = await http.post(
        `prods/getProdInArray?price[lte]=${filter.priceMax}&price[gte]=${filter.priceMin}&avgRatings[gte]=${
          filter.rating
        }${sortBy.newest !== '0' ? '&sort=-dateUp' : ''}${
          sortBy.price !== '0' ? `&sort=${sortBy.price === '-1' ? '-' : ''}price` : ''
        }
        `,
        { data: shopProducts },
      );
      if (response.data.status === 'success') {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (filter && Object.keys(filter).length > 0 && sortBy && Object.keys(sortBy).length > 0 && shopProducts) {
      getProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sortBy, shopProducts]);
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <AddProductCart setShowAddProduct={setShowAddProduct} />
      {products.map((el, idx) => {
        return (
          <CartComponent
            product={el}
            isSmall={true}
            key={idx}
            userId={userData._id}
            refreshUserData={refreshUserData}
            userLikes={userData.likes}
          />
        );
      })}
    </div>
  );
}

export default CartList;
