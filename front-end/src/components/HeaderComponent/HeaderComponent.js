import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo';
import { UserIcon, CartIcon } from '../../utils/IconSVG/index';
function HeaderComponent() {
  return (
    <div className=" flex py-3 items-center">
      <Link to="/" className="basis-1/4">
        {logo()}
      </Link>
      <div className="basis-2/4">
        <input></input>
      </div>
      <ul className="flex basis-1/4 gap-5">
        <li className="flex gap-2 cursor-pointer p-3 rounded-full hover:bg-gray-100">
          {UserIcon()}
          <p>Account</p>
        </li>
        <li className="flex gap-2 cursor-pointer p-3 rounded-full hover:bg-gray-100">
          {CartIcon()}
          <p>Cart</p>
        </li>
      </ul>
    </div>
  );
}

export default HeaderComponent;
