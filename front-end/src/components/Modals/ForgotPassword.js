import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
function ForgotPassword({ setMethod }) {
  const [email, setEmail] = useState('');
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === '' || !validateEmail(email)) {
      setShowErrorEmail(true);
    } else {
      setLoading(true);
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}users/forgotPassword`,
          {
            email: validateEmail(email)[0],
          },
          { withCredentials: true },
        );
        setLoading(false);
        setShowSuccess(true);
      } catch (error) {
        setShowErrorEmail(true);
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <header className="text-center text-4xl font-bold text-gray-800 mb-6 dark:text-dark-text">Forgot Password</header>
      <p className="text-base ml-2 font-bold mb-1">Email</p>
      <form>
        <div className="flex items-center relative">
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <input
            placeholder="Email"
            value={email}
            required
            onChange={(e) => {
              setShowErrorEmail(false);
              setShowSuccess(false);
              setEmail(e.target.value);
            }}
            className={`dark:bg-[#3A3B3C] dark:border-[0px] w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full ${
              showErrorEmail && 'border-red-400 bg-red-100'
            }`}
          ></input>
        </div>
        {showErrorEmail && <p className="text-xs text-red-600 ml-2 mt-1 font-medium">Email is invalid !!!</p>}
        {showSuccess && (
          <p className="text-sm font-semibold italic mt-2">
            * An email to reset your password has been sent to your email address. Check and reset the password.
          </p>
        )}
        <button
          onClick={(e) => handleLogin(e)}
          className={`dark:bg-primary-dark-color mt-[15px] block select-none cursor-pointer transition-all  mx-auto text-center bg-primary-color  px-6 py-3 rounded-full text-white text-lg font-semibold ${
            loading ? 'opacity-70' : 'hover:opacity-80'
          }`}
        >
          {loading ? (
            <div>
              <FontAwesomeIcon icon={faCircleNotch} spin />
            </div>
          ) : (
            <p>Send me an email</p>
          )}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
