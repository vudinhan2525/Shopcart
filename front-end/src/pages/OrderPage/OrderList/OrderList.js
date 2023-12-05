import { useEffect, useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProdList, deleteProd } from '../../../slice/product.slice';
import ShowDeleteSelect from '../Modals/ShowDeleteSelect';
import SkeletonProdList from '../../../components/Skeleton/SkeletonProdList';
function OrderList({ user }) {
  const dispatch = useDispatch();
  const isAlreadyAdding = useSelector((state) => state.product.isAlreadyAdding);
  const isLoading = useSelector((state) => state.product.isLoading);
  const [deleteId, setDeleteId] = useState('');
  const products = useSelector((state) => state.product.productList);
  const [showDeleteSelect, setShowDeleteSelect] = useState(false);
  const handleDeleteProd = () => {
    const data = {
      userId: user._id,
      productId: deleteId,
    };
    dispatch(deleteProd(data));
  };
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      let newArr = [];
      for (let i = 0; i < user.products.length; i++) {
        newArr.push(user.products[i].productId);
      }
      if (isAlreadyAdding === false) dispatch(getProdList(newArr));
    }
  }, [dispatch, isAlreadyAdding, user]);
  return (
    <div className="mt-6 flex flex-col gap-6 ">
      {products.map((el, idx) => {
        if (isLoading) return <SkeletonProdList key={idx}></SkeletonProdList>;
        return (
          <OrderItem
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
