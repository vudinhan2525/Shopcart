import categories from './fake';
function CategoryComponent() {
  return (
    <div className="mt-5 py-12">
      <h4 className="text-[26px] leading-[32px] font-bold ">Shop Our Top Categories</h4>
      <div className="grid grid-cols-6 mt-8 gap-6 max-lg:gap-4 max-lg:grid-cols-3">
        {categories.map((el, idx) => {
          return (
            <div className="h-[250px] max-lg:h-[341px] relative overflow-hidden rounded-xl " key={idx}>
              <div
                className="h-full bg-no-repeat bg-center bg-cover cursor-pointer hover:scale-[1.3] transition-all"
                style={{ backgroundImage: `url(${el.img})` }}
              ></div>
              <p className="absolute w-[200px] text-center top-[10px] left-[50%] translate-x-[-50%] text-white text-2xl font-semibold">
                {el.header}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryComponent;
