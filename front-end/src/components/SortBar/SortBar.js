import { faCircleXmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Slider from 'react-slider';
import { Radio } from '@material-tailwind/react';
import http from '../../utils/http';
import Dialog from '../Modals/Dialog';
import { toast } from 'react-toastify';
import SuccessToast from '../../utils/ToastMessage/ToastMessage';

const MIN = 0;
const MAX = 1000;
function SortBar({ shopId, isAdmin, types, shopProds, setFilterObj, setProductList }) {
  //const brand = ['Iphone', 'Samsung', 'Oppo', 'Xiaomi', 'LG'];
  const [values, setValues] = useState([MIN, MAX]);
  const [categoriesInput, setCategoriesInput] = useState('');
  const [showDeleteSelect, setShowDeleteSelect] = useState(false);
  const [categoriesDelete, setCategoriesDelete] = useState('');
  const [typesCate, setTypesCate] = useState([]);
  const handleAddCategories = async () => {
    try {
      const response = await http.post(
        `/shop/addCategories`,
        { data: { newCategories: categoriesInput, shopId: shopId } },
        { withCredentials: true },
      );
      if (response.data.status === 'success') {
        window.location.reload();
      }
    } catch (error) {}
  };
  const handleDeleteCategories = async () => {
    try {
      const response = await http.post(
        `/shop/deleteCategories`,
        { data: { categoryId: categoriesDelete, shopId: shopId } },
        { withCredentials: true },
      );
      if (response.data.status === 'success') {
        const newArr = types.filter((el) => el._id !== categoriesDelete);
        setTypesCate(newArr);
        toast(<SuccessToast status="success" message="Your categories has been deleted!" />);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (types && types.length > 0) {
      setTypesCate(types);
    }
  }, [types]);
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
        {typesCate.map((el, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <Radio
              onClick={() => setProductList(el.prods)}
              name="type"
              ripple={false}
              className="hover:before:opacity-0 "
              containerProps={{
                className: 'p-2',
              }}
              label={<p className="font-OpenSans font-medium dark:text-dark-text">{el.category}</p>}
            />
            {isAdmin && (
              <div
                onClick={() => {
                  setShowDeleteSelect(true);
                  setCategoriesDelete(el._id);
                }}
                className="mt-1"
              >
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-gray-400 hover:text-gray-800 cursor-pointer transition-all"
                />
              </div>
            )}
          </div>
        ))}
        {isAdmin && (
          <div>
            <input
              value={categoriesInput}
              onChange={(e) => setCategoriesInput(e.target.value)}
              className="outline-none ml-2 px-3 py-1 rounded-sm border-[1px] w-[160px] border-gray-300"
            ></input>
            <div
              onClick={() => handleAddCategories()}
              className=" text-center cursor-pointer hover:opacity-80 transition-all text-sm ml-2 rounded-lg px-3 py-2 mt-2 bg-primary-color text-white w-[160px]"
            >
              Add categories
            </div>
          </div>
        )}
        {showDeleteSelect && (
          <Dialog
            onClose={() => {
              setShowDeleteSelect(false);
            }}
            onYes={() => {
              handleDeleteCategories();
              setShowDeleteSelect(false);
            }}
            buttonContent={'Yes'}
            message={'Are you sure to delete this category ??'}
            content={'This category will be deleted permanently, you cannot undo this action !!'}
          />
        )}
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
              if (prev.rating === 5) return { ...prev, rating: 0 };
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
              if (prev.rating === 4) return { ...prev, rating: 0 };
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
              if (prev.rating === 3) return { ...prev, rating: 0 };
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
