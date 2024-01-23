import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img1 from '../../../assets/img/user/avatar.png';
import { faPenToSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import RatingModal from './RatingModal';
import SkeletonRating from './SkeletonRating';
function RatingProduct({ product, ratings, getRatingProd, loading }) {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [sortState, setSortState] = useState('all');
  const [sortStar, setSortStar] = useState(0);
  useEffect(() => {
    if (Object.keys(product).length > 0) {
      getRatingProd(product._id, sortStar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState, sortStar]);
  return (
    <>
      <div className="text-lg mt-6 flex justify-center items-center dark:text-primary-dark-color text-primary-color ">
        <div
          onClick={() => setShowRatingModal(true)}
          className="border-[1px] flex justify-center hover:bg-[#e6f7eb] items-center gap-2 dark:border-primary-dark-color border-primary-color px-4 py-2 transition-all rounded-xl cursor-pointer"
        >
          <FontAwesomeIcon icon={faPenToSquare} className="" />
          <p className="select-none">Rating now</p>
        </div>
      </div>
      {showRatingModal && <RatingModal setShowRatingModal={setShowRatingModal} product={product} />}

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
          {ratings.map((el, idx) => {
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
                    <div className=" text-[15px] leading-[20px] ">{el.contentRating}</div>
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
                    <div className="mt-[2px]">
                      <div className="text-xs text-gray-600 dark:text-gray-500">{el.dateRate}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {loading && <SkeletonRating />}
    </>
  );
}

export default RatingProduct;
