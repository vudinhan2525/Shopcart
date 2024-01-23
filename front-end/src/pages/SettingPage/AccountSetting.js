import { useEffect, useRef, useState } from 'react';
import http from '../../utils/http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phonenumber: '',
};
function AccountSetting({ userData }) {
  const [formData, setFormData] = useState(initialForm);
  const [editing, setEditing] = useState([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const inputBgRef = useRef();
  useEffect(() => {
    if (userData && Object.keys(userData).length !== 0) {
      setFormData(userData);
      setName(userData.firstName + ' ' + userData.lastName);
    }
  }, [userData]);
  const handleUpdateUser = async () => {
    if (editing.length === 0) return;
    try {
      setIsLoading(true);
      const response = await http.patch(`users/${userData._id}`, formData, { withCredentials: true });
      if (response.data.status === 'success') {
        window.location.reload();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleChangeImageUser = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const response = await http.post(`/users/updateImage`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        if (response.data.status === 'success') {
          window.location.reload();
        }
      }
    } catch (error) {}
  };
  const handleChangeBgUser = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('isBg', true);
        formData.append('image', file);
        const response = await http.post(`/users/updateImage`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        if (response.data.status === 'success') {
          window.location.reload();
        }
      }
    } catch (error) {}
  };
  return (
    <div className="px-4 animate-slideTopDown dark:text-dark-text ">
      <div className="relative ">
        <div
          style={{ backgroundImage: `url(${userData.background})` }}
          className="h-[200px] bg-no-repeat bg-center bg-cover rounded-3xl"
        >
          <div className="w-[full] cursor-pointer  group h-[200px] rounded-3xl  relative">
            <div
              onClick={() => {
                inputBgRef.current.click();
              }}
              className="w-[0px] h-[0px] hidden  group-hover:block animate-slideTopDown border-[50px] border-black/50 border-t-[50px] border-l-[50px] border-t-transparent border-l-transparent bg-transparent absolute bottom-0 right-0 rounded-br-3xl"
            >
              <input
                type="file"
                className="hidden"
                ref={inputBgRef}
                accept="image/*"
                onChange={(e) => {
                  handleChangeBgUser(e);
                }}
              ></input>
            </div>
            <FontAwesomeIcon
              icon={faCamera}
              onClick={(e) => {
                e.preventDefault();
                inputBgRef.current.click();
              }}
              className="w-6 h-6 hidden group-hover:block bottom-[20px] right-[20px] absolute text-white/80"
            />
          </div>
        </div>
        <div>
          <div className="absolute border-[6px] border-white dark:border-dark-ground bottom-[-10px] left-[40px] h-[130px] w-[130px] rounded-full">
            <div
              className="group relative cursor-pointer overflow-hidden h-full w-full bg-no-repeat bg-center bg-cover rounded-full"
              style={{ backgroundImage: `url(${userData.avatar})` }}
            >
              <input
                type="file"
                className="hidden"
                ref={inputRef}
                accept="image/*"
                onChange={(e) => {
                  handleChangeImageUser(e);
                }}
              ></input>
              <div
                onClick={() => {
                  inputRef.current.click();
                }}
                className="group-hover:flex justify-center items-center hidden animate-slideTopDown w-full h-[25px] bottom-0 bg-black/50 absolute"
              >
                <FontAwesomeIcon icon={faCamera} className="w-4 h-4 text-white/80" />
              </div>
            </div>
          </div>
          <p className="pl-[180px] mt-3 text-3xl font-bold pb-3">{name}</p>
        </div>
      </div>
      <div className="flex mt-8 gap-12 px-8 w-[650px]  ">
        <div className="basis-1/2">
          <p className="text-base font-semibold">First Name</p>
          <div className="mt-1 relative">
            <input
              value={formData.firstName}
              onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
              className={`${
                editing.includes('firstname') ? '' : 'pointer-events-none text-gray-500'
              } dark:bg-[#3A3B3C] dark:border-[0px] w-full px-4 py-2 outline-none border-[1px] rounded-lg border-gray-300`}
            />
            <div
              onClick={() => setEditing((prev) => [...prev, 'firstname'])}
              className="absolute w-[40px] flex flex-col justify-center h-full right-0 top-[50%] translate-y-[-50%] text-sm cursor-pointer text-[#703CA0]"
            >
              <p className="dark:text-purple-500 dark:font-bold">Edit</p>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <p className="text-base font-semibold">Last Name</p>
          <div className="mt-1 relative">
            <input
              value={formData.lastName}
              onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
              className={`${
                editing.includes('lastname') ? '' : 'pointer-events-none text-gray-500'
              } dark:bg-[#3A3B3C] dark:border-[0px] w-full px-4 py-2 outline-none border-[1px] rounded-lg border-gray-300`}
            />
            <div
              onClick={() => setEditing((prev) => [...prev, 'lastname'])}
              className="absolute w-[40px] flex flex-col justify-center h-full right-0 top-[50%] translate-y-[-50%] text-sm cursor-pointer text-[#703CA0]"
            >
              <p className="dark:text-purple-500 dark:font-bold">Edit</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 mt-4 mr-[340px] ">
        <p className="text-base font-semibold">Email</p>
        <div className="mt-1 relative">
          <input
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className={`${
              editing.includes('email') ? '' : 'pointer-events-none text-gray-500'
            } dark:bg-[#3A3B3C] dark:border-[0px] w-full px-4 py-2 outline-none border-[1px] rounded-lg border-gray-300`}
          />
          <div
            onClick={() => setEditing((prev) => [...prev, 'email'])}
            className="absolute w-[40px] flex flex-col justify-center h-full right-0 top-[50%] translate-y-[-50%] text-sm cursor-pointer text-[#703CA0]"
          >
            <p className="dark:text-purple-500 dark:font-bold">Edit</p>
          </div>
        </div>
        <p className="text-base mt-4 font-semibold">Phone Number</p>
        <div className="mt-1 relative">
          <input
            value={formData.phonenumber}
            onChange={(e) => setFormData((prev) => ({ ...prev, phonenumber: e.target.value }))}
            className={`${
              editing.includes('phonenumber') ? '' : 'pointer-events-none text-gray-500'
            } dark:bg-[#3A3B3C] dark:border-[0px] w-full px-4 py-2 outline-none border-[1px] rounded-lg border-gray-300`}
          />
          <div
            onClick={() => setEditing((prev) => [...prev, 'phonenumber'])}
            className="absolute w-[40px] flex flex-col justify-center h-full right-0 top-[50%] translate-y-[-50%] text-sm cursor-pointer text-[#703CA0]"
          >
            <p className="dark:text-purple-500 dark:font-bold">Edit</p>
          </div>
        </div>
      </div>
      <div className="flex mt-4 gap-6 px-8 ">
        <div
          onClick={() => handleUpdateUser()}
          className="bg-primary-color dark:bg-primary-dark-color flex items-center justify-center min-w-[120px] cursor-pointer hover:opacity-80 transition-all px-4 py-2 text-white font-semibold rounded-lg"
        >
          {isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : <p>Save change</p>}
        </div>
        <div
          onClick={() => {
            setEditing([]);
            setFormData(userData);
          }}
          className="dark:text-primary-dark-color dark:border-primary-dark-color border-primary-color border-[1px] cursor-pointer hover:opacity-80 transition-all px-4 py-2 text-primary-color font-semibold rounded-lg"
        >
          Cancel
        </div>
      </div>
    </div>
  );
}

export default AccountSetting;
