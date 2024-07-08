import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '../../../utils/IconSVG';
import SearchHistory from './SearchHistory';
import { useState, useRef, useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import http from '../../../utils/http';
import SearchProduct from './SearchProduct';
import SearchShop from './SearchShop';
function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState('');
  const [searchProd, setSearchProd] = useState([]);
  const [searchShop, setSearchShop] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const debounce = useDebounce(input, 300);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  const handleHistory = () => {
    if (input.trim() === '') return;
    //process for history search
    const obj = localStorage.getItem('history');
    if (obj) {
      let data = JSON.parse(obj).historySearch;
      if (data.length === 5) {
        data.pop();
      }
      data.unshift(input);
      localStorage.setItem('history', JSON.stringify({ historySearch: data }));
    } else {
      localStorage.setItem('history', JSON.stringify({ historySearch: [input] }));
    }
    setIsFocused(false);
    navigate(`/search/${input}`);
  };
  const handleSearch = async () => {
    try {
      const response = await http.get(`/search/searchFuzzy/${debounce}`);
      const response2 = await http.get(`/search/searchShop/${debounce}`);
      if (response.data.status === 'success') {
        setSearchProd(response.data.data);
      }
      if (response2.data.status === 'success') {
        setSearchShop(response2.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (debounce.trim() !== '') {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce]);
  const handleClickToProd = () => {
    setInput('');
    setIsFocused(false);
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <div className="w-[400px] flex bg-gray-200 border-[1px] dark:bg-[#3A3B3C] dark:border-transparent rounded-full">
        <input
          type="text"
          value={input}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleHistory();
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search product"
          className="dark:caret-white dark:text-dark-text outline-0 py-3 px-6  w-full bg-gray-200 dark:bg-[#3A3B3C] rounded-full"
          spellCheck="false"
          onFocus={() => setIsFocused(true)}
        ></input>
        <div
          onClick={() => handleHistory()}
          className="flex items-center relative py-3 px-4 cursor-pointer rounded-r-full text-[#a7a7ab] hover:text-black  hover:bg-[#e4e4e6] dark:hover:bg-gray-600 after:w-[1px] after:h-8 after:bg-gray-300 after:translate-y-[-50%] after:absolute after:top-[50%] after:left-0"
        >
          <SearchIcon />
        </div>
      </div>
      <div
        className={`bg-white top-[110%] ${
          isFocused ? 'block' : 'hidden'
        } w-[500px]  absolute left-[50%] animate-scaleIn translate-x-[-50%] rounded-xl shadow-lg`}
      >
        <div className=" py-4">
          {input.trim() === '' && (
            <>
              <header className="text-[13px] leading-[20px] px-4 text-gray-700">Search history</header>
              <SearchHistory setIsFocused={setIsFocused} />
            </>
          )}
          {searchProd && searchProd.length > 0 && (
            <div>
              <header className="text-[13px] leading-[20px] px-4 text-gray-700">Products</header>
              <SearchProduct searchProd={searchProd} handleClickToProd={handleClickToProd} />
            </div>
          )}
          {searchShop && searchShop.length > 0 && (
            <div>
              <header className="text-[13px] leading-[20px] px-4 text-gray-700">Shops</header>
              <SearchShop searchShop={searchShop} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
