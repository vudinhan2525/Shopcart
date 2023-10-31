import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FacebookIcons, GoogleIcons, InstagramIcons, TwiterIcons } from '../../utils/IconSVG/index';
function RegisterPage() {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-register-ct  w-full">
      <div className="right-[50%] translate-x-[50%] translate-y-[-50%] overflow-hidden rounded-[30px] shadow-xl top-[50%] absolute w-[1000px]  bg-white">
        <div className="flex">
          <div className="basis-1/2">
            <div className="px-8 py-8 ">
              <header className="text-center text-4xl font-bold text-gray-800 mb-2">Sign up</header>
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
              <p className="ml-2 font-bold mt-3 mb-1">Confirm Password</p>
              <div className="flex items-center relative">
                <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full bg-[#F1EFF1] outline-none px-12 font-semibold py-3 rounded-full"
                ></input>
              </div>
              <div className="mt-[15px] select-none cursor-pointer transition-all hover:opacity-80 mx-auto text-center bg-primary-color w-[150px] px-6 py-3 rounded-full text-white text-lg font-semibold">
                Sign Up
              </div>
              <p className="text-center mt-4">Or sign up with social platforms</p>
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
            </div>
          </div>
          <div className="relative basis-1/2 bg-primary-color text-[#FFE6CC] rounded-l-[150px]">
            <header className="text-center mt-[35%] text-[40px] leading-[42px]  font-bold">
              Hello from ShopCart !!!
            </header>
            <p className="mt-6 text-center max-w-[350px] text-lg mx-auto">
              Register with your personal details to use all of site features
            </p>
            <div className="group mt-4 text-center select-none bg-[#FFE6CC] text-primary-color w-[170px] cursor-pointer mx-auto py-3 rounded-full">
              <div className="group-hover:pl-2 inline-block transition-all">Visit Shopcart</div>
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </div>
            <div className="absolute w-[10px] top-0 h-[100%] bg-primary-color right-[-1px] "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
