import bgimg from '../../assets/img/user/bg-user.png';
import img from '../../assets/img/user/avatar3d.jpg';
import { useState } from 'react';
const fakeValue = {
  firstName: 'An',
  lastName: 'Vu',
  email: 'vudinhan17100@gmail.com',
  phone: '98132892893',
};
function AccountSetting() {
  const [firstName, setFirstName] = useState(fakeValue.firstName);
  const [lastName, setLastName] = useState(fakeValue.lastName);
  const [email, setEmail] = useState(fakeValue.email);
  const [phoneNumber, setPhoneNumber] = useState(fakeValue.phone);
  const [editing, setEditing] = useState([]);
  return (
    <div className="px-4">
      <div className="relative ">
        <div
          style={{ backgroundImage: `url(${bgimg})` }}
          className="h-[200px] bg-no-repeat bg-center bg-cover rounded-3xl"
        ></div>
        <div>
          <div
            style={{ backgroundImage: `url(${img})` }}
            className="absolute border-[6px] border-white bottom-[-10px] left-[40px] h-[130px] w-[130px] bg-no-repeat bg-center bg-cover rounded-full"
          ></div>
          <p className="pl-[180px] mt-3 text-3xl font-bold pb-3">An Vu</p>
        </div>
      </div>
      <div className="flex mt-8 gap-12 px-8 w-[650px]">
        <div className="basis-1/2">
          <p className="text-base font-semibold">First Name</p>
          <div className="mt-1 relative">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
    </div>
  );
}

export default AccountSetting;
