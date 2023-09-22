import img from '../../assets/img/cart/test.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Button from '../../utils/Button';
function CartComponent() {
  return (
    <div className=" bg-white shadow-lg cursor-pointer hover:scale-[1.05] transition-all">
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="h-[200px] w-[200px] text-center bg-no-repeat bg-contain mt-2 mx-auto"
      ></div>
      <div className="px-5 mt-3">
        <h3 className="text-lg font-bold">Iphone 13 128GB | VN/A </h3>
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
        <Button className="mb-6 mt-3 hover:bg-primary-color hover:text-white px-[20px] py-[10px] text-base rounded-full text-primary-color bg-white border border-primary-color transition-all">
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default CartComponent;
