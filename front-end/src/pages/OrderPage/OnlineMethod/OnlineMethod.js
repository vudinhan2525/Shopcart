import { useState } from 'react';
// import img1 from '../../../assets/img/paymentsmethod/Amazon.png';
// import img2 from '../../../assets/img/paymentsmethod/Mastercard.png';
// import img3 from '../../../assets/img/paymentsmethod/visa.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWallet } from '@fortawesome/free-solid-svg-icons';
const image = [
  { img: 'https://shopcartimg2.blob.core.windows.net/shopcartctn/stripe.png', name: 'Stripe' },
  // { img: img2, name: 'MasterCard' },
  // { img: img3, name: 'Visa' },
];
//https://www.youtube.com/watch?v=rEaKl8_mwmQ
//https://www.youtube.com/watch?v=uQBnBnupn-M
function OnlineMethod() {
  const [method, setMethod] = useState(0);
  return (
    <div className="mt-2 animate-slideTopDown">
      <div className="flex gap-2">
        {image.map((el, idx) => {
          return (
            <div
              key={idx}
              className={`${
                method === idx ? 'border-[#08AC0A] border-[2px]' : 'border-[2px] border-gray-200'
              } flex items-center px-3 cursor-pointer w-[70px] py-2 rounded-md dark:bg-dark-text dark:border-[3px]`}
              onClick={() => setMethod(idx)}
            >
              <img src={el.img} alt={el.name}></img>
            </div>
          );
        })}
      </div>
      {/* <div className="mt-4">
        <header className="text-sm font-semibold">Email*</header>
        <input
          type="email"
          required
          className=" mt-2 mb-3 placeholder:text-gray-400 dark:bg-[#3A3B3C] dark:border-[0px] text-sm border-[1px] border-gray-200 w-full px-4 py-[10px] rounded-lg outline-none"
          placeholder="Type here..."
        ></input>
        <header className="text-sm font-semibold">Card Holder Name*</header>
        <input
          type="text"
          required
          className="mt-2 mb-3 placeholder:text-gray-400 dark:bg-[#3A3B3C] dark:border-[0px] text-sm border-[1px] border-gray-200 w-full px-4 py-[10px] rounded-lg outline-none"
          placeholder="Type here..."
        ></input>
        <header className="text-sm font-semibold">Card Number*</header>
        <div className="relative">
          <input
            type="text"
            required
            className="mt-2 mb-3 placeholder:text-gray-400 dark:bg-[#3A3B3C] dark:border-[0px] text-sm border-[1px] border-gray-200 w-full pr-4 pl-11 py-[10px] rounded-lg outline-none"
            placeholder="0000*****1245"
          ></input>
          <div className="absolute top-[50%] translate-y-[-55%] left-[18px]">
            <FontAwesomeIcon icon={faWallet} className="text-lg text-gray-400" />
          </div>
        </div>
        <div className="flex gap-7">
          <div className="basis-[60%]">
            <header className="text-sm font-semibold">Expiry*</header>
            <input
              type="text"
              required
              className="mt-2 mb-3 placeholder:text-gray-400 dark:bg-[#3A3B3C] dark:border-[0px] text-sm border-[1px] border-gray-200 w-full px-4 py-[10px] rounded-lg outline-none"
              placeholder="MM/YY"
            ></input>
          </div>
          <div className="basis-[40%]">
            <header className="text-sm font-semibold">CVC*</header>
            <input
              type="text"
              required
              className="mt-2 mb-3 placeholder:text-gray-400 dark:bg-[#3A3B3C] dark:border-[0px] text-sm border-[1px] border-gray-200 w-full px-4 py-[10px] rounded-lg outline-none"
              placeholder="000"
            ></input>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default OnlineMethod;
