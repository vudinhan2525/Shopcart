import { useState } from 'react';
import { createContext } from 'react';
import { Alert } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
const ToastContext = createContext();

function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState('');
  const [open, setOpen] = useState(false);
  return (
    <ToastContext.Provider value={{ message, setMessage, icon, setIcon, open, setOpen }}>
      <Alert
        className="rounded-none fixed z-[9999] top-[15%] shadow-md border-l-4 right-0 w-[30%] border-[#2ec946] bg-[#E7F4E7] font-medium text-black"
        open={open}
      >
        <div className="flex items-start gap-3 font-OpenSans">
          <div className="relative w-6">
            <FontAwesomeIcon icon={faCircleCheck} className="text-[#2EC946] top-[5px] w-6 h-6 absolute" />
          </div>
          <div>
            <p className="text-lg font-semibold">Success</p>
            <p className="text-sm">{message}</p>
          </div>
          <div onClick={() => setOpen(false)} className="absolute right-[10px] top-[20px] cursor-pointer">
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
          </div>
        </div>
      </Alert>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
export { ToastContext };
