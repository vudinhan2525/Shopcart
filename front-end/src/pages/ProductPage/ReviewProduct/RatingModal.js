import { useContext } from 'react';
import { AuthContext } from '../../../components/AuthProvider/AuthProvider';
import img1 from '../../../assets/img/user/avatar.png';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faCamera, faStar as faStar2, faX } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { Textarea, Button } from '@material-tailwind/react';
import http from '../../../utils/http';
import { ToastContext } from '../../../components/AuthProvider/ToastProvider';
function RatingModal({ product, setShowRatingModal }) {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [isError, setIsError] = useState(false);
  const { userData } = useContext(AuthContext);
  const { setOpen, setMessage } = useContext(ToastContext);
  const [rating, setRating] = useState(1);
  const [contentRating, setContentRating] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  useEffect(() => {
    if (!files) return;
    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }
    const objectUrls = tmp;
    setPreview(objectUrls);
    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [files]);
  const handleClickDeleteImage = (idx) => {
    const updatedFiles = files.filter((el, id) => id !== idx);
    setFiles(updatedFiles);
  };
  const handlePostRating = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    formData.append('rating', rating);
    formData.append('contentRating', contentRating);
    formData.append('username', userData.firstName + ' ' + userData.lastName);
    formData.append('id_user', userData._id);
    formData.append('id_prod', product._id);
    formData.append('id_shop', product.shop);

    try {
      const response = await http.post('/rating', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status === 'success') {
        setShowRatingModal(false);
        setOpen(true);
        setMessage('Your rating has been submited !');
        setTimeout(() => {
          setOpen(false);
        }, [3000]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed animate-slideTopDown z-[999] top-0 bottom-0 right-0 left-0 bg-black/30">
      <div className="fixed w-[580px]  px-6 pt-6 pb-3 bg-white top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] rounded-3xl">
        <header className="text-center font-semibold text-lg line-clamp-1 h-[28px]">{product.name}</header>
        <div className="w-full h-[1px] bg-gray-200 my-4"></div>
        <div className="overflow-y-scroll max-h-[400px] px-3">
          <div className="flex gap-2 items-center">
            <div
              className="w-[50px] h-[50px] bg-no-repeat bg-center bg-contain rounded-full"
              style={{ backgroundImage: `url(${img1})` }}
            ></div>
            <div>
              <div className="text-[18px] font-semibold">{userData.firstName + ' ' + userData.lastName}</div>
              <div className="text-[12px] text-gray-600">Public post</div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 mt-4">
            {[1, 2, 3, 4, 5].map((el, idx) => {
              return (
                <div key={idx}>
                  <FontAwesomeIcon
                    onClick={() => {
                      setRating(el);
                    }}
                    icon={el <= rating ? faStar2 : faStar}
                    className={`${el <= rating ? 'text-[#FFBF00]' : 'text-gray-700'}  w-10 h-10 cursor-pointer`}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-4 ">
            <Textarea
              onChange={(e) => {
                if (e.target.value.trim() === '') {
                  setIsError(true);
                } else {
                  setIsError(false);
                }
                setContentRating(e.target.value);
              }}
              value={contentRating}
              className=""
              label="Your rating comment"
              rows={7}
              error={isError}
            ></Textarea>
          </div>
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            multiple
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const fileListAsArray = Array.from(e.target.files);
                setFiles(fileListAsArray);
              }
            }}
          ></input>
          <div
            className="w-[200px] my-3 mx-auto gap-3 flex items-center justify-center text-primary-color border-[1px] py-3 font-semibold cursor-pointer border-primary-color bg-white text-center rounded-full"
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <FontAwesomeIcon icon={faCamera} className="w-6 h-6" />
            <p>Upload image</p>
          </div>
          <div className="flex gap-2">
            {preview.map((pic, idx) => {
              return (
                <div
                  key={idx}
                  className="relative rounded-xl w-[100px] h-[100px] border-[1px] bg-no-repeat bg-center bg-contain"
                  style={{ backgroundImage: `url(${pic})` }}
                >
                  <div
                    onClick={() => handleClickDeleteImage(idx)}
                    className="absolute bg-white top-[5%] flex items-center cursor-pointer justify-center  border-[1px] w-[25px] h-[25px] right-[5%] rounded-full"
                  >
                    <FontAwesomeIcon icon={faX} className="w-2 h-2 "></FontAwesomeIcon>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-200 my-3"></div>
        <div className="flex justify-end gap-4 ">
          <Button
            onClick={() => setShowRatingModal(false)}
            variant="outlined"
            className="text-primary-color border-primary-color"
          >
            Cancel
          </Button>
          <Button onClick={() => handlePostRating()} className="bg-primary-color" disabled={isError}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;
