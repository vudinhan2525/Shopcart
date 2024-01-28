import { faCircleCheck, faCircleInfo, faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SuccessToast({ closeToast, toastProps, status, message }) {
  return (
    <div
      className={`${status === 'success' && 'border-[#2ec946]'} ${status === 'error' && 'border-[#FF3B30]'} ${
        status === 'info' && 'border-[#007AFF]'
      } rounded-lg mt-2 flex items-center w-[350px] min-h-[85px] shadow-md border-l-[12px] border-[#2ec946] bg-[#fff] font-medium text-black`}
    >
      <div className="flex justify-between items-center gap-5 font-OpenSans px-3 h-ful w-full">
        <div className="flex items-center gap-5">
          <div className="relative w-6">
            {status === 'error' && <FontAwesomeIcon icon={faCircleXmark} className="text-[#FF3B30] w-8 h-8" />}
            {status === 'success' && <FontAwesomeIcon icon={faCircleCheck} className="text-[#2EC946] w-8 h-8" />}
            {status === 'info' && <FontAwesomeIcon icon={faCircleInfo} className="text-[#007AFF] w-8 h-8" />}
          </div>
          <div className="mt-[-12px]">
            {status === 'success' && <p className="text-lg leading-[28px] font-bold">Success</p>}
            {status === 'info' && <p className="text-lg leading-[28px] font-bold">Info</p>}
            {status === 'error' && <p className="text-lg leading-[28px] font-bold">Error</p>}
            <p className="text-xs leading-[12px] text-gray-600">{message}</p>
          </div>
        </div>
        <div onClick={closeToast} className=" w-6  right-[10px] top-[20px] cursor-pointer">
          <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default SuccessToast;
