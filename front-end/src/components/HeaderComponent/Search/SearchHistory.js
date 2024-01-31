import { faClock, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function SearchHistory({ setIsFocused }) {
  const [searchs, setSearchs] = useState([]);
  const getSearchHistory = () => {
    const obj = localStorage.getItem('history');
    if (obj) {
      const data = JSON.parse(obj);
      setSearchs(data.historySearch);
    }
  };
  const handleDeleteHistory = (idx) => {
    const newArr = searchs.filter((el, id) => id !== idx);
    localStorage.setItem('history', JSON.stringify({ historySearch: newArr }));
    getSearchHistory();
  };
  useEffect(() => {
    getSearchHistory();
  }, []);
  return (
    <div>
      {searchs.map((el, idx) => {
        return (
          <Link
            to={`/search/${el}`}
            key={idx}
            onClick={(e) => {
              if (e.target.closest('.close')) {
              } else setIsFocused(false);
            }}
            className="flex items-center justify-between px-4 cursor-pointer hover:bg-gray-100 transition-all py-[10px]"
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-gray-500" />
              <p className="text-sm">{el}</p>
            </div>
            <FontAwesomeIcon
              onClick={(e) => {
                e.preventDefault();
                handleDeleteHistory(idx);
              }}
              icon={faXmarkCircle}
              className="close text-gray-500 w-4 h-4 hover:text-gray-600 transition-all"
            />
          </Link>
        );
      })}
    </div>
  );
}

export default SearchHistory;
