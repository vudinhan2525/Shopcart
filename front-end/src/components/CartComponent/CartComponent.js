import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeart2 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import Button from '../../utils/Button';
import { addProdList } from '../../slice/product.slice';
import { useState } from 'react';
import http from '../../utils/http';
import { toast } from 'react-toastify';
import ToastMessage from '../../utils/ToastMessage/ToastMessage';
function CartComponent({ isSmall = false, product, userId, userProducts, userLikes, refreshUserData }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProd = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      userId: userId,
      newData: { prodId: product._id, quantity: 1 },
      isChanged: true,
    };
    dispatch(addProdList(data))
      .then(() => {
        refreshUserData();
        toast(<ToastMessage status={'success'} message={'Product added successfully !!'} />);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error dispatching action:', error);
        setIsLoading(false);
      });
  };
  const handleAddLikedProd = async (e) => {
    e.preventDefault();
    let flag = 0;
    userLikes?.forEach((el, idx) => {
      if (el === product._id) {
        flag = 1;
      }
    });
    if (flag === 1) {
      const idx = userLikes.indexOf(product._id);
      const newArr = userLikes;
      newArr.splice(idx, 1);
      try {
        const response = await http.patch(`users/${userId}`, { likes: newArr }, { withCredentials: true });
        await refreshUserData();
        if (response.data.status === 'success') {
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      let newArr = [...userLikes, product._id];
      try {
        const response = await http.patch(`users/${userId}`, { likes: newArr }, { withCredentials: true });
        await refreshUserData();
        if (response.data.status === 'success') {
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Link
      to={`/product/${product?._id}`}
      className="relative   border-[1px] dark:border-[0px] border-gray-300 animate-slideTopDown cursor-pointer transition-all rounded-lg"
    >
      <div className={` overflow-hidden dark:bg-white  pb-3 rounded-t-lg`}>
        <div
          style={{ backgroundImage: `url(${product?.images[0]})` }}
          className={`${
            isSmall ? 'h-[150px] w-[150px]' : 'h-[200px] w-[200px]'
          } text-center bg-no-repeat bg-center bg-contain mt-2 mx-auto hover:scale-[1.1] transition-all`}
        ></div>
      </div>
      <div className="dark:bg-dark-flat dark:text-dark-text dark:rounded-b-lg px-5 ">
        <h3
          className={`${
            isSmall
              ? ' text-black dark:text-dark-text text-base h-[54px] line-clamp-2'
              : 'text-lg h-[62px] line-clamp-2'
          } font-bold pt-2`}
        >
          {product?.name}
        </h3>
        <div className="flex gap-6 items-center mt-1">
          <p className=" text-base font-bold text-red-600 dark:text-red-400">{`${product?.price.toFixed(2)} $`}</p>
          <p className="text-sm opacity-60 line-through">{`${(product?.price + 50).toFixed(2)} $`}</p>
        </div>
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((el, idx) => {
            return (
              <FontAwesomeIcon
                key={idx}
                className={`${idx < product?.avgRatings ? 'text-[#08AC0A]' : 'text-[#4C4C4C]'} w-4`}
                icon={faStar}
              />
            );
          })}
          <p className="ml-3 text-sm">{`(${product?.numberRatings})`}</p>
        </div>

        <Button
          onClick={(e) => {
            handleAddProd(e);
          }}
          className={`mb-6 mt-3 hover:bg-primary-color hover:text-white ${
            isSmall ? 'px-[12px] py-[7px]' : 'px-[20px] py-[10px]'
          } text-sm dark:bg-primary-dark-color dark:font-semibold dark:text-dark-text dark:border-none dark:hover:opacity-70  min-w-[110px] rounded-full text-primary-color bg-white border border-primary-color transition-all`}
        >
          {isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Add to cart'}
        </Button>
      </div>
      <div
        onClick={(e) => handleAddLikedProd(e)}
        className={`${
          isSmall ? 'w-[40px] h-[40px]' : 'w-[50px] h-[50px]'
        } absolute  transition-all  flex items-center ${
          userLikes?.includes(product?._id)
            ? 'bg-pink-50 text-pink-600'
            : 'dark:text-dark-flat dark:bg-gray-300 dark:hover:bg-gray-400 hover:bg-gray-200 bg-[#F5F6F6]'
        }   rounded-full top-[2%] right-[3%] `}
      >
        <FontAwesomeIcon
          icon={userLikes?.includes(product?._id) ? faHeart2 : faHeart}
          className={`${isSmall ? 'text-lg' : 'text-xl'} mx-auto`}
        />
      </div>
    </Link>
  );
}

export default CartComponent;
