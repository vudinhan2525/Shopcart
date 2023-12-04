import AddressInfo from '../OrderPage/AddressInfo/AddressInfo';
function AddressSetting({ userData }) {
  return (
    <div className="pl-4">
      <AddressInfo userData={userData} />
    </div>
  );
}

export default AddressSetting;
