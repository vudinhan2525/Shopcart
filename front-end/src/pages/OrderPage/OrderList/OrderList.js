import { useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import SkeletonProdList from '../../../components/Skeleton/SkeletonProdList';
import Dialog from '../../../components/Modals/Dialog';
import http from '../../../utils/http';
function OrderList({ selected, setSelected, isLoading, setProducts, products, userData, refreshUserData }) {
  const [deleteId, setDeleteId] = useState('');
  const [showDeleteSelect, setShowDeleteSelect] = useState(false);

  const handleDeleteProd = async (deleteId) => {
    try {
      const response = await http.post(
        `prods/deleteProdFromUserList/${userData._id}`,
        { data: deleteId },
        { withCredentials: true },
      );
      if (response.data.status === 'success') {
        await refreshUserData();
        setSelected((prev) => prev - 1);
      }
    } catch (error) {}
  };
  return (
    <div className="mt-6 flex flex-col gap-6  max-h-[802px] overflow-y-auto">
      {products &&
        products.length > 0 &&
        products.map((el, idx) => {
          if (isLoading) return <SkeletonProdList key={idx}></SkeletonProdList>;
          return (
            <div
              key={idx}
              onClick={() => {
                setSelected(idx);
                // setProductSelected(el);
              }}
              className={`${
                idx === selected && 'bg-gray-200 dark:bg-dark-flat dark:border-[1px] dark:border-white'
              }  rounded-lg px-3 py-2 cursor-pointer border-[1px] border-transparent`}
            >
              <OrderItem
                setProducts={setProducts}
                selected={selected}
                setShowDeleteSelect={setShowDeleteSelect}
                setDeleteId={setDeleteId}
                product={el}
              />
            </div>
          );
        })}
      {(!products || products.length === 0) && (
        <div className="px-4 py-4 flex gap-8 mt-2 border-[1px] rounded-md">
          <div
            style={{
              backgroundImage: `url(https://shopcartimg2.blob.core.windows.net/shopcartctn/emptyInvoice.webp)`,
            }}
            className="w-[120px] h-[120px] bg-no-repeat bg-center bg-contain rounded-full"
          ></div>
          <div className="">
            <header className="font-bold text-lg mt-4">No result found</header>
            <p className="text-sm">
              We were unable to find any items in your cart. Please select a product to add to your cart in order to
              proceed with the payment process.
            </p>
          </div>
        </div>
      )}
      {showDeleteSelect && (
        <Dialog
          onClose={() => {
            setDeleteId('');
            setShowDeleteSelect(false);
          }}
          onYes={() => {
            handleDeleteProd(deleteId);
            setShowDeleteSelect(false);
          }}
          buttonContent={'Delete'}
          message={'Are you sure want to delete this product??'}
          content={'Your product will be deleted!!'}
        />
      )}
    </div>
  );
}

export default OrderList;
