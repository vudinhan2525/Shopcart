function NoResultFound() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(https://shopcartimg2.blob.core.windows.net/shopcartctn/no-results.png)` }}
        className="h-[200px] w-[200px] mt-20 mx-auto bg-no-repeat bg-center  bg-contain rounded-lg"
      ></div>
      <p className="flex justify-center text-2xl font-bold mt-4">No result found</p>
      <p className="flex justify-center text-sm dark:text-gray-500 text-gray-700">
        May be you dont have any invoices !!!
      </p>
    </>
  );
}

export default NoResultFound;
