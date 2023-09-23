import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function SortBar() {
  const brand = ['Iphone', 'Samsung', 'Oppo', 'Xiaomi', 'LG'];
  return (
    <div className="py-7 px-6">
      <p className="text-lg mb-2 font-semibold">Brand</p>
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
      <div className="flex relative h-1 w-full bg-gray-300">
        <input
          type="range"
          className="w-[100%] appearance-none absolute top-[-5px] cursor-pointer left-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-primary-color [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:pointer-events-auto pointer-events-none bg-transparent "
          min={0}
          max={100}
        ></input>
        <input
          type="range"
          className="w-[100%] appearance-none absolute top-[-5px] cursor-pointer left-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-primary-color [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:pointer-events-auto pointer-events-none bg-transparent "
          min={0}
          max={100}
        ></input>
      </div>
      <p className="text-lg mb-2 font-semibold pt-2 border-t mt-4">Review</p>
      <div>
        <div className="flex items-center mt-1">
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <p className="ml-3 text-sm">From 5 star</p>
        </div>
        <div className="flex items-center mt-1">
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="opacity-70 w-4" icon={faStar} />
          <p className="ml-3 text-sm">From 4 star</p>
        </div>
        <div className="flex items-center mt-1">
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
