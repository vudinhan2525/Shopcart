import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo';
import { UserIcon, CartIcon } from '../../utils/IconSVG/index';
import Search from './Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import ConditionalLink from '../../utils/ConditionalLink/ConditionalLink';
import img from '../../assets/img/user/avatar3d.jpg';
function HeaderComponent() {
  const { isLoggedIn, setShowLoginModal, userData } = useContext(AuthContext);
  return (
    <div className="flex py-2 backdrop-blur-md bg-[#F5F5F7]/70 items-center shadow-sm fixed top-0 right-0 left-0 z-50">
      <Link to="/" className="basis-1/4">
        <div className="w-52 mx-auto h-12 relative">
          {logo()}
          <p className="absolute top-[50%] translate-y-[-50%] right-[5%] font-bold text-xl text-primary-color">
            ShopCart
          </p>
        </div>
      </Link>
      <div className="basis-2/4 flex items-center justify-between mr-10">
        <div className="flex">
          <li className="after:absolute after:bottom-[-20%] after:w-[200px]  after:h-[20px]  relative flex peer hover:bg-gray-200 w-[110px] justify-center items-center gap-2 cursor-pointer p-3 text-[15px] rounded-full transition-all  text-black">
            <p>Category</p>
            <FontAwesomeIcon icon={faChevronDown} />
          </li>
          <div className="bg-white z-10 shadow-lg rounded-b-xl absolute animate-scaleIn hover:block hidden peer-hover:block border-[1px] w-[80%] bottom-0 translate-y-[100%] right-[50%] translate-x-[50%]">
            <CategoryMenu />
          </div>
          <li className="flex hover:bg-gray-200 justify-center items-center gap-2 cursor-pointer p-3 text-[15px] rounded-full transition-all text-black">
            <p>Become Seller</p>
          </li>
        </div>
        <Search />
      </div>
      <ul className="flex basis-1/4 gap-3">
        {isLoggedIn ? (
          <></>
        ) : (
          <>
            <li
              onClick={() => {
                setShowLoginModal(true);
              }}
              className="flex w-[110px] justify-center items-center gap-2 cursor-pointer p-3 text-[15px] rounded-full transition-all bg-primary-color text-white hover:opacity-90"
            >
              <UserIcon />
              <p>Account</p>
            </li>
          </>
        )}
        {isLoggedIn && (
          <Link
            to={'/setting'}
            className="select-none flex justify-center items-center gap-2 cursor-pointer pl-2 pr-3 py-1 text-[15px] rounded-full transition-all hover:bg-gray-200"
          >
            <div
              className="w-[40px] h-[40px] bg-no-repeat bg-center bg-contain rounded-full"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
            <p className="w-[60px] h-[20px] line-clamp-1">{userData.firstName + ' ' + userData.lastName}</p>
          </Link>
        )}

        <ConditionalLink
          onClick={() => setShowLoginModal(true)}
          to="/order"
          condition={isLoggedIn}
          className="select-none flex w-[110px] justify-center items-center gap-2 cursor-pointer p-3 text-[15px] rounded-full transition-all hover:bg-gray-200"
        >
          <CartIcon />
          <p>Cart </p>
        </ConditionalLink>
      </ul>
    </div>
  );
}

export default HeaderComponent;
