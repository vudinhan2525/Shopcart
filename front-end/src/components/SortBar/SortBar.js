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
            <label for={`input-${idx}`} className="ml-3 cursor-pointer">
              {el}
            </label>
          </div>
        ))}
      </div>
      <p className="text-lg mb-2 font-semibold pt-2 border-t mt-4">Price</p>
      <input type="range"></input>
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
