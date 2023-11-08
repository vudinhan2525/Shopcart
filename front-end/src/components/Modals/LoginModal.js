import { faCircleNotch, faLock, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { FacebookIcons, GoogleIcons, InstagramIcons, TwiterIcons } from '../../utils/IconSVG';
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import axios from 'axios';
function LoginModal() {
  const { setShowLoginModal } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleTurnOffModal = (e) => {
    if (e.target.classList.contains('modal')) {
      setShowLoginModal(false);
    }
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  function validatePassword(pw) {
    return /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw) && pw.length > 4;
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (validateEmail(email) && validatePassword(password)) {
      setShowError(false);
      setLoading(true);
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}users/login`, {
          email: validateEmail(email)[0],
          password: password,
        });
        console.log(response.data);
        setLoading(false);
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
    <div
      spellCheck={false}
      onMouseDown={(e) => handleTurnOffModal(e)}
      className=" modal fixed bg-black/50 top-0 bottom-0 left-0 right-0 z-[51]"
    >
      <div className="fixed px-8 py-8 rounded-2xl top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-white w-[500px] ">
        <header className="text-center text-4xl font-bold text-gray-800 mb-6">Sign in</header>
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
              className={`w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full ${
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
              className={`w-full bg-[#F1EFF1] outline-none px-12 font-semibold py-3 border-[1px] border-[#F1EFF1] rounded-full ${
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
          <button
            onClick={(e) => handleLogin(e)}
            className={`mt-[20px] block select-none cursor-pointer transition-all  mx-auto text-center bg-primary-color w-[150px] px-6 py-3 rounded-full text-white text-lg font-semibold ${
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
        <p className="text-center mt-4">Or sign in with social platforms</p>
        <div className="flex justify-center mt-2 gap-4">
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <FacebookIcons height="35px" width="35px" />
          </div>
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <GoogleIcons height="35px" width="35px" />
          </div>
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <InstagramIcons height="35px" width="35px" />
          </div>
          <div className="border-[1px] cursor-pointer p-1 border-gray-300 shadow-sm rounded-full ">
            <TwiterIcons height="35px" width="35px" />
          </div>
        </div>
        <div className="bg-gray-200 h-[1px] w-full mt-5"></div>
        <div className="flex justify-center pt-3 gap-2">
          <div>You dont have an account?</div>
          <Link
            target="_blank"
            to="/register"
            onClick={() => setShowLoginModal(false)}
            className="text-[#EF2950] font-semibold underline cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
        <div
          onClick={() => setShowLoginModal(false)}
          className="bg-[#F5F6F6] hover:bg-gray-300 flex items-center justify-center w-[45px] h-[45px] absolute top-[25px] right-[30px] cursor-pointer rounded-full"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
