import img from '../../assets/img/user/lightmode.png';
import img1 from '../../assets/img/user/darkmode.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
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
      <header className="text-2xl font-bold">Security</header>
      <p className="text-sm text-gray-700 mt-1 font-normal dark:text-gray-400">Manage settings for your security</p>
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-5"></div>
      <header className="text-lg font-bold">Password information</header>
      <div>
        <div className="flex mt-2 gap-8">
          <div className="basis-1/2">
            <header className="text-sm mb-2">Current password</header>
            <input
              type="password"
              className="outline-[1px] dark:bg-[#3A3B3C] dark:border-[0px] dark:outline-none dark:caret-white dark:text-dark-text outline-blue-600 w-full px-4 py-2 rounded-lg border-[1px] border-gray-400 text-gray-800 "
              placeholder="••••••••"
            ></input>
          </div>
          <div className="basis-1/2"></div>
        </div>
        <div className="flex mt-2 gap-8">
          <div className="basis-1/2">
            <header className="text-sm mb-2">New password</header>
            <input
              type="password"
              className="outline-[1px] dark:bg-[#3A3B3C] dark:border-[0px] dark:outline-none dark:caret-white dark:text-dark-text outline-blue-600 w-full px-4 py-2 rounded-lg border-[1px] border-gray-400 text-gray-800 "
              placeholder="••••••••"
            ></input>
          </div>
          <div className="basis-1/2">
            <header className="text-sm mb-2">Confirm password</header>
            <input
              type="password"
              className="outline-[1px] dark:bg-[#3A3B3C] dark:border-[0px] dark:outline-none dark:caret-white dark:text-dark-text outline-blue-600 w-full px-4 py-2 rounded-lg border-[1px] border-gray-400 text-gray-800 "
              placeholder="••••••••"
            ></input>
          </div>
        </div>
        <div className="mt-6">
          <header className="font-semibold">Password requirements:</header>
          <p className="text-gray-700 dark:text-gray-400 text-sm ">Ensure that these requirements are met:</p>
          <p className="text-gray-700 dark:text-gray-400 text-sm pl-3 font-normal">
            At least 10 characters (and up to 100 characters)
          </p>
          <p className="text-gray-700 dark:text-gray-400 text-sm pl-3 font-normal">At least one lowercase character</p>
          <p className="text-gray-700 dark:text-gray-400 text-sm pl-3 font-normal">
            Inclusion of at least one special character, e.g., ! @ # ?
          </p>
        </div>
        <div className=" mt-4 px-4 py-2 bg-primary-color dark:bg-primary-dark-color w-[100px] text-center rounded-full text-white cursor-pointer hover:opacity-80 transition-all ">
          Save all
        </div>
      </div>
    </div>
  );
}

export default Setting;
