import { Link } from 'react-router-dom';

function SearchProduct({ searchProd, handleClickToProd }) {
  return (
    <div>
      {searchProd.map((el, idx) => {
        return (
          <Link
            onClick={handleClickToProd}
            to={`/product/${el._id}`}
            key={idx}
            className="hover:bg-gray-100 transition-all flex px-4 py-2 gap-3"
          >
            <div
              style={{ backgroundImage: `url(${el?.images[0]})` }}
              className="h-[50px] min-w-[50px] w-[50px] bg-white border-[1px] bg-no-repeat bg-center bg-contain rounded-md"
            ></div>
            <div>
              <header className="text-sm line-clamp-1 font-semibold">{el.name}</header>
              <div className="flex items-center gap-1">
                <p className="text-xs  text-gray-600">Price: </p>
                <p className="text-sm text-red-700">{`${el.price}$`}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SearchProduct;
