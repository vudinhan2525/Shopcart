import { useState } from 'react';
import http from '../../../utils/http';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
function Coupon({ setCouponList, couponList }) {
  const [coupon, setCoupon] = useState('');
  const Msg = ({ closeToast, toastProps }) => (
    <div
      className={`rounded-lg mt-2 flex items-center w-[350px] min-h-[85px] shadow-md border-l-[12px] border-[#2ec946] bg-[#fff] font-medium text-black`}
    >
      <div className="flex justify-between items-center gap-5 font-OpenSans px-3 h-ful w-full">
        <div className="flex items-center gap-5">
          <div className="relative w-6">
            <FontAwesomeIcon icon={faCircleCheck} className="text-[#2EC946] w-8 h-8" />
          </div>
          <div className="mt-[-12px]">
            <p className="text-lg leading-[28px] font-bold">Success</p>
            <p className="text-xs leading-[12px] text-gray-600">Coupon apply successfully</p>
          </div>
        </div>
        <div onClick={closeToast} className=" w-6  right-[10px] top-[20px] cursor-pointer">
          <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
  const handleCheckCoupon = async () => {
    let i = 0;
    couponList.forEach((el, idx) => {
      if (el.code === coupon) {
        i = 1;
      }
    });
    if (i === 1) return;
    try {
      const response = await http.post('coupon/checkCoupon', { data: coupon });
      if (response.data.status === 'success') {
        // toast.success('Coupon apply successfully !!', {
        //   position: 'top-right',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: 'light',
        //   transition: Bounce,
        // });
        toast(<Msg />);
        setCouponList((prev) => {
          return [...prev, response.data.data];
        });
        setCoupon('');
      }
    } catch (error) {}
  };
  return (
    <div className="relative">
      <input
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        placeholder="Enter Coupon Code"
        className="w-full bg-gray-200 dark:bg-[#3A3B3C] outline-none text-sm px-6 py-4 rounded-full"
      ></input>
      <div
        onClick={() => handleCheckCoupon()}
        className="flex items-center text-white dark:bg-primary-dark-color hover:opacity-80 transition-all cursor-pointer absolute bg-primary-color h-[42px] top-[50%] translate-y-[-50%] rounded-full right-[1%]"
      >
        <p className="font-medium text-sm mx-auto  px-4 select-none">Apply coupon</p>
      </div>
    </div>
  );
}

export default Coupon;
