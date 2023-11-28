import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Button from '../../utils/Button';
function CartComponent({ isSmall = false, product }) {
  return (
    <Link
      to={`/product/${product?._id}`}
      className="relative bg-white border-[1px] border-gray-300 animate-slideTopDown cursor-pointer transition-all rounded-lg"
    >
      <div className={` overflow-hidden`}>
        <div
          style={{ backgroundImage: `url(${product?.images[0]})` }}
          className={`${
            isSmall ? 'h-[150px] w-[150px]' : 'h-[200px] w-[200px]'
          } text-center bg-no-repeat bg-center bg-contain mt-2 mx-auto hover:scale-[1.1] transition-all`}
        ></div>
      </div>
      <div className="px-5 mt-3">
        <h3 className={`${isSmall ? 'text-base h-[48px] line-clamp-2' : 'text-lg h-[56px] line-clamp-2'} font-bold`}>
          {product?.name}
        </h3>
        <div className="flex gap-6 items-center mt-1">
          <p className="text-base font-bold text-red-600">{`${product?.price.toFixed(2)} $`}</p>
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
    </Link>
  );
}

export default CartComponent;
