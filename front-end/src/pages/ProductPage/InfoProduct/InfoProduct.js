import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { MinusIcon, PlusIcon } from '../../../utils/IconSVG/index';
import Button from '../../../utils/Button';
function InfoProduct() {
  const [itemCnt, setItemCnt] = useState(1);
  return (
    <div className="bg-white px-8 py-6 rounded-xl">
      <div>
        <header className="text-4xl font-bold">Iphone13 128GB</header>
        <p className="mt-2  text-sm">
          a perfect balance of exhilarating high-fidelity audio and the effortless of magic
        </p>
        <div className="flex items-center mt-2 ">
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <p className="ml-2">5.0</p>
          <p className="ml-3 text-sm opacity-50">(124)</p>
        </div>
      </div>
      <div className="w-full h-[1px] my-6 bg-gray-200"></div>
      <div>
        <div className="flex gap-2 items-end text-3xl font-semibold">
          <p className="">599.00$</p>
          or
          <p className="">99.99$/month</p>
        </div>
        <p className="mt-2 text-sm ">Suggested payments with 6 months special financing</p>
      </div>
      <div className="w-full h-[1px] my-6 bg-gray-200"></div>
      <div className="flex items-center">
        <div className="flex items-center bg-gray-100 rounded-full">
          <div
            className="px-3 cursor-pointer rounded-l-full hover:bg-gray-300 transition-all  h-[52px] flex items-center"
            onClick={() => {
              if (itemCnt > 0) {
                setItemCnt((prev) => prev - 1);
              }
            }}
          >
            <MinusIcon />
          </div>
          <p className="py-3 px-4 select-none text-lg font-semibold">{itemCnt}</p>
          <div
            className="px-3 cursor-pointer rounded-r-full hover:bg-gray-300 transition-all  h-[52px] flex items-center"
            onClick={() => setItemCnt((prev) => prev + 1)}
          >
            <PlusIcon />
          </div>
        </div>
        <div className="ml-3 text-sm">
          <div className="flex gap-1">
            Only <p className="text-orange-600 font-bold">12 Items</p> left
          </div>
          <div>Don't miss it!!</div>
        </div>
      </div>
      <div className="mt-4 text-2xl font-semibold flex items-center gap-4">
        <div className="text-xl">Total: </div>
        <p>{`${599 * itemCnt}.00$`}</p>
      </div>
      <div className="flex gap-8 items-center my-6">
        <Button className="border-[2px] border-primary-color font-semibold basis-[40%] text-center text-white py-3 rounded-full bg-primary-color  hover:opacity-90 transition-all">
          Buy Now
        </Button>
        <Button className="font-semibold basis-[40%] text-center text-primary-color py-3 rounded-full bg-white border-primary-color border-[2px] hover:bg-primary-color hover:text-white transition-all">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default InfoProduct;
