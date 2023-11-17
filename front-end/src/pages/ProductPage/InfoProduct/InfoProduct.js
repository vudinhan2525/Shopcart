import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { MinusIcon, PlusIcon } from '../../../utils/IconSVG/index';
import Button from '../../../utils/Button';
function InfoProduct({ product }) {
  const [itemCnt, setItemCnt] = useState(1);
  return (
    <div className="bg-white px-8 py-6 rounded-xl border-[1px] border-gray-300">
      <div>
        <header className="text-4xl font-bold">{product.name}</header>
        <p className="mt-2  text-sm">{product.summary}</p>
        <div className="flex items-center mt-2 ">
          {[1, 2, 3, 4, 5].map((el, idx) => {
            return (
              <FontAwesomeIcon
                key={idx}
                className={`${idx < product.avgRatings ? 'text-[#08AC0A]' : 'text-[#4C4C4C]'} w-4`}
                icon={faStar}
              />
            );
          })}
          <p className="ml-2">{product.avgRatings}</p>
          <p className="ml-3 text-sm opacity-50">{`(${product.numberRatings})`}</p>
        </div>
      </div>
      <div className="w-full h-[1px] my-6 bg-gray-200"></div>
      <div>
        <div className="flex gap-2 items-end text-3xl font-semibold">
          <p className="">{product.price}</p>
          or
          <p className="">{(product.price / 6).toFixed(2)}$/month</p>
        </div>
        <p className="mt-2 text-sm ">Suggested payments with 6 months special financing</p>
      </div>
      <div className="w-full h-[1px] my-6 bg-gray-300"></div>
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
            Only <p className="text-orange-600 font-bold">{`${product.itemLeft} Items`}</p> left
          </div>
          <div>Don't miss it!!</div>
        </div>
      </div>
      <div className="mt-4 text-2xl font-semibold flex items-center gap-4">
        <div className="text-xl">Total: </div>
        <p>{`${product.price * itemCnt}$`}</p>
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
