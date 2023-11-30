import { Link } from 'react-router-dom';
import { technology, fashion, furniture, education, beauty } from './fake';

function CategoryMenu() {
  return (
    <div className="flex py-8 px-8">
      <div className="basis-1/5">
        <Link to="/type/tech" className="text-lg hover:text-orange-400 transition-all hover:pl-3 font-bold">
          Technology
        </Link>
        <div className="mt-2 text-sm text-gray-800 flex flex-col gap-2">
          {technology.map((el, idx) => {
            return (
              <Link
                to={el.link}
                key={idx}
                className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all"
              >
                {el.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="basis-1/5">
        <Link to={'/type/clothes'} className="text-lg font-bold hover:text-orange-400 transition-all hover:pl-3">
          Fashion
        </Link>
        <div className="mt-2 text-sm text-gray-800 flex flex-col gap-2">
          {fashion.map((el, idx) => {
            return (
              <Link
                to={el.link}
                key={idx}
                className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all"
              >
                {el.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="basis-1/5">
        <Link to={'/type/furniture'} className="hover:text-orange-400 transition-all hover:pl-3 text-lg font-bold">
          Furniture
        </Link>
        <div className="mt-2 text-sm text-gray-800 flex flex-col gap-2">
          {furniture.map((el, idx) => {
            return (
              <Link
                to={el.link}
                key={idx}
                className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all"
              >
                {el.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="basis-1/5">
        <Link to={'/type/education'} className="hover:text-orange-400 transition-all hover:pl-3 text-lg font-bold">
          Education
        </Link>
        <div className="mt-2 text-sm text-gray-800 flex flex-col gap-2">
          {education.map((el, idx) => {
            return (
              <Link
                to={el.link}
                key={idx}
                className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all"
              >
                {el.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="basis-1/5">
        <Link to={'/type/beauty'} className=" hover:text-orange-400 transition-all hover:pl-3 text-lg font-bold">
          Beauty
        </Link>
        <div className="mt-2 text-sm text-gray-800 flex flex-col gap-2">
          {beauty.map((el, idx) => {
            return (
              <Link
                to={el.link}
                key={idx}
                className="hover:text-orange-400 inline-flex cursor-pointer hover:pl-3 transition-all"
              >
                {el.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryMenu;
