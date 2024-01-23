import { useContext, useState } from 'react';
import http from '../../../utils/http';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { ToastContext } from '../../../components/AuthProvider/ToastProvider';
const initialObj = {
  curPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};
function SecuritySetting() {
  const [data, setData] = useState(initialObj);
  const [error, setError] = useState(initialObj);
  const [loading, setIsLoading] = useState(false);
  const { setOpen, setMessage } = useContext(ToastContext);
  function isPasswordValid(password) {
    if (password.length < 10 || password.length > 100) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[!.@#?]/.test(password)) {
      return false;
    }
    return true;
  }
  const handleChangePassword = async () => {
    setIsLoading(true);
    if (loading) return;
    if (!data.curPassword) {
      setError((prev) => {
        return { ...prev, curPassword: 'Please provide this information' };
      });
    }
    if (!data.newPassword) {
      setError((prev) => {
        return { ...prev, newPassword: 'Please provide this information' };
      });
    }
    if (!data.newPasswordConfirm) {
      setError((prev) => {
        return { ...prev, newPasswordConfirm: 'Please provide this information' };
      });
    }
    if (!data.curPassword || !data.newPassword || !data.newPasswordConfirm) {
      setIsLoading(false);
      return;
    }
    if (data.newPassword && data.newPasswordConfirm && data.newPassword !== data.newPasswordConfirm) {
      setError((prev) => {
        return { ...prev, newPasswordConfirm: 'Password confirm is not correct !' };
      });
      setIsLoading(false);
      return;
    }
    if (
      data.newPassword &&
      data.newPasswordConfirm &&
      (!isPasswordValid(data.newPassword) || !isPasswordValid(data.newPasswordConfirm))
    ) {
      return setError((prev) => {
        return {
          ...prev,
          newPasswordConfirm: "Password confirm doesn't match a requirements",
          newPassword: "Password doesn't match a requirements",
        };
      });
    }
    try {
      const response = await http.post(`/users/changePassword`, { data: data }, { withCredentials: true });
      if (response.data.status === 'success') {
        setIsLoading(false);
        setOpen(true);
        setMessage('Your password has been changed !');
        setTimeout(() => {
          setOpen(false);
        }, [3000]);
        setData(initialObj);
      }
    } catch (error) {
      if (error.response.data.status === 'wrong password') {
        setIsLoading(false);
        setError((prev) => {
          return { ...prev, curPassword: error.response.data.message };
        });
      }
    }
  };
  return (
    <>
      <header className="text-2xl font-bold">Security</header>
      <p className="text-sm text-gray-700 mt-1 font-normal dark:text-gray-400">Manage settings for your security</p>
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-5"></div>
      <header className="text-lg font-bold">Password information</header>
      <div>
        <div className="flex mt-2 gap-8">
          <div className="basis-1/2">
            <header className="text-sm mb-2">Current password</header>
            <input
              onChange={(e) => {
                const newValue = e.target.value.replace(/\s/g, '');
                setData((prev) => {
                  return {
                    ...prev,
                    curPassword: newValue,
                  };
                });
                setError(initialObj);
              }}
              value={data.curPassword}
              type="password"
              className={`${
                error.curPassword !== '' ? 'border-[2px] border-red-600' : 'dark:border-[0px]'
              }  dark:bg-[#3A3B3C] outline-none dark:caret-white dark:text-dark-text  w-full px-4 py-2 rounded-lg border-[1px] border-gray-400 text-gray-800 `}
              placeholder="••••••••"
            ></input>
            <p className="text-xs text-red-600 mt-1 font-semibold">{error.curPassword}</p>
          </div>
          <div className="basis-1/2"></div>
        </div>
        <div className="flex mt-2 gap-8">
          <div className="basis-1/2">
            <header className="text-sm mb-2">New password</header>
            <input
              onChange={(e) => {
                const newValue = e.target.value.replace(/\s/g, '');
                setData((prev) => {
                  return {
                    ...prev,
                    newPassword: newValue,
                  };
                });
                setError(initialObj);
              }}
              value={data.newPassword}
              type="password"
              className={`${
                error.newPassword !== '' ? 'border-[2px] border-red-600' : 'dark:border-[0px]'
              }  dark:bg-[#3A3B3C] outline-none dark:caret-white dark:text-dark-text  w-full px-4 py-2 rounded-lg border-[1px] border-gray-400 text-gray-800 `}
              placeholder="••••••••"
            ></input>
            <p className="text-xs text-red-600 mt-1 font-semibold">{error.newPassword}</p>
          </div>
          <div className="basis-1/2">
            <header className="text-sm mb-2">Confirm password</header>
            <input
              onChange={(e) => {
                const newValue = e.target.value.replace(/\s/g, '');
                setData((prev) => {
                  return {
                    ...prev,
                    newPasswordConfirm: newValue,
                  };
                });
                setError(initialObj);
              }}
              value={data.newPasswordConfirm}
              type="password"
              className={`${
                error.newPasswordConfirm !== '' ? 'border-[2px] border-red-600' : 'dark:border-[0px]'
              }  dark:bg-[#3A3B3C] outline-none dark:caret-white dark:text-dark-text  w-full px-4 py-2 rounded-lg border-[1px] border-gray-400 text-gray-800 `}
              placeholder="••••••••"
            ></input>
            <p className="text-xs text-red-600 mt-1 font-semibold">{error.newPasswordConfirm}</p>
          </div>
        </div>
        <div className="mt-6">
          <header className="font-semibold">Password requirements:</header>
          <p className="text-gray-700 dark:text-gray-400 text-sm ">Ensure that these requirements are met:</p>
          <p className="text-gray-700 dark:text-gray-400 text-sm pl-3 font-normal">
            At least 10 characters (and up to 100 characters)
          </p>
          <p className="text-gray-700 dark:text-gray-400 text-sm pl-3 font-normal">At least one uppercase character</p>
          <p className="text-gray-700 dark:text-gray-400 text-sm pl-3 font-normal">
            Inclusion of at least one special character, e.g., ! @ # ?
          </p>
        </div>
        <div
          onClick={() => {
            handleChangePassword();
          }}
          className={`${
            loading && 'opacity-70 '
          } mt-4 px-4 py-2 bg-primary-color dark:bg-primary-dark-color w-[100px] text-center rounded-full text-white cursor-pointer hover:opacity-80 transition-all `}
        >
          {loading ? <FontAwesomeIcon icon={faCircleNotch} spin></FontAwesomeIcon> : <p>Save all</p>}
        </div>
      </div>
    </>
  );
}

export default SecuritySetting;
