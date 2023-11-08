import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import img from '../../assets/img/user/avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SettingPage() {
  return (
    <div className="px-10">
      <div className="flex py-8 px-6">
        <div className="basis-[15%] ">
          <div className="flex items-center gap-2 cursor-pointer  group">
            <div>
              <div
                style={{ backgroundImage: `url(${img})` }}
                className="w-[60px] h-[60px] bg-no-repeat bg-center bg-contain"
              ></div>
            </div>
            <div className="relative w-full">
              <header className="font-bold">An Vũ</header>
              <p className="text-xs text-gray-600">View profile</p>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-sm right-[3%] group-hover:right-0 top-[50%] transition-all translate-y-[-50%] absolute"
              />
            </div>
          </div>
        </div>
        <div className="basis-[85%]"></div>
      </div>
    </div>
  );
}

export default SettingPage;
