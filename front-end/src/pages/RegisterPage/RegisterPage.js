import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleNotch, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FacebookIcons, GoogleIcons, InstagramIcons, TwiterIcons } from '../../utils/IconSVG/index';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import axios from 'axios';
function RegisterPage() {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  function validatePassword(pw) {
    return /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw) && pw.length > 8;
  }

  const handleSubmit = async () => {
    if (loading) return;
    if (param.token) {
      if (validatePassword(password) && passwordConfirm === password) {
        setError([]);
        setLoading(true);
        try {
          const response = await axios.patch(
            `${process.env.REACT_APP_BACKEND_URL}users/resetPassword/${param.token}`,
            {
              password: password,
              passwordConfirm: passwordConfirm,
            },
            {
              withCredentials: true,
            },
          );
          if (response.data.message === 'success') {
            window.location.href = '/';
          }
          setLoading(false);
        } catch (error) {
          console.log(error.response);
          setLoading(false);
        }
      }
    } else {
      if (isEmail(email) && validatePassword(password) && passwordConfirm === password) {
        setError([]);
        setLoading(true);
        try {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}users/signup`,
            {
              name: 'User',
              email: email,
              password: password,
              passwordConfirm: passwordConfirm,
              role: 'user',
            },
            {
              withCredentials: true,
            },
          );
          window.location.href = '/';
          setLoading(false);
        } catch (error) {
          setErrorMsg(error.response.data.message);
          setLoading(false);
        }
      }
    }
    if (!isEmail(email)) {
      setError((prev) => [...prev, 'email']);
    }
    if (!validatePassword(password)) {
      setError((prev) => [...prev, 'password']);
    }
    if (passwordConfirm !== password) {
      setError((prev) => [...prev, 'passwordConfirm']);
    }
  };
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-register-ct  w-full">
      <div className="right-[50%] translate-x-[50%] translate-y-[-50%] overflow-hidden rounded-[30px] shadow-xl top-[50%] absolute w-[1000px]  bg-white">
        <div className="flex">
          <div className="basis-1/2">
            <div className="px-8 py-8 ">
              <header className="text-center text-4xl font-bold text-gray-800 mb-2">
                {param.token ? 'Reset your password' : 'Sign up'}
              </header>
              {!param.token && (
                <>
                  <p className="text-base ml-2 font-bold mb-1">Email</p>
                  <div className="flex items-center relative">
                    <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <input
                      onChange={(e) => {
                        setError((prev) => prev.filter((el) => el !== 'email'));
                        setEmail(e.target.value);
                        setErrorMsg('');
                      }}
                      value={email}
                      placeholder="Email"
                      className={`w-full ${
                        error.includes('email') && 'border-red-400 bg-red-100'
                      } bg-[#F1EFF1] border-[1px] border-[#F1EFF1] outline-none px-12  font-semibold py-3 rounded-full`}
                    ></input>
                  </div>
                  {error.includes('email') && (
                    <p className="text-xs ml-2 text-red-500 mt-1 font-medium">Email is invalid !!!</p>
                  )}
                </>
              )}

              <p className="ml-2 font-bold mt-3 mb-1">Password</p>
              <div className="flex items-center relative">
                <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setError((prev) => prev.filter((el) => el !== 'password'));
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  className={`w-full ${
                    error.includes('password') && 'border-red-400 bg-red-100'
                  } bg-[#F1EFF1] border-[1px] border-[#F1EFF1] outline-none px-12  font-semibold py-3 rounded-full`}
                ></input>
              </div>
              {error.includes('password') && (
                <p className="text-xs ml-2 text-red-500 mt-1 font-medium">Invalid password !!!</p>
              )}
              <p className="ml-2 font-bold mt-3 mb-1">Confirm Password</p>
              <div className="flex items-center relative">
                <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => {
                    setError((prev) => prev.filter((el) => el !== 'passwordConfirm'));
                    setPasswordConfirm(e.target.value);
                  }}
                  placeholder="Confirm Password"
                  className={`w-full ${
                    error.includes('passwordConfirm') && 'border-red-400 bg-red-100'
                  } bg-[#F1EFF1] border-[1px] border-[#F1EFF1] outline-none px-12  font-semibold py-3 rounded-full`}
                ></input>
              </div>
              {error.includes('passwordConfirm') && (
                <p className="text-xs ml-2 text-red-500 mt-1 font-medium">Invalid password confirm !!!</p>
              )}
              <p className="text-xs mt-2 ml-2 italic">
                * A password must contain at least 1 digit 1 alphabetic 1 special character and minimum 8 characters
              </p>
              <p className="text-xs text-red-600 font-semibold ml-2 mt-1">{errorMsg}</p>
              <div
                onClick={handleSubmit}
                className={`${param.token ? 'w-[200px] mt-[15px]' : 'w-[150px] mt-[5px]'} ${
                  loading ? 'opacity-80' : 'hover:opacity-80'
                }  select-none cursor-pointer transition-all mx-auto text-center bg-primary-color  px-6 py-3 rounded-full text-white text-lg font-semibold`}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                  </>
                ) : (
                  <>{param.token ? 'Reset password' : 'Sign Up'}</>
                )}
              </div>
              <p className="text-center mt-4">Or sign up with social platforms</p>
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
            </div>
          </div>
          <div className="relative basis-1/2 bg-primary-color text-[#FFE6CC] rounded-l-[150px]">
            <header className="text-center mt-[35%] text-[40px] leading-[42px]  font-bold">
              Hello from ShopCart !!!
            </header>
            <p className="mt-6 text-center max-w-[350px] text-lg mx-auto">
              Register with your personal details to use all of site features
            </p>
            <div className="group mt-4 text-center select-none bg-[#FFE6CC] text-primary-color w-[170px] cursor-pointer mx-auto py-3 rounded-full">
              <div className="group-hover:pl-2 inline-block transition-all">Visit Shopcart</div>
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </div>
            <div className="absolute w-[10px] top-0 h-[100%] bg-primary-color right-[-1px] "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
