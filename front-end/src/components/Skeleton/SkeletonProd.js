function SkeletonProd() {
  return (
    <div role="status" className="animate-pulse px-8 py-6 border-[1px] border-gray-300">
      <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-1" />
      <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-[60%] mb-4" />
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 " />
      <div className="w-full h-[1px] my-6 bg-gray-200"></div>
      <div className="h-10 mt-8 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
      <div className="w-full h-[1px] my-6 bg-gray-200"></div>
      <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-[50%] mb-2.5" />
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[20%] mb-2.5" />
      <div className="flex mt-4 gap-10">
        <div className="h-12 bg-gray-200 rounded-full dark:bg-gray-700 w-[120px]"></div>
        <div className="h-12 bg-gray-200 rounded-full dark:bg-gray-700 w-[120px]"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default SkeletonProd;
