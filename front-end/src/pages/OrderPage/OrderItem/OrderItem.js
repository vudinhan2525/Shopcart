import { useState } from 'react';
import img from '../../../assets/img/cart/test.webp';
import { MinusIcon, PlusIcon } from '../../../utils/IconSVG/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function OrderItem() {
  const [itemCnt, setItemCnt] = useState(1);
  return (
    <div className="flex items-center gap-6 relative">
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="w-[120px] h-[120px] bg-no-repeat bg-center bg-contain border-[1px] rounded-lg border-gray-300"
      ></div>
      <div className="flex items-center justify-between w-[80%]">
        <div>
          <header className="text-xl font-bold ">Iphone 13 128GB</header>
          <p className="text-sm text-gray-800 mt-2">Color: Pink</p>
        </div>
        <div className="">
          <header className="text-center text-xl font-semibold">{`$${549 * itemCnt}.00`}</header>
          <div className="flex items-center text-sm text-gray-800 mt-2 gap-2">
            <p>Quantity:</p>
            <div className="flex items-center bg-gray-100 rounded-full">
              <div
                onClick={() => {
                  if (itemCnt === 0) return;
                  setItemCnt((prev) => prev - 1);
                }}
                className="px-2 cursor-pointer rounded-l-full hover:bg-gray-300 transition-all  h-[36px] flex items-center"
              >
                <MinusIcon height="18px" width="18px" />
              </div>
              <p className="py-1 px-2 select-none text-lg font-semibold">{itemCnt}</p>
              <div
                onClick={() => {
                  setItemCnt((prev) => prev + 1);
                }}
                className="px-2 cursor-pointer rounded-r-full hover:bg-gray-300 transition-all  h-[36px] flex items-center"
              >
                <PlusIcon height="18px" width="18px" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex transition-all items-center hover:bg-gray-300 top-0 right-0 cursor-pointer w-[30px] h-[30px] rounded-full bg-[#F5F6F6]">
        <FontAwesomeIcon icon={faXmark} className="mx-auto text-sm" />
      </div>
    </div>
  );
}

export default OrderItem;
