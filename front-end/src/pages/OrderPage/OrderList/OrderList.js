import { useEffect, useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProdList, deleteProd } from '../../../slice/product.slice';
import ShowDeleteSelect from '../Modals/ShowDeleteSelect';
import SkeletonProdList from '../../../components/Skeleton/SkeletonProdList';
function OrderList({ setSubTotal, user, refreshUserData }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.product.isLoading);
  const [deleteId, setDeleteId] = useState('');
  const products = useSelector((state) => state.product.productList);
  const [showDeleteSelect, setShowDeleteSelect] = useState(false);
  const handleDeleteProd = async () => {
    const data = {
      userId: user._id,
      productId: deleteId,
    };
    await dispatch(deleteProd(data));
    await refreshUserData();
  };
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      let newArr = [];
      for (let i = 0; i < user.products.length; i++) {
        newArr.push(user.products[i].productId);
      }
      dispatch(getProdList(newArr));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  useEffect(() => {
    if (products && products.length > 0 && user && Object.keys(user).length > 0) {
      let num = 0;
      products.forEach((el, idx) => {
        num += el.price * user.products[idx].quantity;
      });
      setSubTotal(num);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, user]);
  return (
    <div className="mt-6 flex flex-col gap-6  max-h-[802px] overflow-y-auto">
      {products.map((el, idx) => {
        if (isLoading) return <SkeletonProdList key={idx}></SkeletonProdList>;
        return (
          <OrderItem
            setSubTotal={setSubTotal}
            userProds={user.products}
            setShowDeleteSelect={setShowDeleteSelect}
            setDeleteId={setDeleteId}
            key={idx}
            product={el}
          />
        );
      })}
      {showDeleteSelect && (
        <ShowDeleteSelect
          handleDelete={handleDeleteProd}
          deleteId={deleteId}
          buttonContent={'Delete'}
          setDeleteId={setDeleteId}
          setShowDeleteSelect={setShowDeleteSelect}
          message={'Are you sure want to delete this product??'}
          content={'This address will be deleted permanently, you cannot undo this action !!'}
        />
      )}
    </div>
  );
}

export default OrderList;
