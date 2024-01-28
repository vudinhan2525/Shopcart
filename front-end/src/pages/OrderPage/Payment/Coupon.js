import { useState } from 'react';
import http from '../../../utils/http';
import { toast } from 'react-toastify';
import ToastMessage from '../../../utils/ToastMessage/ToastMessage';
function Coupon({ setCouponList, couponList }) {
  const [coupon, setCoupon] = useState('');

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
        toast(<ToastMessage status="success" message="Coupon apply successfully !!" />);
        setCouponList((prev) => {
          return [...prev, response.data.data];
        });
        setCoupon('');
      }
    } catch (error) {
      toast(<ToastMessage status="error" message={error.response.data.message} />);
    }
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
