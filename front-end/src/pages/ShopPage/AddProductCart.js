import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddProductCart() {
  return (
    <div className="w-full h-[350px] border-gray-200 gap-2 flex-col animate-slideTopDown border-[5px] border-dashed rounded-lg bg-gray-100 cursor-pointer flex items-center justify-center">
      <FontAwesomeIcon icon={faCirclePlus} className="text-gray-500 text-[100px]" />
      <p className="w-full text-center text-gray-700 text-sm font-semibold px-4">Add more product to your shop</p>
    </div>
  );
}

export default AddProductCart;
