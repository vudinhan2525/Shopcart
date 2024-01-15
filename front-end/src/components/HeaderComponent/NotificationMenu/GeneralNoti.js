function GeneralNoti({ notiGeneral }) {
  return (
    <div className="max-h-[350px] overflow-y-auto">
      {notiGeneral.map((el, idx) => {
        return (
          <div key={idx} className="flex px-3 gap-3 py-2 items-center">
            <div
              className=" w-[40px] h-[40px] bg-no-repeat bg-center bg-contain rounded-full"
              style={{ backgroundImage: `url(${el.images})` }}
            ></div>
            <div className="flex-1">
              <p className="text-base text-black line-clamp-1 font-semibold">{el.header}</p>
              <p className="line-clamp-2 text-sm">{el.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GeneralNoti;
