import { useRef, useState } from 'react';
import DeliverMethod from '../DeliverMethod/DeliverMethod';
import OnlineMethod from '../OnlineMethod/OnlineMethod';
function Payment() {
  const input1 = useRef();
  const input2 = useRef();
  const [showMethod, setShowMethod] = useState(1);
  return (
    <div>
      <header className="text-2xl font-semibold">Order Summery</header>
      <div className="h-[1px] w-full bg-gray-200 my-5"></div>
      <div className="relative">
        <input
          placeholder="Enter Coupon Code"
          className="w-full bg-gray-200 outline-none text-sm px-6 py-3 rounded-full"
        ></input>
        <div className="flex items-center text-white hover:opacity-80 transition-all cursor-pointer absolute bg-primary-color h-[36px] top-[50%] translate-y-[-50%] rounded-full right-[2%]">
          <p className="font-medium text-sm mx-auto px-4 select-none">Apply coupon</p>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-200 my-5"></div>
      <div className="text-lg font-semibold">Payment Details</div>
      <div className="h-[1px] w-full bg-gray-200 my-5"></div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center relative">
          <input
            id="paymentsmethod"
            type="radio"
            defaultChecked
            ref={input1}
            name="paymentsmethod"
            className="peer/input1 opacity-0 cursor-pointer text-gray-800 w-[16px] h-[16px] "
          ></input>
          <label
            onClick={() => setShowMethod(1)}
            htmlFor="paymentsmethod"
            className="cursor-pointer text-[14px] leading-[20px] font-medium "
          >
            Cash on Delivery
          </label>
          <label
            onClick={() => setShowMethod(1)}
            htmlFor="paymentsmethod"
            className={`peer-checked/input1:after:block peer-checked/input1:border-[#08AC0A] after:hidden  after:bg-[#08AC0A] after:w-[8px] after:h-[8px] after:rounded-full after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[50%] after:translate-x-[50%] absolute w-[16px] h-[16px] rounded-full cursor-pointer border-[2px] border-gray-900  `}
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
            className="cursor-pointer text-[14px] leading-[20px] font-medium "
          >
            Credit or Debit card
          </label>
          <label
            onClick={() => setShowMethod(2)}
            htmlFor="paymentsmethod2"
            className={`peer-checked/input1:after:block peer-checked/input1:border-[#08AC0A] after:hidden after:bg-[#08AC0A] after:w-[8px] after:h-[8px] after:rounded-full after:absolute after:top-[50%] after:translate-y-[-50%] after:right-[50%] after:translate-x-[50%] absolute w-[16px] h-[16px] rounded-full cursor-pointer border-[2px] border-gray-900  `}
          ></label>
        </div>
        {showMethod === 1 ? <DeliverMethod /> : ''}
        {showMethod === 2 ? <OnlineMethod /> : ''}
      </div>
    </div>
  );
}

export default Payment;
