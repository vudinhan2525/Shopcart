import img from '../../assets/img/cart/test.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Button from '../../utils/Button';
function CartComponent({ isSmall = false }) {
  return (
    <div className="relative bg-white border-[1px] border-gray-300 cursor-pointer transition-all rounded-lg">
      <div className={` overflow-hidden`}>
        <div
          style={{ backgroundImage: `url(${img})` }}
          className={`${
            isSmall ? 'h-[150px] w-[150px]' : 'h-[200px] w-[200px]'
          } text-center bg-no-repeat bg-contain mt-2 mx-auto hover:scale-[1.1] transition-all`}
        ></div>
      </div>
      <div className="px-5 mt-3">
        <h3 className={`${isSmall ? 'text-base' : 'text-lg'} font-bold`}>Iphone 13 128GB | VN/A </h3>
        <div className="flex gap-6 items-center mt-1">
          <p className="text-base font-bold text-red-600">456.00 $</p>
          <p className="text-sm opacity-60 line-through">600.00 $</p>
        </div>
        <div className="flex items-center mt-1">
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <FontAwesomeIcon className="text-[#08AC0A] w-4" icon={faStar} />
          <p className="ml-3 text-sm">(121)</p>
        </div>
        <Button
          className={`mb-6 mt-3 hover:bg-primary-color hover:text-white ${
            isSmall ? 'px-[12px] py-[7px]' : 'px-[20px] py-[10px]'
          } text-base rounded-full text-primary-color bg-white border border-primary-color transition-all`}
        >
          Add to cart
        </Button>
      </div>
      <div
        className={`${
          isSmall ? 'w-[40px] h-[40px]' : 'w-[50px] h-[50px]'
        } absolute hover:bg-gray-200 transition-all  flex items-center bg-[#F5F6F6] rounded-full top-[2%] right-[3%]`}
      >
        <FontAwesomeIcon icon={faHeart} className={`${isSmall ? 'text-lg' : 'text-xl'} mx-auto`} />
      </div>
    </div>
  );
}

export default CartComponent;
