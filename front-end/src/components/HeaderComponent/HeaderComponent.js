import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo';
import { UserIcon, CartIcon, SearchIcon } from '../../utils/IconSVG/index';
function HeaderComponent() {
  return (
    <div className=" flex py-3 items-center">
      <Link to="/" className="basis-1/4">
        {logo()}
      </Link>
      <div className="basis-2/4 ">
        <div className="w-[500px] mx-auto flex bg-gray-100 rounded-full">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            className=" outline-0 py-3 px-6  w-full bg-gray-100 rounded-full"
            spellCheck="false"
          ></input>
          <div className="flex items-center py-3 px-4 cursor-pointer rounded-r-full text-[#a7a7ab] hover:text-black  hover:bg-[#e4e4e6]">
            {SearchIcon()}
          </div>
        </div>
      </div>
      <ul className="flex basis-1/4 gap-5">
        <li className="flex gap-2 cursor-pointer p-3 rounded-full hover:bg-gray-100">
          {UserIcon()}
          <p>Tài khoản</p>
        </li>
        <li className="flex gap-2 cursor-pointer p-3 rounded-full hover:bg-gray-100">
          {CartIcon()}
          <p>Giỏ Hàng</p>
        </li>
      </ul>
    </div>
  );
}

export default HeaderComponent;
