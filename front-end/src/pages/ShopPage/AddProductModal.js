import { faCamera, faChevronDown, faCirclePlus, faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import convertBackType from '../../utils/convertBackType';
import convertType from '../../utils/convertType';
import http from '../../utils/http';
import Dialog from '../../components/Modals/Dialog';
const types = ['Education', 'Furniture', 'Technologies', 'Beauty', 'Fashion', 'Other'];
function AddProductModal({ editProd, setShowEditProduct, setShowAddProduct, categories, shopId }) {
  const [productTypes, setProdTypes] = useState([]);
  const [editorHtml, setEditorHtml] = useState('');
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [oPrice, setOPrice] = useState();
  const [lPrice, setLPrice] = useState();
  const [error, setError] = useState([]);
  const [brand, setBrand] = useState('');
  const [avail, setAvail] = useState();
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [cateGory, setCategory] = useState('');
  const [variants, setVariants] = useState([]);
  const [oldCateGory, setOldCateGory] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    if (!files) return;
    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }
    const objectUrls = tmp;
    setPreview(objectUrls);
    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [files]);
  useEffect(() => {
    if (editProd && Object.keys(editProd).length > 0) {
      setName(editProd.name);
      setSummary(editProd.summary);
      setOPrice(editProd?.originalPrice);
      setLPrice(editProd.price);
      setBrand(editProd.brand);
      setAvail(editProd.itemLeft);
      let newArr = [];
      for (let i = 0; i < editProd.type.length; i++) {
        newArr.push(convertType(editProd.type[i]));
      }
      setProdTypes(newArr);
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].prods.includes(editProd._id)) {
          setCategory(categories[i].category);
          setOldCateGory(categories[i].category);
          break;
        }
      }
      getDetailProd(editProd.details);
      setVariants(editProd.variants);
      setPreview(editProd.images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editProd]);
  const getDetailProd = async (dtId) => {
    try {
      const response = await http.get(`/detailprods/${dtId}`);
      if (response.data.status === 'success') {
        let html = response.data.data.text;
        if (html.startsWith('"')) {
          html = JSON.parse(response.data.data.text);
        }
        setEditorHtml(html);
      }
    } catch (error) {}
  };
  const handleAddProd = async () => {
    if (name.trim() === '') {
      setError((prev) => [...prev, 'name']);
    }
    if (summary.trim() === '') {
      setError((prev) => [...prev, 'summary']);
    }
    if (!oPrice) {
      setError((prev) => [...prev, 'oprice']);
    }
    if (!lPrice) {
      setError((prev) => [...prev, 'lprice']);
    }
    if (productTypes.length === 0) {
      setError((prev) => [...prev, 'types']);
    }
    if (brand.trim() === '') {
      setError((prev) => [...prev, 'brand']);
    }
    if (!avail) {
      setError((prev) => [...prev, 'avail']);
    }
    if (files.length !== 5 && !editProd) {
      setError((prev) => [...prev, 'files']);
    }
    if (
      name.trim() === '' ||
      !avail ||
      (files.length !== 5 && !editProd) ||
      summary.trim() === '' ||
      !oPrice ||
      !lPrice ||
      brand.trim() === '' ||
      productTypes.length === 0
    ) {
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    formData.append('name', name);
    formData.append('summary', summary);
    formData.append('originalPrice', oPrice);
    formData.append('price', lPrice);
    const newArr = [];
    for (let i = 0; i < productTypes.length; i++) {
      newArr.push(convertBackType(productTypes[i]));
    }
    formData.append('type', JSON.stringify(newArr));
    formData.append('brand', brand);
    formData.append('itemLeft', avail);
    formData.append('shop', shopId);
    if (cateGory) formData.append('cateGory', cateGory);
    if (variants.length > 0) {
      formData.append('variants', JSON.stringify(variants));
    }
    if (editorHtml) formData.append('description', JSON.stringify(editorHtml));
    if (editProd && Object.keys(editProd).length > 0) {
      try {
        formData.append('oldImages', JSON.stringify(editProd.images));
        formData.append('details', editProd.details);
        formData.append('oldCateGory', oldCateGory);
        const response = await http.patch(`/prods/${editProd._id}`, formData, { withCredentials: true });
        if (response.data.status === 'success') {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
      return;
    } else {
      try {
        const response = await http.post(`/prods/`, formData, { withCredentials: true });
        if (response.data.status === 'success') {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleClickDeleteImage = (idx) => {
    const updatedFiles = files.filter((el, id) => id !== idx);
    setFiles(updatedFiles);
  };
  const handleAddVariant = (idx) => {
    const doc = document.querySelector(`.input-${idx}`).value;
    if (doc.trim() === '') return;
    const data = variants[idx].content;
    const updatedVariants = variants.map((vari, i) => (i === idx ? { ...vari, content: [...data, doc] } : vari));
    setVariants(updatedVariants);
    document.querySelector(`.input-${idx}`).value = '';
  };
  const handleDeleteVariant = (idx, i) => {
    const data = variants[idx].content.filter((q, u) => u !== i);
    const updatedVariants = variants.map((vari, id) => (id === idx ? { ...vari, content: data } : vari));
    setVariants(updatedVariants);
  };
  const deleteProd = async () => {
    try {
      const response = await http.delete(`/prods/${editProd._id}`, { withCredentials: true });
      if (response.data.status === 'success') {
        window.location.reload();
      }
    } catch (error) {}
  };
  return (
    <div className="z-[51] fixed top-0 bottom-0 animate-slideTopDown right-0 left-0 bg-black/20">
      <div className="absolute py-6 px-6 bottom-0 top-0 dark:bg-dark-flat w-[90%] right-[50%] rounded-xl translate-x-[50%] bg-white">
        <div className="flex items-center justify-between">
          <header className="text-2xl font-bold">Add new product</header>
          <div className="">
            <FontAwesomeIcon
              onClick={() => {
                setShowAddProduct(false);
                if (setShowEditProduct) setShowEditProduct(false);
              }}
              className="text-3xl cursor-pointer text-gray-700 hover:text-gray-900 transition-all"
              icon={faXmark}
            />
          </div>
        </div>
        <div className="mt-4 overflow-auto max-h-[550px] flex gap-6">
          <div className="basis-[60%]  max-w-[60%]">
            <div>
              <header className="text-sm font-bold">Product Name</header>
              <input
                value={name}
                onChange={(e) => {
                  const newArr = error.filter((el) => el !== 'name');

                  setError(newArr);
                  setName(e.target.value);
                }}
                placeholder="Enter product name"
                className={`${
                  error.includes('name') ? 'bg-red-50 border-[1px] border-red-200' : 'bg-gray-100'
                } px-4 py-3  outline-none w-full mt-1 rounded-lg text-sm`}
              ></input>
              {error.includes('name') && (
                <p className="text-xs font-semibold text-red-500">Please enter product name.</p>
              )}
            </div>
            <div className="mt-3 ">
              <header className="text-sm font-bold">Description</header>
              <div className="mt-1">
                <ReactQuill style={{ height: '300px' }} theme="snow" value={editorHtml} onChange={setEditorHtml} />
              </div>
            </div>
            <div className="mt-14">
              <header className="text-sm font-bold">Product Images</header>
              <p className="text-xs text-gray-600">*5 Images</p>
              <input
                ref={inputRef}
                type="file"
                multiple={true}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const newArr = error.filter((el) => el !== 'files');
                    setError(newArr);
                    const fileListAsArray = Array.from(e.target.files);
                    setFiles(fileListAsArray);
                  }
                }}
                className="hidden"
              ></input>
              <div
                className={`${
                  error.includes('files') ? 'bg-red-50 border-[1px] border-red-200' : 'bg-gray-100'
                } w-full flex items-center px-6 h-[220px]  rounded-xl mt-1`}
              >
                <div className="flex items-center gap-4 min-w-full overflow-x-auto">
                  <div
                    onClick={() => inputRef.current.click()}
                    className={`${
                      error.includes('files') ? 'bg-red-100 border-red-300' : 'bg-gray-200 border-gray-300'
                    } min-w-[180px] cursor-pointer flex flex-col items-center justify-center h-[180px] rounded-xl  border-[5px] border-dashed `}
                  >
                    <FontAwesomeIcon
                      icon={faCamera}
                      className={`text-5xl ${error.includes('files') ? 'text-red-300' : 'text-gray-500'}`}
                    />
                    <p
                      className={`w-full text-center text-sm font-semibold ${
                        error.includes('files') ? 'text-red-300' : 'text-gray-500'
                      }`}
                    >
                      Click to upload
                    </p>
                  </div>
                  {preview.map((pic, idx) => {
                    return (
                      <div
                        key={idx}
                        className="min-w-[180px] relative bg-no-repeat bg-center bg-cover cursor-pointer flex flex-col items-center justify-center h-[180px] rounded-xl bg-gray-200"
                        style={{ backgroundImage: `url(${pic})` }}
                      >
                        <div onClick={() => handleClickDeleteImage(idx)} className="absolute top-[3%] right-[3%]">
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="text-xl text-gray-500 transition-all hover:text-gray-600"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {error.includes('files') && (
                <p className="text-xs font-semibold text-red-500">Please provide 5 images of your product.</p>
              )}
            </div>
          </div>
          <div className="basis-[40%]">
            <div>
              <header className="text-sm font-bold">Summary</header>
              <textarea
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                  const newArr = error.filter((el) => el !== 'summary');
                  setError(newArr);
                }}
                placeholder="Summary about this product..."
                className={`${
                  error.includes('summary') ? 'bg-red-50 border-[1px] border-red-200' : 'bg-gray-100'
                } px-4 py-3 h-[100px] outline-none w-full mt-1 rounded-lg text-sm`}
              ></textarea>
              {error.includes('summary') && (
                <p className="text-xs font-semibold text-red-500 mt-[-3px]">Please enter product summary.</p>
              )}
            </div>
            <p className="font-bold mt-2">Pricing</p>
            <div className="flex item-center gap-4 mt-2">
              <div className="basis-[50%] ">
                <p className="text-sm font-bold">Original price</p>
                <input
                  value={oPrice}
                  onChange={(e) => {
                    setOPrice(e.target.value);
                    const newArr = error.filter((el) => el !== 'oprice');
                    setError(newArr);
                  }}
                  type="number"
                  placeholder="00.00"
                  className={`${
                    error.includes('oprice') ? 'bg-red-50 border-[1px] border-red-200' : 'bg-gray-100'
                  } mt-1 outline-none px-4 py-3 w-full rounded-lg text-sm`}
                ></input>
                {error.includes('oprice') && (
                  <p className="text-xs font-semibold text-red-500">Please enter original price.</p>
                )}
              </div>
              <div className="basis-[50%] ">
                <p className="text-sm font-bold">List price</p>
                <input
                  value={lPrice}
                  onChange={(e) => {
                    setLPrice(e.target.value);
                    const newArr = error.filter((el) => el !== 'lprice');
                    setError(newArr);
                  }}
                  type="number"
                  placeholder="00.00"
                  className={`${
                    error.includes('lprice') ? 'bg-red-50 border-[1px] border-red-200' : 'bg-gray-100'
                  } mt-1 outline-none px-4 py-3 w-full rounded-lg text-sm`}
                ></input>
                {error.includes('lprice') && (
                  <p className="text-xs font-semibold text-red-500 ">Please enter original price.</p>
                )}
              </div>
            </div>
            <div className="bg-gray-300 w-full h-[1px] my-4"></div>
            <div className="">
              <Menu placement="bottom">
                <MenuHandler>
                  <div>
                    <p className="text-sm font-bold">Product Type</p>
                    <div
                      className={`${
                        error.includes('types') ? 'bg-red-50 border-[1px] border-red-700' : 'bg-gray-100'
                      } mt-1 outline-none relative px-4 py-3 flex justify-between items-center h-[80px] text-sm w-full rounded-md`}
                    >
                      <div className="grid grid-cols-3 gap-x-1 gap-y-1">
                        {productTypes.map((el, idx) => {
                          return (
                            <div
                              key={idx}
                              className="px-2 gap-2 justify-between flex items-center py-1 bg-white rounded-md border-[1px]"
                            >
                              <p>{el}</p>
                              <FontAwesomeIcon
                                onClick={() => {
                                  const newArr = productTypes.filter((ele, idx) => ele !== el);
                                  setProdTypes(newArr);
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
                  </div>
                </MenuHandler>
                <MenuList className="w-[400px] font-OpenSans">
                  {types.map((el, idx) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          const found = productTypes.find((element) => element === el);
                          if (!found) {
                            const newArr = error.filter((el) => el !== 'types');
                            setError(newArr);
                            setProdTypes((prev) => [...prev, el]);
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
              {error.includes('types') && (
                <p className="text-xs text-red-500 font-semibold">Select types for your product</p>
              )}
            </div>
            <div className="mt-4 flex gap-6">
              <div className="basis-[50%]">
                <header className="text-sm font-bold">Brand</header>
                <input
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    const newArr = error.filter((el) => el !== 'brand');
                    setError(newArr);
                  }}
                  placeholder="Select brand"
                  className={`${
                    error.includes('brand') ? 'bg-red-50 border-[1px] border-red-200' : 'bg-gray-100'
                  } px-4 py-3  outline-none w-full mt-1 rounded-lg text-sm`}
                ></input>
                {error.includes('brand') && <p className="text-xs font-semibold text-red-500 ">Please enter brand.</p>}
              </div>
              <div className="basis-[50%]">
                <header className="text-sm font-bold">Product Availability</header>
                <input
                  value={avail}
                  onChange={(e) => {
                    setAvail(e.target.value);
                    const newArr = error.filter((el) => el !== 'avail');
                    setError(newArr);
                  }}
                  type="number"
                  placeholder="Enter product quantity left"
                  className={`${
                    error.includes('avail') ? 'bg-red-50 border-[1px] border-red-200' : 'bg-gray-100'
                  } px-4 py-3  outline-none w-full mt-1 rounded-lg text-sm`}
                ></input>
                {error.includes('avail') && (
                  <p className="text-xs font-semibold text-red-500 ">Please enter product left.</p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <header className="text-sm font-bold">Category</header>
              <div className="flex gap-6">
                <Menu placement="bottom">
                  <MenuHandler>
                    <div className="basis-[50%] rounded-lg mt-1 h-[50px] bg-gray-100 relative">
                      <p className="mx-4 leading-[50px] text-sm">{cateGory}</p>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="absolute right-[5%] top-[50%] translate-y-[-50%] cursor-pointer"
                      ></FontAwesomeIcon>
                    </div>
                  </MenuHandler>
                  <MenuList>
                    {categories.map((el, idx) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            setCategory(el.category);
                          }}
                          key={idx}
                        >
                          {el.category}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
                <div className="basis-[50%]"></div>
              </div>
            </div>
            <div className="mt-2">
              <header className="text-sm font-bold">Variants</header>
              <div className="flex flex-col">
                {variants.map((el, idx) => {
                  return (
                    <div key={idx} className="animate-slideTopDown mt-4">
                      <div className="flex items-center gap-1 justify-between">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-semibold">Name:</p>
                          <input
                            value={el.name}
                            onChange={(e) => {
                              const updatedVariants = variants.map((variant, i) =>
                                i === idx ? { ...variant, name: e.target.value } : variant,
                              );
                              setVariants(updatedVariants);
                            }}
                            className="text-sm font-semibold text-gray-700 px-2 w-[30%] py-1 border-[1px] rounded-lg outline-none"
                          ></input>
                        </div>
                        <FontAwesomeIcon
                          onClick={() => {
                            const newArr = variants.filter((el, id) => id !== idx);
                            setVariants(newArr);
                          }}
                          icon={faCircleXmark}
                          className="text-2xl text-gray-400 hover:text-gray-500 transition-all cursor-pointer"
                        />
                      </div>
                      <div className="w-full mt-2 bg-gray-100 rounded-lg h-[100px]">
                        <div className="inline-block relative mx-4 my-2 w-[30%]">
                          <input
                            className={`input-${idx} text-sm text-gray-700 outline-none border-[2px] rounded-lg px-2 py-1 w-full`}
                          ></input>
                          <FontAwesomeIcon
                            icon={faCirclePlus}
                            onClick={() => handleAddVariant(idx)}
                            className="text-2xl absolute right-[5%] top-[50%] cursor-pointer hover:text-gray-500 transition-all translate-y-[-50%] text-gray-400"
                          />
                        </div>
                        <div className="mx-4 grid grid-cols-5 gap-4">
                          {el?.content.map((e, i) => {
                            return (
                              <div
                                className="flex items-center justify-between px-3 py-1 bg-white rounded-lg text-sm"
                                key={i}
                              >
                                <p>{e}</p>
                                <FontAwesomeIcon
                                  className="cursor-pointer"
                                  onClick={() => handleDeleteVariant(idx, i)}
                                  icon={faXmark}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <FontAwesomeIcon
                icon={faCirclePlus}
                onClick={() => {
                  setVariants((prev) => [...prev, { name: '', content: [] }]);
                }}
                className="text-3xl mt-1 cursor-pointer text-gray-400 hover:text-gray-500 transition-all"
              ></FontAwesomeIcon>
            </div>
            <div className="flex justify-end gap-6">
              {editProd && (
                <div
                  onClick={() => setShowDelete(true)}
                  className="cursor-pointer hover:bg-red-700 transition-all mt-4 px-4 py-3 bg-red-600 w-[25%] text-center rounded-lg font-bold text-white"
                >
                  DELETE
                </div>
              )}
              <div
                onClick={() => handleAddProd()}
                className="cursor-pointer hover:bg-blue-700 transition-all mt-4 px-4 py-3 bg-blue-600 w-[45%] text-center rounded-lg font-bold text-white"
              >
                {editProd ? 'SAVE CHANGE' : 'ADD PRODUCT'}
              </div>
            </div>
            {showDelete && (
              <Dialog
                onClose={() => setShowDelete(false)}
                onYes={() => {
                  deleteProd();
                  setShowDelete(false);
                }}
                buttonContent={'Delete'}
                message={'Are you sure to delete this product??'}
                content={'This product will be deleted permanently, you cannot undo this action !!'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
