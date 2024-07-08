import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img1 from '../../../assets/img/user/avatar.png';
import { faPenToSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import RatingModal from './RatingModal';
import SkeletonRating from './SkeletonRating';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../components/AuthProvider/AuthProvider';
function formatISOToCustom(dateString) {
  // Parse the ISO string without considering timezone differences
  const date = new Date(dateString);

  // Convert the date to the local time equivalent of UTC without adding time offset
  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );

  const hours = String(utcDate.getHours()).padStart(2, '0');
  const minutes = String(utcDate.getMinutes()).padStart(2, '0');
  const day = String(utcDate.getDate()).padStart(2, '0');
  const month = String(utcDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = String(utcDate.getFullYear()).slice(-2); // Get last two digits of the year

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

function RatingProduct({ product, ratings, getRatingProd, loading }) {
  const [sortState, setSortState] = useState('all');
  const { userData, setShowLoginModal } = useContext(AuthContext);
  const [sortStar, setSortStar] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const location = useLocation();
  const lct = new URLSearchParams(location.search);
  const rating = lct.get('rating');
  useEffect(() => {
    if (Object.keys(product).length > 0) {
      getRatingProd(product._id, sortStar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState, sortStar]);
  useEffect(() => {
    if (rating === '1') {
      setShowRatingModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="text-lg mt-6 flex justify-center items-center dark:text-primary-dark-color text-primary-color ">
        <div
          onClick={() => {
            if (!userData || Object.keys(userData).length === 0) {
              setShowLoginModal(true);
              return;
            }

            setShowRatingModal(true);
          }}
          className="border-[1px] flex justify-center hover:bg-[#e6f7eb] items-center gap-2 dark:border-primary-dark-color border-primary-color px-4 py-2 transition-all rounded-xl cursor-pointer"
        >
          <FontAwesomeIcon icon={faPenToSquare} className="" />
          <p className="select-none">Rating now</p>
        </div>
      </div>
      {showRatingModal && <RatingModal setShowRatingModal={setShowRatingModal} product={product} />}
      {showEditModal && <RatingModal setShowRatingModal={setShowEditModal} product={product} editRating={editData} />}
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-4"></div>
      <header className="text-xl font-bold">Sort By</header>
      <div>
        <div className="flex gap-4 mt-3">
          <div
            onClick={() => setSortState('all')}
            className={`px-4 bg-[#EBEDED] dark:bg-gray-700 cursor-pointer ${
              sortState === 'all' && 'dark:bg-primary-dark-color bg-primary-color text-white'
            }  py-2 rounded-full  font-semibold transition-all`}
          >
            All
          </div>
          <div
            onClick={() => setSortState('haveimage')}
            className={`px-4 bg-[#EBEDED] dark:bg-gray-700 cursor-pointer ${
              sortState === 'haveimage' && 'dark:bg-primary-dark-color bg-primary-color text-white'
            }  py-2 rounded-full  font-semibold transition-all`}
          >
            Have image
          </div>
        </div>
        <div className="flex gap-4 mt-2">
          {[5, 4, 3, 2, 1].map((el, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  if (sortStar === el) {
                    setSortStar(0);
                  } else setSortStar(el);
                }}
                className={`px-4 cursor-pointer bg-[#EBEDED] dark:bg-gray-700 ${
                  sortStar === el && 'dark:bg-primary-dark-color bg-primary-color text-white'
                }  py-2 rounded-full  font-semibold transition-all`}
              >
                {el} Star
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-4"></div>
      {!loading && (
        <div className="animate-slideTopDown flex flex-col gap-5 max-h-[400px] overflow-y-scroll">
          {ratings.length > 0 &&
            ratings.map((el, idx) => {
              return (
                <div key={idx} className="flex gap-2 items-start">
                  <div
                    style={{ backgroundImage: `url(${img1})` }}
                    className="h-[50px] w-[50px] bg-no-repeat bg-center bg-contain"
                  ></div>
                  <div className="basis-full">
                    <div className="bg-[#EBEDED] dark:bg-[#3A3B3C] flex flex-col justify-between py-2 px-3 rounded-lg ">
                      <div className="font-bold flex gap-2 items-center">
                        <div>{el.username}</div>
                        <div>
                          {[1, 2, 3, 4, 5].map((el1, idx) => {
                            return (
                              <FontAwesomeIcon
                                key={idx}
                                className={`${idx < el.rating ? 'text-[#FFBF00]' : 'text-[#4C4C4C]'} w-4 h-4`}
                                icon={faStar}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <input
                        type="text"
                        className=" text-[15px] caret-transparent leading-[20px] outline-none bg-[#EBEDED] dark:bg-[#3A3B3C"
                        defaultValue={el.contentRating}
                      ></input>
                      <div className="flex gap-2">
                        {el?.images.map((image, idx) => {
                          return (
                            <div
                              style={{ backgroundImage: `url(${image})` }}
                              className="h-[70px] mt-2 w-[70px] border-[1px] border-gray-400 cursor-pointer rounded-xl bg-no-repeat bg-center bg-contain"
                              key={idx}
                            ></div>
                          );
                        })}
                      </div>
                      <div className="mt-[2px] flex justify-between">
                        <div className="text-xs text-gray-600 dark:text-gray-500">{formatISOToCustom(el.dateRate)}</div>
                        {userData._id === el.id_user && (
                          <div
                            onClick={() => {
                              setShowEditModal(true);
                              setEditData(el);
                            }}
                            className="text-xs text-gray-600 dark:text-gray-500 hover:cursor-pointer hover:underline"
                          >
                            Edit
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {ratings.length === 0 && (
            <div className="px-4 py-4 flex gap-8 mt-2 border-[1px] rounded-md">
              <div
                style={{
                  backgroundImage: `url(https://shopcartimg2.blob.core.windows.net/shopcartctn/emptyInvoice.webp)`,
                }}
                className="w-[120px] h-[120px] bg-no-repeat bg-center bg-contain rounded-full"
              ></div>
              <div className="">
                <header className="font-bold text-lg mt-4">No result found</header>
                <p className="">
                  Could not find a result for the filter you selected. Reset filters to see all reviews.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {loading && <SkeletonRating />}
    </>
  );
}

export default RatingProduct;
