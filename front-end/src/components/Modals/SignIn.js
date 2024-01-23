import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthProvider/AuthProvider';

function SignIn({ setMethod }) {
  const { login, setShowLoginModal } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  function validatePassword(pw) {
    return /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw) && pw.length > 8;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (validateEmail(email) && validatePassword(password)) {
      setShowError(false);
      setLoading(true);
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}users/login`,
          {
            email: validateEmail(email)[0],
            password: password,
          },
          { withCredentials: true },
        );
        login();
        setShowLoginModal(false);
        setLoading(false);
        window.location.reload();
      } catch (error) {
        console.log(error.response);
        setShowError(true);
        setLoading(false);
      }
    } else if (email !== '' && password !== '') {
      setLoading(true);
      setTimeout(() => {
        setShowError(true);
        setLoading(false);
      }, 2000);
    }
    if (email === '') {
      setShowErrorEmail(true);
      setShowError(false);
    }
    if (password === '') {
      setShowErrorPassword(true);
      setShowError(false);
    }
  };
  return (
    <>
      <header className="text-center text-4xl font-bold text-gray-800 mb-6 dark:text-dark-text">Sign in</header>
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
              setShowError(false);
              setEmail(e.target.value);
            }}
            className={`dark:bg-[#3A3B3C] dark:border-[0px] w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full ${
              (showErrorEmail || showError) && 'border-red-400 bg-red-100'
            }`}
          ></input>
        </div>
        {showErrorEmail && <p className="text-xs text-red-600 ml-2 mt-1 font-medium">Please provide an email !!!</p>}
        <p className="ml-2 font-bold mt-3 mb-1">Password</p>
        <div className="flex items-center relative">
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setShowErrorPassword(false);
              setShowError(false);
              setPassword(e.target.value);
            }}
            className={`dark:bg-[#3A3B3C] dark:border-[0px] w-full bg-[#F1EFF1] outline-none px-12 font-semibold py-3 border-[1px] border-[#F1EFF1] rounded-full ${
              (showErrorPassword || showError) && 'border-red-400 bg-red-100'
            }`}
          ></input>
        </div>
        {showErrorPassword && (
          <p className="text-xs text-red-600 ml-2 mt-1 font-medium">Please provide a password !!!</p>
        )}
        {showError && (
          <p className="text-xs text-red-600 ml-2 mt-1 font-medium">Email or password is not correct !!!</p>
        )}
        <p
          onClick={() => setMethod('forgotPassword')}
          className="text-xs font-medium ml-2 underline mt-1 cursor-pointer"
        >
          Forgot your password ?
        </p>
        <button
          onClick={(e) => handleLogin(e)}
          className={`dark:bg-primary-dark-color mt-[15px] block select-none cursor-pointer transition-all  mx-auto text-center bg-primary-color w-[150px] px-6 py-3 rounded-full text-white text-lg font-semibold ${
            loading ? 'opacity-70' : 'hover:opacity-80'
          }`}
        >
          {loading ? (
            <div>
              <FontAwesomeIcon icon={faCircleNotch} spin />
            </div>
          ) : (
            <p>Login</p>
          )}
        </button>
      </form>
    </>
  );
}

export default SignIn;
