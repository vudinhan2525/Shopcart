import { SearchIcon } from '../../../utils/IconSVG';

function Search() {
  return (
    <div className="w-[400px] flex bg-gray-100 dark:bg-[#3A3B3C] rounded-full">
      <input
        type="text"
        placeholder="Search product"
        className="dark:caret-white dark:text-dark-text outline-0 py-3 px-6  w-full bg-gray-100 dark:bg-[#3A3B3C] rounded-full"
        spellCheck="false"
      ></input>
      <div className="flex items-center relative py-3 px-4 cursor-pointer rounded-r-full text-[#a7a7ab] hover:text-black  hover:bg-[#e4e4e6] dark:hover:bg-gray-600 after:w-[1px] after:h-8 after:bg-gray-300 after:translate-y-[-50%] after:absolute after:top-[50%] after:left-0">
        <SearchIcon />
      </div>
    </div>
  );
}

export default Search;
