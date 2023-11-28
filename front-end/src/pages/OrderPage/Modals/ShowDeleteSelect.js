function ShowDeleteSelect({ deleteId, setDeleteId, message, content, setShowDeleteSelect, handleDeleteAddress }) {
  return (
    <div className="modal fixed top-0 animate-slideTopDown right-0 left-0 bottom-0 bg-black/30 z-[51] ">
      <div className="absolute py-6 px-6 top-[50%] translate-y-[-50%] overflow-hidden w-[420px] right-[50%] rounded-xl translate-x-[50%] bg-white">
        <header className="text-xl font-bold">{message}</header>
        <p className="mt-5 text-sm">{content}</p>
        <div className="flex items-center gap-6 mt-5">
          <div
            onClick={() => {
              setShowDeleteSelect(0);
              setDeleteId('');
            }}
            className="bg-gray-300 px-6 cursor-pointer hover:opacity-80 transition-all py-2 rounded-lg"
          >
            Cancel
          </div>
          <div
            onClick={() => {
              setShowDeleteSelect(0);
              handleDeleteAddress(deleteId);
            }}
            className=" px-6 cursor-pointer py-2 rounded-lg hover:opacity-80 transition-all bg-orange-400 text-white"
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowDeleteSelect;
