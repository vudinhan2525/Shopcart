import { useEffect, useRef, useState } from 'react';
import OnlineMethod from '../OnlineMethod/OnlineMethod';
import SuccessTransaction from '../Modals/SuccessTransaction';
import Coupon from './Coupon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import ShowDeleteSelect from '../Modals/ShowDeleteSelect';
import { useSelector } from 'react-redux';
function Payment({ userData }) {
  const input1 = useRef();
  const input2 = useRef();
  const [showMethod, setShowMethod] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [couponList, setCouponList] = useState([]);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showDeleteSelect, setShowDeleteSelect] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const products = useSelector((state) => state.product.productList);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (products && products.length > 0 && userData && Object.keys(userData).length > 0) {
      // let num = 0;
      // products.forEach((el, idx) => {
      //   num += el.price * userData.products[idx].quantity;
      // });
      // console.log(num);
    }
  }, [products, userData]);
  const handleRemoveCoupon = (couponId) => {
    if (couponId !== '') {
      const newArr = couponList.filter((el, idx) => el._id !== couponId);
      setCouponList(newArr);
    }
  };
  const getSale = (el) => {
    if (el.priceReduce !== 0) {
      return `${el.priceReduce}$`;
    }
    if (el.percentageReduce !== 0) {
      return `${el.percentageReduce}%`;
    }
  };
  return (
    <div>
      <header className="text-2xl font-semibold">Order Summery</header>
      <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-700 my-5"></div>
      <Coupon setCouponList={setCouponList} couponList={couponList} />
      <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-700 my-5"></div>
      <div className="text-lg font-semibold">Payment Details</div>
      <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-700 my-5"></div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center relative">
          <input
            id="paymentsmethod"
            type="radio"
            defaultChecked
            ref={input1}
            name="paymentsmethod"
            className="peer/input1 opacity-0 cursor-pointer text-gray-800  w-[16px] h-[16px] "
          ></input>
          <label
            onClick={() => setShowMethod(1)}
            htmlFor="paymentsmethod"
            className="cursor-pointer text-[14px] leading-[20px] font-semibold "
          >
            Cash on Delivery
          </label>
          <label
            onClick={() => setShowMethod(1)}
            htmlFor="paymentsmethod"
            className={`peer-checked/input1:after:block peer-checked/input1:border-[#08AC0A] after:hidden  after:bg-[#08AC0A] after:w-[8px] after:h-[8px] after:rounded-full after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[50%] after:translate-x-[50%] absolute w-[16px] h-[16px] rounded-full cursor-pointer border-[2px] border-gray-900 dark:border-gray-200 `}
          ></label>
        </div>
        <div className="gap-2 flex items-center relative">
          <input
            id="paymentsmethod2"
            type="radio"
            ref={input2}
            name="paymentsmethod"
            className=" peer/input1 opacity-0 cursor-pointer text-gray-800 w-[16px] h-[16px] "
          ></input>
          <label
            onClick={() => setShowMethod(2)}
            htmlFor="paymentsmethod2"
            className="cursor-pointer text-[14px] leading-[20px] font-semibold"
          >
            Credit or Debit card
          </label>
          <label
            onClick={() => setShowMethod(2)}
            htmlFor="paymentsmethod2"
            className={`dark:border-gray-200 peer-checked/input1:after:block peer-checked/input1:border-[#08AC0A] after:hidden after:bg-[#08AC0A] after:w-[8px] after:h-[8px] after:rounded-full after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[50%] after:translate-x-[50%] absolute w-[16px] h-[16px] rounded-full cursor-pointer border-[2px] border-gray-900  `}
          ></label>
        </div>
        {showMethod === 2 ? <OnlineMethod /> : ''}
        <div>
          <div className="flex my-3 items-center justify-between">
            <header className="text-sm font-semibold">Sub Total</header>
            <p className="text-sm text-gray-900 dark:text-dark-text">$549.00</p>
          </div>
          <div className="flex my-3 items-center justify-between">
            <header className="text-sm font-semibold">Tax(10%)</header>
            <p className="text-sm text-gray-900 dark:text-dark-text">$54.90</p>
          </div>
          <div className="flex my-3 items-center justify-between">
            <header className="flex items-center gap-1 text-sm font-semibold ">
              <p>{`Coupon Discount (${couponList.length})`}</p>
              {showCoupon === false && (
                <FontAwesomeIcon
                  onClick={() => {
                    setShowCoupon(true);
                  }}
                  icon={faChevronDown}
                  className="cursor-pointer animate-slideTopDown"
                />
              )}
              {showCoupon && (
                <FontAwesomeIcon
                  onClick={() => {
                    setShowCoupon(false);
                  }}
                  icon={faChevronUp}
                  className="cursor-pointer animate-slideTopDown"
                />
              )}
            </header>
            <p className="text-sm text-gray-900 dark:text-dark-text">-$0</p>
          </div>
          {showCoupon && (
            <div className="px-3 flex-col flex gap-1">
              {couponList.map((el, idx) => {
                return (
                  <div key={idx} className="bg-gray-200 px-3 py-2 rounded-lg relative animate-slideTopDown">
                    <div className="text-xs flex items-center gap-1">
                      <p className="min-w-[33px]">Code:</p>
                      <p className="text-sm">{el.code}</p>
                    </div>
                    <div className="text-xs flex items-center gap-1">
                      <p className="min-w-[33px]">Sale:</p>
                      <p className="text-sm">{getSale(el)}</p>
                    </div>
                    <div
                      onClick={() => {
                        setShowDeleteSelect(true);
                        setDeleteId(el._id);
                      }}
                      className="absolute top-[50%] flex items-center hover:bg-gray-500 cursor-pointer justify-center translate-y-[-50%] right-[15px] bg-gray-400 rounded-full w-[20px] h-[20px]"
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-[12px] h-[12px] " />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex my-3 items-center justify-between">
            <header className="text-sm font-semibold ">Shipping Cost</header>
            <p className="text-sm text-gray-900 dark:text-dark-text">$0.00</p>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex my-3 items-center justify-between">
          <header className="font-bold">Total</header>
          <p className="font-bold text-gray-900 dark:text-dark-text">= $494.10</p>
        </div>
      </div>
      <div
        onClick={() => setShowSuccess(true)}
        className="bg-primary-color text-white text-xl text-center py-3 dark:bg-primary-dark-color  rounded-full cursor-pointer transition-all hover:opacity-80"
      >
        Pay $494.10
      </div>
      {showSuccess ? <SuccessTransaction setShowSuccess={setShowSuccess} /> : <></>}
      {showDeleteSelect && (
        <ShowDeleteSelect
          handleDelete={handleRemoveCoupon}
          deleteId={deleteId}
          buttonContent={'Remove'}
          setDeleteId={setDeleteId}
          setShowDeleteSelect={setShowDeleteSelect}
          message={'Are you sure want to remove this coupon??'}
          content={'This coupon will be remove imediatedly, you cannot undo this action !!'}
        />
      )}
    </div>
  );
}

export default Payment;
