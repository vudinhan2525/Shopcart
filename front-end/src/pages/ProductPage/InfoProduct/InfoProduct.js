import { faCircleNotch, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { MinusIcon, PlusIcon } from '../../../utils/IconSVG/index';
import Button from '../../../utils/Button';
import Lottie from 'lottie-react';
import successAnimate from '../../../assets/animationJson/animateSuccess.json';
import { useDispatch } from 'react-redux';
import { addProdList } from '../../../slice/product.slice';
function InfoProduct({ product, userId, userProducts, refreshUserData }) {
  const dispatch = useDispatch();

  const [itemCnt, setItemCnt] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowSuccess = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 1700);
  };
  const handleAddProd = async (e) => {
    e.preventDefault();
    let flag = 0;
    handleShowSuccess();
    setIsLoading(true);
    console.log(userProducts);
    userProducts.forEach((element) => {
      if (element.productId === product._id) {
        element.quantity += 1;
        flag = 1;
      }
    });
    if (flag === 1) {
      dispatch(addProdList({ userId: userId, newData: userProducts, isChanged: false }))
        .then(() => {
          refreshUserData();
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error dispatching action:', error);
          setIsLoading(false);
        });
    } else {
      const data = {
        userId: userId,
        newData: [...userProducts, { productId: product._id, quantity: 1 }],
        isChanged: true,
      };

      dispatch(addProdList(data))
        .then(() => {
          refreshUserData();
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error dispatching action:', error);
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="bg-white px-8 py-6 rounded-xl border-[1px] dark:border-gray-700 dark:bg-dark-ground border-gray-300">
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
          <p className="ml-3 text-sm opacity-50 ">{`(${product.numberRatings})`}</p>
        </div>
      </div>
      <div className="w-full h-[1px] my-6 bg-gray-200 dark:bg-gray-700"></div>
      <div>
        <div className="flex gap-2 items-end text-3xl font-semibold">
          <p className="">{product.price}</p>
          or
          <p className="">{(product.price / 6).toFixed(2)}$/month</p>
        </div>
        <p className="mt-2 text-sm ">Suggested payments with 6 months special financing</p>
      </div>
      <div className="w-full h-[1px] my-6 bg-gray-300 dark:bg-gray-700"></div>
      <div className="flex items-center">
        <div className="flex items-center bg-gray-100 rounded-full dark:bg-[#3A3B3C]">
          <div
            className="px-3 dark:hover:text-dark-flat cursor-pointer rounded-l-full hover:bg-gray-300 transition-all  h-[52px] flex items-center"
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
            className="px-3 dark:hover:text-dark-flat cursor-pointer rounded-r-full hover:bg-gray-300 transition-all  h-[52px] flex items-center"
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
        <Button className="border-[2px] dark:bg-primary-dark-color border-primary-color font-semibold basis-[40%] text-center text-white py-3 rounded-full bg-primary-color  hover:opacity-90 transition-all">
          Buy Now
        </Button>
        <Button
          onClick={(e) => {
            handleAddProd(e);
          }}
          className="font-semibold min-w-[150px] basis-[40%] text-center dark:hover:bg-primary-dark-color text-primary-color py-3 rounded-full bg-white border-primary-color border-[2px] hover:bg-primary-color hover:text-white transition-all"
        >
          {isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Add to Cart'}
        </Button>
      </div>
      {showSuccessModal && (
        <div className="fixed m-auto z-[9999]  top-0 left-0 right-0 bottom-0 w-[300px] h-[240px]  bg-white rounded-2xl shadow-lg">
          <div className="w-[200px] h-[200px] mx-auto">
            <Lottie animationData={successAnimate} loop={false}></Lottie>
          </div>
          <p className="font-OpenSans text-center font-medium">Product added successfully !!!</p>
        </div>
      )}
    </div>
  );
}

export default InfoProduct;
