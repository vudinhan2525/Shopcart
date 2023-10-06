import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Slider from 'react-slider';
const MIN = 0;
const MAX = 5000;
function SortBar() {
  const brand = ['Iphone', 'Samsung', 'Oppo', 'Xiaomi', 'LG'];
  const [values, setValues] = useState([MIN, MAX]);
  return (
    <div className="py-7 px-6 ">
      <p className="text-lg mb-2 font-semibold ">Brand</p>
      <div>
        {brand.map((el, idx) => (
          <div className="flex mt-1" key={idx}>
            <input type="checkbox" id={`input-${idx}`} className=" scale-[1.2] cursor-pointer"></input>
            <label htmlFor={`input-${idx}`} className="ml-3 cursor-pointer">
              {el}
            </label>
          </div>
        ))}
      </div>
      <p className="text-lg mb-2 font-semibold pt-2 border-t mt-4">Price</p>
      <div>
        <Slider
          className="slider w-full h-[3px] bg-slate-300 mt-3"
          value={values}
          onChange={setValues}
          min={MIN}
          max={MAX}
        />
        <div className="flex justify-between mt-4 items-center">
          <p className="w-20 border border-slate-400 rounded-md outline-0 px-4 py-1">{`${values[0]}$`}</p>
          <div className="w-2 h-[1px] bg-slate-500"></div>
          <p className="w-20 border border-slate-400 rounded-md outline-0 px-4 py-1">{`${values[1]}$`}</p>
        </div>
        <p className="w-[120px] mx-auto text-center cursor-pointer mt-3 hover:opacity-80 border-[1px] py-1 px-2 rounded-lg border-black transition-all">
          Sort by price
        </p>
      </div>
      <p className="text-lg mb-2 font-semibold pt-2 border-t mt-4">Review</p>
      <div>
        <div className="flex items-center mt-2 cursor-pointer">
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <p className="ml-3 text-sm">From 5 star</p>
        </div>
        <div className="flex items-center mt-2 cursor-pointer">
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="opacity-70 w-4" icon={faStar} />
          <p className="ml-3 text-sm">From 4 star</p>
        </div>
        <div className="flex items-center mt-2 cursor-pointer">
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="opacity-70 w-4" icon={faStar} />
          <FontAwesomeIcon className="opacity-70 w-4" icon={faStar} />
          <p className="ml-3 text-sm">From 3 star</p>
        </div>
      </div>
    </div>
  );
}

export default SortBar;
