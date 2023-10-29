import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const address = [
  { name: 'An Vu', add: 'Gia Binh Bac Ninh', sdt: '0987880734', email: 'vudinhan000@gmail.com' },
  { name: 'Phi Tu', add: 'Do Nhuan Tan Phu Tphcm', sdt: '0987232123', email: 'phi1702@gmail.com' },
];
function AddressInfo() {
  const [selectAddress, setSelectAddress] = useState(0);
  return (
    <div className=" border-[1px] border-gray-300 rounded-xl px-6 py-6 mt-6">
      <header className="text-2xl font-semibold mb-6">Deliver Information</header>
      <div className="flex flex-col gap-4 ">
        {address.map((el, idx) => {
          return (
            <div
              key={idx}
              onClick={(e) => {
                if (e.target.classList.contains('edit-btn')) {
                  //handleEditingAddress
                } else setSelectAddress(idx);
              }}
              className={`cursor-pointer border-[1px] relative px-4 py-2 bg-gray-100 rounded-xl ${
                selectAddress === idx ? 'border-[1px] border-gray-500 bg-gray-200' : ''
              }`}
            >
              <header className="font-bold">{el.name}</header>
              <p className="text-sm text-gray-800">Address: {el.add}</p>
              <p className="text-sm text-gray-800">Phone: {el.sdt}</p>
              <p className="text-sm text-gray-800">Email: {el.email}</p>
              <div
                className={`${
                  selectAddress === idx ? 'selected-ct' : ''
                } absolute cursor-pointer border-[1px]  border-gray-400 top-[20px] right-[20px] rounded-[4px] w-[20px] h-[20px] flex item-center`}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className={`${selectAddress === idx ? 'selected-icon-ct' : ''} hidden text-white my-auto mx-auto `}
                />
              </div>
              <div className="edit-btn absolute hover:bg-gray-400 bg-gray-300 bottom-[20px] right-[20px] text-xs font-semibold py-1 rounded-full px-3">
                Edit
              </div>
            </div>
          );
        })}
      </div>
      <div className={`flex gap-6 ${address.length === 0 ? '' : 'mt-6'}`}>
        <div className="basis-1/2">
          <header className="text-sm font-semibold">First Name*</header>
          <input
            type="text"
            required
            className="mt-2 mb-3 placeholder:text-gray-400 text-sm border-[1px] border-gray-200 w-full px-4 py-[10px] rounded-lg outline-none"
            placeholder="Type here..."
          ></input>
        </div>
        <div className="basis-1/2">
          <header className="text-sm font-semibold">Last Name*</header>
          <input
            type="text"
            required
            className="mt-2 mb-3 placeholder:text-gray-400 text-sm border-[1px] border-gray-200 w-full px-4 py-[10px] rounded-lg outline-none"
            placeholder="Type here..."
          ></input>
        </div>
      </div>
      <div>
        <header className="text-sm font-semibold">Address*</header>
        <input
          type="text"
          required
          className="mt-2 mb-3 placeholder:text-gray-400 text-sm border-[1px] border-gray-200 w-full px-4 py-[10px] rounded-lg outline-none"
          placeholder="Type here..."
        ></input>
      </div>
      <div className="flex gap-6">
        <div className="basis-1/2">
          <header className="text-sm font-semibold">City/ Town*</header>
          <input
            type="text"
            required
            className="mt-2 mb-3 placeholder:text-gray-400 text-sm border-[1px] border-gray-200 w-full px-4 py-[10px] rounded-lg outline-none"
            placeholder="Type here..."
          ></input>
        </div>
        <div className="basis-1/2">
          <header className="text-sm font-semibold">Zip Code*</header>
          <input
            type="text"
            required
            className="mt-2 mb-3 placeholder:text-gray-400 text-sm border-[1px] border-gray-200 w-full px-4 py-[10px] rounded-lg outline-none"
            placeholder="Type here..."
          ></input>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="basis-1/2">
          <header className="text-sm font-semibold">Mobile*</header>
          <input
            type="text"
            required
            className="mt-2 mb-3 placeholder:text-gray-400 text-sm border-[1px] border-gray-200 w-full px-4 py-[10px] rounded-lg outline-none"
            placeholder="Type here..."
          ></input>
        </div>
        <div className="basis-1/2">
          <header className="text-sm font-semibold">Email*</header>
          <input
            type="email"
            required
            className="mt-2 mb-3 placeholder:text-gray-400 text-sm border-[1px] border-gray-200 w-full px-4 py-[10px] rounded-lg outline-none"
            placeholder="Type here..."
          ></input>
        </div>
      </div>
      <button className="bg-primary-color hover:opacity-80 w-[150px] text-center py-3 rounded-full text-white cursor-pointer transition-all mt-2">
        Add Address
      </button>
    </div>
  );
}

export default AddressInfo;
