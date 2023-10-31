import { faLock, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { FacebookIcons, GoogleIcons, InstagramIcons, TwiterIcons } from '../../utils/IconSVG';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
function LoginModal() {
  const { setShowLoginModal } = useContext(AuthContext);
  const handleTurnOffModal = (e) => {
    if (e.target.classList.contains('modal')) {
      setShowLoginModal(false);
    }
  };
  return (
    <div
      onClick={(e) => handleTurnOffModal(e)}
      className="modal fixed bg-black/50 top-0 bottom-0 left-0 right-0 z-[51]"
    >
      <div className="fixed px-8 py-8 rounded-2xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-white w-[500px] h-[500px]">
        <header className="text-center text-4xl font-bold text-gray-800 mb-6">Sign in</header>
        <p className="text-base ml-2 font-bold mb-1">Email</p>
        <div className="flex items-center relative">
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <input
            placeholder="Email"
            className="w-full bg-[#F1EFF1] outline-none px-12  font-semibold py-3 rounded-full"
          ></input>
        </div>
        <p className="ml-2 font-bold mt-3 mb-1">Password</p>
        <div className="flex items-center relative">
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#F1EFF1] outline-none px-12 font-semibold py-3 rounded-full"
          ></input>
        </div>
        <div className="mt-[20px] select-none cursor-pointer transition-all hover:opacity-80 mx-auto text-center bg-primary-color w-[150px] px-6 py-3 rounded-full text-white text-lg font-semibold">
          Login
        </div>
        <p className="text-center mt-4">Or sign in with social platforms</p>
        <div className="flex justify-center mt-2 gap-4">
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <FacebookIcons height="35px" width="35px" />
          </div>
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <GoogleIcons height="35px" width="35px" />
          </div>
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <InstagramIcons height="35px" width="35px" />
          </div>
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <TwiterIcons height="35px" width="35px" />
          </div>
        </div>
        <div className="bg-gray-200 h-[1px] w-full mt-5"></div>
        <div className="flex justify-center pt-3 gap-2">
          <div>You dont have an account?</div>
          <Link
            target="_blank"
            to="/register"
            onClick={() => setShowLoginModal(false)}
            className="text-[#EF2950] font-semibold underline cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
        <div
          onClick={() => setShowLoginModal(false)}
          className="bg-[#F5F6F6] hover:bg-gray-300 flex items-center justify-center w-[45px] h-[45px] absolute top-[25px] right-[30px] cursor-pointer rounded-full"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
