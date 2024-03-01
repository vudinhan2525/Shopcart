import { faCamera, faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Menu, MenuHandler, MenuList, MenuItem, Checkbox, Button } from '@material-tailwind/react';
const types = ['Education', 'Furniture', 'Technology', 'Beauty', 'Fashion', 'Other'];
function CreateShopModal({ setShowCreateModal }) {
  const [shopTypes, setShopTypes] = useState([]);
  useEffect(() => {
    console.log(shopTypes);
  }, [shopTypes]);
  return (
    <div className="z-[51] fixed top-0 bottom-0 animate-slideTopDown right-0 left-0 bg-black/20">
      <div className="absolute py-6 px-6 top-[10%] overflow-hidden dark:bg-dark-flat w-[70%] right-[50%] rounded-xl translate-x-[50%] bg-white">
        <div className="flex items-center justify-between">
          <header className="text-2xl font-bold">Create a store</header>
          <div className="">
            <FontAwesomeIcon
              onClick={() => setShowCreateModal(false)}
              className="text-3xl cursor-pointer text-gray-700 hover:text-gray-900 transition-all"
              icon={faXmark}
            />
          </div>
        </div>
        <div className="flex gap-8 mt-2 border-[1px] py-4 px-4 rounded-lg">
          <div className="basis-[50%]">
            <div className="flex gap-6">
              <div className="text-sm font-semibold">Shop avatar:</div>
              <div className="bg-gray-100 flex  flex-col justify-center items-center rounded-lg border-[5px] border-dashed w-[130px] h-[130px]">
                <FontAwesomeIcon icon={faCamera} className="text-gray-500 text-5xl" />
                <p className="text-sm text-gray-500 font-semibold">Upload here</p>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-sm font-semibold">Shop background:</div>
              <div className="bg-gray-100 flex mt-2 flex-col justify-center items-center rounded-lg border-[5px] border-dashed w-full h-[160px]">
                <FontAwesomeIcon icon={faCamera} className="text-gray-500 text-5xl" />
                <p className="text-sm text-gray-500 font-semibold">Upload here</p>
              </div>
            </div>
            <div></div>
          </div>
          <div className="basis-[50%]">
            <div>
              <p className="text-sm font-semibold">Name:</p>
              <input className="mt-1 outline-none px-4 py-3 text-sm w-full bg-gray-100 rounded-md"></input>
            </div>
            <div>
              <p className="text-sm font-semibold mt-4">Description:</p>
              <textarea className="mt-1 outline-none px-4 h-[120px] text-sm py-3 w-full bg-gray-100 rounded-md"></textarea>
            </div>
            <div>
              <p className="text-sm font-semibold mt-4">Types:</p>
              <Menu placement="bottom">
                <MenuHandler>
                  <div className="mt-1 outline-none relative px-4 py-3 flex justify-between items-center h-[80px] text-sm w-full bg-gray-100 rounded-md">
                    <div className="grid grid-cols-3 gap-x-1 gap-y-1">
                      {shopTypes.map((el, idx) => {
                        return (
                          <div
                            key={idx}
                            className="px-2 gap-2 justify-between flex items-center py-1 bg-white rounded-md border-[1px]"
                          >
                            <p>{el}</p>
                            <FontAwesomeIcon
                              onClick={() => {
                                const newArr = shopTypes.filter((ele, idx) => ele !== el);
                                setShopTypes(newArr);
                              }}
                              className="cursor-pointer text-gray-800"
                              icon={faXmark}
                            ></FontAwesomeIcon>
                          </div>
                        );
                      })}
                    </div>
                    <div className="cursor-pointer">
                      <FontAwesomeIcon className="text-xl text-gray-700" icon={faChevronDown} />
                    </div>
                  </div>
                </MenuHandler>
                <MenuList className="w-[400px] font-OpenSans">
                  {types.map((el, idx) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          const found = shopTypes.find((element) => element === el);
                          if (!found) {
                            setShopTypes((prev) => [...prev, el]);
                          }
                        }}
                        key={idx}
                      >
                        {el}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Checkbox color="green" defaultChecked />
            <p className="text-gray-800 text-[15px] font-semibold">
              I have read and agreed to the terms and conditions
            </p>
          </div>
          <div>
            <Button color="green" className="font-OpenSans text-[13px]">
              Create new shop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateShopModal;
