import { Link } from 'react-router-dom';
import categories from './fake';
function CategoryComponent() {
  return (
    <div className="pt-5 py-12">
      <h4 className="text-[26px] leading-[32px] font-bold ">Shop Our Top Categories</h4>
      <div className="grid grid-cols-6 mt-8 gap-6 max-lg:gap-4 max-lg:grid-cols-3">
        {categories.map((el, idx) => {
          return (
            <Link to={el.link} key={idx} className="h-[250px] max-lg:h-[341px] relative overflow-hidden rounded-xl ">
              <div
                className="h-full bg-no-repeat bg-center bg-cover cursor-pointer hover:scale-[1.3] transition-all"
                style={{ backgroundImage: `url(${el.img})` }}
              ></div>
              <p className="absolute w-[200px] text-center top-[10px] left-[50%] translate-x-[-50%] text-white text-2xl font-semibold">
                {el.header}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryComponent;
