import { faCamera, faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { Menu, MenuHandler, MenuList, MenuItem, Checkbox, Button } from '@material-tailwind/react';
import http from '../../../utils/http';
import convertBackType from '../../../utils/convertBackType';
const types = ['Education', 'Furniture', 'Technologies', 'Beauty', 'Fashion', 'Other'];
function CreateShopModal({ setShowCreateModal }) {
  const [shopTypes, setShopTypes] = useState([]);
  const [preview1, setPreview1] = useState();
  const [preview2, setPreview2] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState([]);
  const inpRef1 = useRef();
  const inpRef2 = useRef();
  const handleChangeImage1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview1(url);
      setFile1(file);
      const newArr = error.filter((el) => el !== 'shopavatar');
      setError(newArr);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  };
  const handleChangeImage2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          if (image.width > 900 && image.height > 200) {
            const url = URL.createObjectURL(file);
            setPreview2(url);
            setFile2(file);
            const newArr = error.filter((el) => el !== 'shopbackground');
            setError(newArr);
            return () => {
              URL.revokeObjectURL(url);
            };
          } else {
            setError((prev) => [...prev, 'shopbackground']);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAddShop = async () => {
    if (!file1) setError((prev) => [...prev, 'shopavatar']);
    if (!file2) setError((prev) => [...prev, 'shopbackground']);
    if (name.trim() === '') setError((prev) => [...prev, 'name']);
    if (description.trim() === '') setError((prev) => [...prev, 'description']);
    if (shopTypes.length <= 0) setError((prev) => [...prev, 'shoptype']);
    if (!file1 || !file2 || name.trim() === '' || description.trim() === '' || shopTypes.length <= 0) return;
    const formData = new FormData();
    formData.append('images', file1);
    formData.append('images', file2);
    formData.append('name', name);
    formData.append('description', description);
    const newArr = [];
    for (let i = 0; i < shopTypes.length; i++) {
      newArr.push(convertBackType(shopTypes[i]));
    }
    formData.append('types', JSON.stringify(newArr));
    try {
      const response = await http.post('/shop', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        setShowCreateModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
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
              {preview1 && (
                <div
                  onClick={() => inpRef1.current.click()}
                  style={{ backgroundImage: `url(${preview1})` }}
                  className="h-[130px] cursor-pointer w-[130px] bg-no-repeat bg-center bg-cover rounded-3xl"
                ></div>
              )}
              {!preview1 && (
                <div
                  onClick={() => inpRef1.current.click()}
                  className={`${
                    error.includes('shopavatar') ? 'bg-red-50 border-red-100' : 'bg-gray-100'
                  } cursor-pointer flex  flex-col justify-center items-center rounded-lg border-[5px] border-dashed w-[130px] h-[130px]`}
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    className={`${error.includes('shopavatar') ? 'text-red-300' : 'text-gray-500'} text-5xl`}
                  />
                  <p
                    className={`${
                      error.includes('shopavatar') ? 'text-red-300' : 'text-gray-500'
                    } text-sm font-semibold`}
                  >
                    Upload here
                  </p>
                </div>
              )}

              <input
                ref={inpRef1}
                accept="image/*"
                type="file"
                onChange={(e) => handleChangeImage1(e)}
                className="hidden"
              ></input>
            </div>
            {error.includes('shopavatar') && (
              <p className="text-xs text-red-500 font-semibold mt-1">Please provide shop avatar</p>
            )}
            <div className="mt-2">
              <div className="text-sm font-semibold">Shop background:</div>
              {preview2 && (
                <div
                  onClick={() => inpRef2.current.click()}
                  style={{ backgroundImage: `url(${preview2})` }}
                  className="h-[160px] cursor-pointer w-full mt-2 bg-no-repeat bg-center bg-cover rounded-3xl"
                ></div>
              )}
              {!preview2 && (
                <div
                  onClick={() => inpRef2.current.click()}
                  className={`${
                    error.includes('shopbackground') ? 'bg-red-50 border-red-100' : 'bg-gray-100'
                  } cursor-pointer flex mt-2 flex-col justify-center items-center rounded-lg border-[5px] border-dashed w-full h-[160px]`}
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    className={`${error.includes('shopbackground') ? 'text-red-300' : 'text-gray-500'} text-5xl`}
                  />
                  <p
                    className={`${
                      error.includes('shopbackground') ? 'text-red-300' : 'text-gray-500'
                    } text-sm font-semibold`}
                  >
                    Upload here
                  </p>
                  <p
                    className={`${
                      error.includes('shopbackground') ? 'text-red-300' : 'text-gray-500'
                    } text-xs font-semibold`}
                  >
                    Please provide image large than 1000x200px
                  </p>
                </div>
              )}
              {error.includes('shopbackground') && (
                <p className="text-xs text-red-500 font-semibold mt-1">
                  Please provide image that have resolution large than 1000x200px
                </p>
              )}
              <input
                ref={inpRef2}
                accept="image/*"
                type="file"
                onChange={(e) => handleChangeImage2(e)}
                className="hidden"
              ></input>
            </div>
            <div></div>
          </div>
          <div className="basis-[50%]">
            <div>
              <p className="text-sm font-semibold">Name:</p>
              <input
                value={name}
                onChange={(e) => {
                  const newArr = error.filter((el) => el !== 'name');
                  setError(newArr);
                  setName(e.target.value);
                }}
                className={`${
                  error.includes('name') ? 'border-[1px] border-red-700 bg-red-50' : 'bg-gray-100'
                } mt-1 outline-none px-4 py-3 text-sm w-full  rounded-md`}
              ></input>
              {error.includes('name') && (
                <p className="text-xs text-red-500 font-semibold mt-1">Please provide shop name</p>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold mt-4">Description:</p>
              <textarea
                value={description}
                onChange={(e) => {
                  const newArr = error.filter((el) => el !== 'description');
                  setError(newArr);
                  setDescription(e.target.value);
                }}
                className={`${
                  error.includes('description') ? 'border-[1px] border-red-700 bg-red-50' : 'bg-gray-100'
                } mt-1 outline-none px-4 h-[120px] text-sm py-3 w-full  rounded-md`}
              ></textarea>
              {error.includes('description') && (
                <p className="text-xs text-red-500 font-semibold mt-1">Please provide shop description</p>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold mt-4">Types:</p>
              <Menu placement="bottom">
                <MenuHandler>
                  <div
                    className={`${
                      error.includes('shoptype') ? 'bg-red-50 border-[1px] border-red-700' : 'bg-gray-100'
                    } mt-1 outline-none relative px-4 py-3 flex justify-between items-center h-[80px] text-sm w-full rounded-md`}
                  >
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
                            const newArr = error.filter((el) => el !== 'shoptype');
                            setError(newArr);
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
              {error.includes('shoptype') && (
                <p className="text-xs text-red-500 font-semibold">Select types for your shop</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Checkbox color="green" />
            <p className="text-gray-800 text-[15px] font-semibold">
              I have read and agreed to the terms and conditions
            </p>
          </div>
          <div>
            <Button onClick={() => handleAddShop()} color="green" className="font-OpenSans text-[13px]">
              Create new shop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateShopModal;
