import bgimg from '../../assets/img/user/bg-user.png';
import img from '../../assets/img/user/avatar3d.jpg';
import { useEffect, useState } from 'react';
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
  return (
    <div className="px-4 animate-slideTopDown">
      <div className="relative ">
        <div
          style={{ backgroundImage: `url(${bgimg})` }}
          className="h-[200px] bg-no-repeat bg-center bg-cover rounded-3xl"
        ></div>
        <div>
          <div className="absolute border-[6px] border-white bottom-[-10px] left-[40px] h-[130px] w-[130px] rounded-full">
            <div
              className="group relative cursor-pointer overflow-hidden h-full w-full bg-no-repeat bg-center bg-cover rounded-full"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="group-hover:flex justify-center items-center hidden animate-slideTopDown w-full h-[25px] bottom-0 bg-black/50 absolute">
                <FontAwesomeIcon icon={faCamera} className="w-4 h-4 text-white/80" />
              </div>
            </div>
          </div>
          <p className="pl-[180px] mt-3 text-3xl font-bold pb-3">{name}</p>
        </div>
      </div>
      <div className="flex mt-8 gap-12 px-8 w-[650px]">
        <div className="basis-1/2">
          <p className="text-base font-semibold">First Name</p>
          <div className="mt-1 relative">
            <input
              value={formData.firstName}
              onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
              className={`${
                editing.includes('firstname') ? '' : 'pointer-events-none text-gray-500'
              }  w-full px-4 py-2 outline-none border-[1px] rounded-lg border-gray-300`}
            />
            <div
              onClick={() => setEditing((prev) => [...prev, 'firstname'])}
              className="absolute w-[40px] flex flex-col justify-center h-full right-0 top-[50%] translate-y-[-50%] text-sm cursor-pointer text-[#703CA0]"
            >
              <p>Edit</p>
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
              }  w-full px-4 py-2 outline-none border-[1px] rounded-lg border-gray-300`}
            />
            <div
              onClick={() => setEditing((prev) => [...prev, 'lastname'])}
              className="absolute w-[40px] flex flex-col justify-center h-full right-0 top-[50%] translate-y-[-50%] text-sm cursor-pointer text-[#703CA0]"
            >
              <p>Edit</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 mt-4 mr-[340px]">
        <p className="text-base font-semibold">Email</p>
        <div className="mt-1 relative">
          <input
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className={`${
              editing.includes('email') ? '' : 'pointer-events-none text-gray-500'
            }  w-full px-4 py-2 outline-none border-[1px] rounded-lg border-gray-300`}
          />
          <div
            onClick={() => setEditing((prev) => [...prev, 'email'])}
            className="absolute w-[40px] flex flex-col justify-center h-full right-0 top-[50%] translate-y-[-50%] text-sm cursor-pointer text-[#703CA0]"
          >
            <p>Edit</p>
          </div>
        </div>
        <p className="text-base mt-4 font-semibold">Phone Number</p>
        <div className="mt-1 relative">
          <input
            value={formData.phonenumber}
            onChange={(e) => setFormData((prev) => ({ ...prev, phonenumber: e.target.value }))}
            className={`${
              editing.includes('phonenumber') ? '' : 'pointer-events-none text-gray-500'
            }  w-full px-4 py-2 outline-none border-[1px] rounded-lg border-gray-300`}
          />
          <div
            onClick={() => setEditing((prev) => [...prev, 'phonenumber'])}
            className="absolute w-[40px] flex flex-col justify-center h-full right-0 top-[50%] translate-y-[-50%] text-sm cursor-pointer text-[#703CA0]"
          >
            <p>Edit</p>
          </div>
        </div>
      </div>
      <div className="flex mt-4 gap-6 px-8">
        <div
          onClick={() => handleUpdateUser()}
          className="bg-primary-color flex items-center justify-center min-w-[120px] cursor-pointer hover:opacity-80 transition-all px-4 py-2 text-white font-semibold rounded-lg"
        >
          {isLoading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : <p>Save change</p>}
        </div>
        <div
          onClick={() => {
            setEditing([]);
            setFormData(userData);
          }}
          className="border-primary-color border-[1px] cursor-pointer hover:opacity-80 transition-all px-4 py-2 text-primary-color font-semibold rounded-lg"
        >
          Cancel
        </div>
      </div>
    </div>
  );
}

export default AccountSetting;
