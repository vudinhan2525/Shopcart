import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Slider from 'react-slider';
import { Radio } from '@material-tailwind/react';
const MIN = 0;
const MAX = 1000;
function SortBar({ types, shopProds, setFilterObj, setProductList }) {
  //const brand = ['Iphone', 'Samsung', 'Oppo', 'Xiaomi', 'LG'];
  const [values, setValues] = useState([MIN, MAX]);
  return (
    <div className="py-7 px-6 ">
      <p className="text-xl mb-2 font-semibold ">Categories</p>
      <div className="flex flex-col">
        <Radio
          onClick={() => setProductList(shopProds)}
          name="type"
          ripple={false}
          className="hover:before:opacity-0 "
          containerProps={{
            className: 'p-2',
          }}
          label={<p className="font-OpenSans font-medium dark:text-dark-text">All</p>}
          defaultChecked={true}
        />
        {types?.map((el, idx) => (
          <Radio
            onClick={() => setProductList(el.prods)}
            key={idx}
            name="type"
            ripple={false}
            className="hover:before:opacity-0 "
            containerProps={{
              className: 'p-2',
            }}
            label={<p className="font-OpenSans font-medium">{el.category}</p>}
          />
          // <div className="flex mt-1" key={idx}>
          //   <input type="checkbox" id={`input-${idx}`} className=" scale-[1.2] cursor-pointer"></input>
          //   <label htmlFor={`input-${idx}`} className="ml-3 cursor-pointer">
          //     {el.category}
          //   </label>
          // </div>
        ))}
      </div>
      <p className="text-xl mb-2 font-semibold pt-2 border-t mt-4">Price</p>
      <div>
        <Slider
          className="slider w-full h-[3px] bg-dark-text mt-3"
          value={values}
          onChange={setValues}
          min={MIN}
          max={MAX}
        />
        <div className="flex justify-between mt-4 items-center">
          <p className="w-20 border border-slate-400 rounded-md outline-0 px-4 py-1 items-center">{`${values[0]}$`}</p>
          <div className="w-2 h-[1px] bg-slate-500"></div>
          <p className="w-20 border border-slate-400 rounded-md outline-0 px-4 py-1 items-center">{`${values[1]}$`}</p>
        </div>
        <p
          onClick={() => {
            return setFilterObj((prev) => {
              return { ...prev, priceMin: values[0], priceMax: values[1] };
            });
          }}
          className="w-[120px] dark:bg-gray-700 mx-auto text-center cursor-pointer mt-3 hover:opacity-80 border-[1px] py-1 px-2 rounded-lg border-black transition-all"
        >
          Sort by price
        </p>
      </div>
      <p className="text-xl mb-2 font-semibold pt-2 border-t mt-4">Review</p>
      <div>
        <div
          onClick={() => {
            setFilterObj((prev) => {
              return { ...prev, rating: 5 };
            });
          }}
          className="flex items-center mt-2 cursor-pointer"
        >
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <p className="ml-3 text-sm">From 5 star</p>
        </div>
        <div
          onClick={() => {
            setFilterObj((prev) => {
              return { ...prev, rating: 4 };
            });
          }}
          className="flex items-center mt-2 cursor-pointer"
        >
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <FontAwesomeIcon className="opacity-70 w-4" icon={faStar} />
          <p className="ml-3 text-sm">From 4 star</p>
        </div>
        <div
          onClick={() => {
            setFilterObj((prev) => {
              return { ...prev, rating: 3 };
            });
          }}
          className="flex items-center mt-2 cursor-pointer"
        >
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <FontAwesomeIcon className="text-primary-dark-color w-4" icon={faStar} />
          <FontAwesomeIcon className="opacity-70 w-4" icon={faStar} />
          <FontAwesomeIcon className="opacity-70 w-4" icon={faStar} />
          <p className="ml-3 text-sm">From 3 star</p>
        </div>
      </div>
    </div>
  );
}

export default SortBar;
