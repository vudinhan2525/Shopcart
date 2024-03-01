import { Link } from 'react-router-dom';
import logoimg from '../../assets/img/logoimg.png';
import { UserIcon, CartIcon } from '../../utils/IconSVG/index';
import Search from './Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import ConditionalLink from '../../utils/ConditionalLink/ConditionalLink';
import UserMenu from './UserMenu/UserMenu';
import NotificationMenu from './NotificationMenu/NotificationMenu';
function HeaderComponent({ isAdminPage }) {
  const { isLoggedIn, setShowLoginModal, setShowLogoutModal, userData } = useContext(AuthContext);

  return (
    <div className="flex justify-between py-2 backdrop-blur-md bg-[#F5F5F7]/70 dark:bg-dark-flat/80 items-center shadow-sm fixed top-0 right-0 left-0 z-50">
      <div className="basis-1/4">
        <Link to="/" className="w-52 mx-auto block h-12 relative">
          <div
            className={`w-12 h-12 bg-no-repeat bg-contain ${isAdminPage ? '' : 'ml-12'}`}
            style={{ backgroundImage: `url(${logoimg})` }}
          ></div>
          <p
            className={`absolute top-[50%] translate-y-[-50%] ${
              isAdminPage ? 'right-[30%]' : 'right-[5%]'
            } font-bold text-xl text-primary-color dark:text-[#e8e5e5]`}
          >
            ShopCart
          </p>
        </Link>
      </div>
      {!isAdminPage && (
        <div className="basis-2/4 flex items-center justify-between mr-10">
          <div className="flex">
            <li className="after:absolute dark:text-dark-text dark:hover:text-black after:bottom-[-20%] after:w-[200px]  after:h-[20px]  relative flex peer hover:bg-gray-200 w-[110px] justify-center items-center gap-2 cursor-pointer p-3 text-[15px] rounded-full transition-all  text-black">
              <p>Category</p>
              <FontAwesomeIcon icon={faChevronDown} />
            </li>
            <div className="bg-white dark:bg-dark-flat z-10 shadow-lg rounded-b-xl absolute animate-scaleIn hover:block hidden peer-hover:block  w-[80%] bottom-0 translate-y-[100%] right-[50%] translate-x-[50%]">
              <CategoryMenu />
            </div>
            <li className="flex hover:bg-gray-200 dark:text-dark-text dark:hover:text-black justify-center items-center gap-2 cursor-pointer p-3 text-[15px] rounded-full transition-all text-black">
              <Link to="/admin/dashboard" target="_blank">
                Become Seller
              </Link>
            </li>
          </div>
          <Search />
        </div>
      )}
      <ul className="flex basis-1/4 gap-3 items-center">
        {isLoggedIn ? (
          <></>
        ) : (
          <>
            <li
              onClick={() => {
                setShowLoginModal(true);
              }}
              className="dark:text-dark-text dark:hover:text-black dark:bg-primary-dark-color flex w-[110px] justify-center items-center gap-2 cursor-pointer p-3 text-[15px] rounded-full transition-all bg-primary-color text-white hover:opacity-90"
            >
              <UserIcon />
              <p>Account</p>
            </li>
          </>
        )}
        {isLoggedIn && <UserMenu userData={userData} setShowLogoutModal={setShowLogoutModal} />}

        <ConditionalLink
          onClick={() => setShowLoginModal(true)}
          to="/order"
          condition={isLoggedIn}
          className="dark:text-dark-text dark:hover:text-black select-none relative flex justify-center items-center cursor-pointer p-3 text-[15px] rounded-full transition-all hover:bg-gray-200"
        >
          <CartIcon width="26px" height="26px" />

          <p className="absolute bg-orange-600 px-2  top-0 text-white text-sm font-semibold rounded-full right-0">
            {userData.products?.length}
          </p>
        </ConditionalLink>
        {userData && Object.keys(userData).length > 0 && <NotificationMenu userData={userData} />}
      </ul>
    </div>
  );
}

export default HeaderComponent;
