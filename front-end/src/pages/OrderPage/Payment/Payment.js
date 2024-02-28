import { useEffect, useRef, useState } from 'react';
import OnlineMethod from '../OnlineMethod/OnlineMethod';
import Coupon from './Coupon';
import { deleteProd } from '../../../slice/product.slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import Dialog from '../../../components/Modals/Dialog';
import http from '../../../utils/http';
import { useDispatch } from 'react-redux';
function Payment({ productSelected, addressSelected, itemSelected, setItemSelected, userData, refreshUserData }) {
  const input1 = useRef();
  const input2 = useRef();
  const dispatch = useDispatch();
  const [showMethod, setShowMethod] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [couponList, setCouponList] = useState([]);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showDeleteSelect, setShowDeleteSelect] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const shippingCost = 2;

  useEffect(() => {
    setTotal(itemSelected.price * itemSelected.quantity + shippingCost);
    const discount = getDiscount();
    setTotal((prev) => prev - discount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected]);
  useEffect(() => {
    const discount = getDiscount();
    if (itemSelected.price * itemSelected.quantity + shippingCost - discount <= 0) {
      setTotal(0);
    } else setTotal(itemSelected.price * itemSelected.quantity + shippingCost - discount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponList]);
  const handleRemoveCoupon = (couponId) => {
    if (couponId !== '') {
      const newArr = couponList.filter((el, idx) => el._id !== couponId);
      setCouponList(newArr);
    }
  };
  const handleDeleteProd = async (deleteId) => {
    const data = {
      userId: userData._id,
      productId: deleteId,
    };
    await dispatch(deleteProd(data));
    await refreshUserData();
  };
  const getDiscount = () => {
    let discount = 0;
    couponList.forEach((el, idx) => {
      if (el.priceReduce !== 0) {
        discount += el.priceReduce;
      } else if (el.percentageReduce !== 0) {
        discount += (el.percentageReduce * itemSelected.price * itemSelected.quantity) / 100;
      }
    });
    setCouponDiscount(discount);
    return discount;
  };
  const getSale = (el) => {
    if (el.priceReduce !== 0) {
      return `${el.priceReduce.toFixed(2)}$`;
    }
    if (el.percentageReduce !== 0) {
      return `${el.percentageReduce}% (${(
        (el.percentageReduce * itemSelected.price * itemSelected.quantity) /
        100
      ).toFixed(1)}$)`;
    }
  };
  const buying = async () => {
    const obj = {
      status: 'pending',
      method: 'ship',
      products: {
        product: itemSelected.prodId,
        quantity: itemSelected.quantity,
        price: total,
      },
    };
    try {
      const response = await http.post(`/bill/addBill/${userData._id}`, { data: obj });
      if (response.data.status === 'success') {
        setShowSuccess(false);
        handleDeleteProd(itemSelected.prodId);
        refreshUserData();
        setItemSelected({ prodId: '', price: 0, quantity: 0 });
      }
    } catch (error) {}
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
            <p className="text-sm text-gray-900 dark:text-dark-text">{`$${(
              itemSelected.price * itemSelected.quantity
            ).toFixed(2)}`}</p>
          </div>
          <div className="flex my-3 items-center justify-between">
            <header className="text-sm font-semibold">Tax(0%)</header>
            <p className="text-sm text-gray-900 dark:text-dark-text">{`$${(
              (itemSelected.price * itemSelected.quantity * 0) /
              100
            ).toFixed(1)}`}</p>
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
            <p className="text-sm text-gray-900 dark:text-dark-text">{`-$${couponDiscount.toFixed(2)}`}</p>
          </div>
          {showCoupon && (
            <div className="px-3 flex-col flex gap-1">
              {couponList.map((el, idx) => {
                return (
                  <div
                    key={idx}
                    className="bg-gray-200 dark:bg-dark-flat dark:text-gray-400 px-3 py-2 rounded-lg relative animate-slideTopDown"
                  >
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
                      className="absolute top-[50%] flex items-center dark:bg-gray-700 dark:text-dark-text dark:hover:bg-gray-800 transition-all hover:bg-gray-500 cursor-pointer justify-center translate-y-[-50%] right-[15px] bg-gray-400 rounded-full w-[20px] h-[20px]"
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
            <p className="text-sm text-gray-900 dark:text-dark-text">{`$${shippingCost.toFixed(2)}`}</p>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="flex my-3 items-center justify-between">
          <header className="font-bold">Total</header>
          <p className="font-bold text-gray-900 dark:text-dark-text">{`= $${total.toFixed(2)}`}</p>
        </div>
      </div>
      <div
        onClick={() => {
          setShowSuccess(true);
        }}
        className="bg-primary-color text-white text-xl text-center py-3 dark:bg-primary-dark-color  rounded-full cursor-pointer transition-all hover:opacity-80"
      >
        {`Pay $${total.toFixed(2)}`}
      </div>
      {showSuccess && (
        <div className="modal fixed top-0 animate-slideTopDown right-0 left-0 bottom-0 bg-black/30 z-[51] ">
          <div className="absolute py-6 px-6 top-[50%] translate-y-[-50%] overflow-hidden dark:bg-dark-flat w-[500px] right-[50%] rounded-xl translate-x-[50%] bg-white">
            <header className="text-xl font-bold dark:text-dark-text">Are you sure want to buy this product??</header>
            <div className="w-full h-[1px] bg-gray-300 mt-3"></div>
            <div className="flex gap-4">
              <div
                style={{ backgroundImage: `url(${productSelected.images[0]})` }}
                className="mt-2 w-[100px] h-[100px] bg-white bg-no-repeat bg-center bg-contain border-[1px] dark:border-gray-700 rounded-lg border-gray-300"
              ></div>
              <div className="mt-2 flex flex-col justify-between py-2">
                <div>
                  <p className="text-lg font-bold ">{productSelected.name}</p>
                  <p className="text-sm text-gray-600">{`x${itemSelected.quantity}`}</p>
                </div>
                <p className="text-lg font-bold">{`${total.toFixed(2)}$`}</p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 mt-3"></div>
            <p className="mt-2 text-gray-700 text-sm">Product will be delivered to:</p>
            <div className="px-4 mt-2 py-2 rounded-lg border-[1px] border-gray-700">
              <div className=" gap-2 flex font-medium items-center">
                <p className="text-gray-600 min-w-[60px] text-sm">Receiver: </p>
                <p className="font-semibold">{addressSelected.receiveName}</p>
              </div>
              <div className=" gap-2 flex font-medium items-center">
                <p className="text-gray-600 min-w-[60px] text-sm">Address: </p>
                <p className="font-semibold">{addressSelected.address}</p>
              </div>
              <div className=" gap-2 flex font-medium items-center">
                <p className="text-gray-600 min-w-[60px] text-sm">Phone: </p>
                <p className="font-semibold">{addressSelected.phonenumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-5">
              <div
                onClick={() => {
                  setShowSuccess(false);
                }}
                className="bg-gray-300 dark:bg-gray-700 font-semibold px-6 cursor-pointer hover:opacity-80 transition-all py-2 rounded-lg"
              >
                Cancel
              </div>
              <div
                onClick={buying}
                className=" px-6 cursor-pointer py-2 rounded-lg font-semibold hover:opacity-80 transition-all bg-orange-400 text-white"
              >
                Yes
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteSelect && (
        <Dialog
          onClose={() => {
            if (setDeleteId) {
              setDeleteId('');
            }
            setShowDeleteSelect(false);
          }}
          onYes={() => {
            if (handleRemoveCoupon) {
              handleRemoveCoupon(deleteId);
            }
            setShowDeleteSelect(false);
          }}
          buttonContent={'Yes'}
          message={'Are you sure want to remove this coupon??'}
          content={'This coupon will be remove imediatedly, you cannot undo this action !!'}
        />
      )}
    </div>
  );
}

export default Payment;
