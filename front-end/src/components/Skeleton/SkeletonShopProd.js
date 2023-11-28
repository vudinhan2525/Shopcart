function SkeletonShopProd() {
  return (
    <div role="status" className="animate-pulse mt-10 border-[1px] py-7 px-7">
      <div className="flex gap-4">
        <div className=" w-[120px] h-[120px] bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="flex-1">
          <div className="h-6 mt-2 w-[40%] bg-gray-200 rounded-full dark:bg-gray-700 " />
          <div className="h-3 mt-2 w-[100%] bg-gray-200 rounded-full dark:bg-gray-700 " />
          <div className="h-3 mt-2 w-[200px] bg-gray-200 rounded-full dark:bg-gray-700 " />
          <div className="flex mt-3 gap-10">
            <div className="h-5 mt-2 w-[100px] bg-gray-200 rounded-full dark:bg-gray-700 " />
            <div className="h-5 mt-2 w-[100px] bg-gray-200 rounded-full dark:bg-gray-700 " />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="h-6 mt-2 w-[40%] bg-gray-200 rounded-full dark:bg-gray-700 " />
        <div className="h-3 mt-2 w-[100%] bg-gray-200 rounded-full dark:bg-gray-700 " />
        <div className="h-3 mt-2 w-[100%] bg-gray-200 rounded-full dark:bg-gray-700 " />
        <div className="h-3 mt-2 w-[100%] bg-gray-200 rounded-full dark:bg-gray-700 " />
        <div className="h-3 mt-2 w-[100%] bg-gray-200 rounded-full dark:bg-gray-700 " />
      </div>
    </div>
  );
}

export default SkeletonShopProd;
