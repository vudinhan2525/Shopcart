import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/img/shop/logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserIcon, StarDefault } from '../../../utils/IconSVG';
import IntroducePost from './IntroducePost/IntroducePost';
import { ChevronDown } from '../../../utils/IconSVG';
function IntroduceProduct() {
  return (
    <div className=" w-full bg-white rounded-xl mt-10 border-[1px] py-7 px-7 h-[658px] overflow-hidden relative">
      <div className="flex gap-4">
        <div>
          <div
            style={{ backgroundImage: `url(${logo})` }}
            className="w-[120px] h-[120px] bg-no-repeat bg-center bg-contain rounded-full"
          ></div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <header className="text-2xl font-semibold">ShopDunk Official Store</header>
            <FontAwesomeIcon icon={faCircleCheck} className="text-lg text-[#20D5EC]" />
          </div>
          <p className="mt-1">Official store ShopDunk, sell everything about technology</p>
          <p className="mt-2 text-sm text-gray-500">Last active: 6 minutes ago</p>
          <div className="flex gap-10 mt-1">
            <div className="flex items-center gap-1">
              <div className="w-[18px] h-[18px]">
                <UserIcon />
              </div>
              <p className="text-sm">Followers: 34.5k</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-[18px] h-[18px]">
                <StarDefault />
              </div>
              <p className="text-sm">Average Rating: 4.5</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="mt-2 text-white cursor-pointer bg-primary-color border-[1.5px] border-primary-color w-[120px] text-center rounded-full py-2 hover:opacity-90 transition-all">
              Follow
            </div>
            <div className="mt-2 text-primary-color cursor-pointer bg-white border-[1.5px] border-primary-color w-[120px] text-center rounded-full py-2 hover:bg-primary-color hover:text-white transition-all">
              Chat Now
            </div>
          </div>
        </div>
      </div>
      <IntroducePost />
      <div className="absolute bottom-0 w-[100%] h-[30px] linear-ct"></div>
      <div className="absolute bottom-[0px] cursor-pointer flex border-2 translate-x-[-50%] left-[50%] mx-auto w-[120px] text-center rounded-full bg-white ">
        <div className="flex items-center mx-auto">
          <div className="py-[6px]">More</div>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

export default IntroduceProduct;
