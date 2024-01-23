import img from '../../../assets/img/user/lightmode.png';
import img1 from '../../../assets/img/user/darkmode.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import SecuritySetting from './SecuritySetting';
function Setting() {
  const [themeState, setThemeState] = useState(1);
  useEffect(() => {
    if (localStorage.getItem('config')) {
      const obj = JSON.parse(localStorage.getItem('config'));
      if (obj.mode === 'dark') {
        setThemeState(2);
      }
    }
  }, []);
  const handleChangeDarkMode = () => {
    if (localStorage.getItem('config')) {
      const obj = JSON.parse(localStorage.getItem('config'));
      if (obj.mode === 'light') {
        setThemeState(2);
        localStorage.setItem('config', JSON.stringify({ mode: 'dark' }));
        const appjs = document.getElementById('appjs');
        appjs.classList.add('dark');
      }
    }
  };
  const handleChangeLightMode = () => {
    if (localStorage.getItem('config')) {
      const obj = JSON.parse(localStorage.getItem('config'));
      if (obj.mode === 'dark') {
        setThemeState(1);
        localStorage.setItem('config', JSON.stringify({ mode: 'light' }));
        const appjs = document.getElementById('appjs');
        appjs.classList.remove('dark');
      }
    }
  };
  return (
    <div className="px-10 py-10 animate-slideTopDown dark:text-dark-text">
      <header className="text-2xl font-bold">Apperance</header>
      <p className="text-sm text-gray-700 dark:text-gray-400 mt-1 font-normal">
        Manage settings for your looking apperance
      </p>
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-5"></div>
      <div>
        <header className="text-lg font-bold">Theme</header>
        <p className="text-sm text-gray-700 dark:text-gray-400 font-normal">
          This will change primary theme for your page
        </p>
        <div className="mt-4 flex gap-6">
          <div>
            <div
              onClick={() => {
                setThemeState(1);
                handleChangeLightMode();
              }}
              className={`${
                themeState === 1 ? 'border-black' : 'border-white'
              } dark:border-dark-ground w-[240px] h-[140px] border-[2px] cursor-pointer  bg-no-repeat bg-center bg-cover rounded-xl`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
            <p className="text-center text-sm mt-1 text-gray-800 dark:text-gray-400">Light Mode</p>
          </div>
          <div>
            <div
              onClick={() => {
                setThemeState(2);
                handleChangeDarkMode();
              }}
              className={`${
                themeState === 2 ? 'border-black' : 'border-white'
              } dark:border-dark-text w-[240px] h-[140px] border-[2px] cursor-pointer  bg-no-repeat bg-center bg-cover rounded-xl`}
              style={{ backgroundImage: `url(${img1})` }}
            ></div>
            <p className="text-center text-sm mt-1 text-gray-800 dark:text-gray-400">Dark Mode</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <header className="text-lg font-bold">Language</header>

        <Menu>
          <MenuHandler>
            <div className="flex items-center justify-between px-3 py-2 border-[2px] dark:border-gray-700 cursor-pointer border-gray-400 mt-3 w-[160px] rounded-lg ">
              <div>English</div>
              <FontAwesomeIcon className="text-gray-600" icon={faChevronDown}></FontAwesomeIcon>
            </div>
          </MenuHandler>
          <MenuList>
            <MenuItem className="font-OpenSans text-base">English</MenuItem>
            <MenuItem className="font-OpenSans text-base">Tiếng Việt</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-8"></div>
      <SecuritySetting />
    </div>
  );
}

export default Setting;
