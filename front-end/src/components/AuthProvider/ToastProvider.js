import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
const ToastContext = createContext();
function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState('');
  const [open, setOpen] = useState(false);
  const [toastList, setToastList] = useState([]);
  useEffect(() => {
    if (toastList.length === 0) return;
    let timeoutId;
    if (toastList[toastList.length - 1].open === true) {
      timeoutId = setTimeout(() => {
        const idx = toastList.length - 1;
        const newArr = toastList.filter((element, id) => id !== idx);
        setToastList(newArr);
      }, 5000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [toastList]);
  return (
    <ToastContext.Provider value={{ message, setMessage, icon, setIcon, open, setOpen, setToastList }}>
      <div className="fixed z-[9999] top-[15%] right-0 w-[30%]">
        {toastList.map((el, idx) => {
          return (
            <>
              {el.open && (
                <div
                  className={`toast animate-fadeOut rounded-lg flex items-center min-h-[90px] w-full shadow-md border-l-[12px] border-[#2ec946] bg-[#fff] font-medium text-black`}
                  key={idx}
                >
                  <div className="flex items-center gap-5 font-OpenSans px-3 h-full">
                    <div className="relative w-6">
                      <FontAwesomeIcon icon={faCircleCheck} className="text-[#2EC946] w-8 h-8" />
                    </div>
                    <div className="mt-[-12px]">
                      <p className="text-lg leading-[28px] font-bold">Success</p>
                      <p className="text-xs leading-[12px] text-gray-600">{el.message}</p>
                    </div>
                    <div
                      onClick={() => {
                        const newArr = toastList.filter((element, id) => id !== idx);
                        setToastList(newArr);
                      }}
                      className="absolute right-[10px] top-[20px] cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
        {/* <Alert
          className="rounded-lg min-h-[90px] w-full shadow-md border-l-[12px] border-[#2ec946] bg-[#fff] font-medium text-black"
          open={open}
        >
          <div className="flex items-center gap-5 font-OpenSans h-full">
            <div className="relative w-6">
              <FontAwesomeIcon icon={faCircleCheck} className="text-[#2EC946] w-8 h-8" />
            </div>
            <div className="mt-[-12px]">
              <p className="text-lg leading-[28px] font-bold">Success</p>
              <p className="text-xs leading-[12px] text-gray-600">{message}</p>
            </div>
            <div onClick={() => setOpen(false)} className="absolute right-[10px] top-[20px] cursor-pointer">
              <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
            </div>
          </div>
        </Alert> */}
      </div>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
export { ToastContext };
