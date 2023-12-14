import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RatingProduct from './RatingProduct';
import { useCallback, useState } from 'react';
import http from '../../../utils/http';
import { useEffect } from 'react';
const initialCountRating = [0, 0, 0, 0, 0, 0];
function ReviewProduct({ product }) {
  const [ratings, setRatings] = useState([]);
  const [percent, setPercent] = useState(initialCountRating);
  const [countRating, setCountRating] = useState(initialCountRating);
  const [loading, setLoading] = useState(false);
  const getRatingProd = useCallback(async (prodId, sortStar) => {
    try {
      let url = `/rating/${prodId}`;
      if (sortStar !== 0) {
        url = `/rating/${prodId}?rating=${sortStar}`;
      }
      setLoading(true);
      const response = await http.get(url);
      if (response.data.status === 'success') {
        setRatings(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  const calcRating = async () => {
    const newArr = [0, 0, 0, 0, 0, 0];
    [1, 2, 3, 4, 5].forEach((el, i) => {
      ratings.forEach((rate, j) => {
        if (rate.rating === el) {
          newArr[el] += 1;
        }
      });
    });
    setCountRating(newArr);
  };
  const calcPercent = () => {
    const newArr = [0, 0, 0, 0, 0, 0];
    if (!product.numberRatings || product.numberRatings === 0) {
      setPercent(newArr);
      return;
    }
    [1, 2, 3, 4, 5].forEach((el, idx) => {
      newArr[el] = ((countRating[el] / product.numberRatings) * 100).toFixed(0);
    });
    setPercent(newArr);
  };
  useEffect(() => {
    if (Object.keys(product).length > 0) {
      getRatingProd(product._id, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  useEffect(() => {
    // Run calcRating whenever ratings change
    calcRating();
    calcPercent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratings]);

  return (
    <div className="  py-7 px-7  bg-white border-[1px] rounded-xl w-[80%] mt-9">
      <div>
        <header className="text-xl font-bold">{`Customer reviews about ${product.name}`}</header>
        <div className="flex mt-6 gap-5">
          <div className="basis-[40%] relative items-center flex flex-col after:absolute after:h-full after:w-[1px] after:right-0 after:bg-gray-300 ">
            <div className="mx-auto text-4xl font-bold">{`${product.avgRatings}/5`}</div>
            <div>
              {[1, 2, 3, 4, 5].map((el, idx) => {
                return (
                  <FontAwesomeIcon
                    key={idx}
                    className={`${idx < product.avgRatings ? 'text-[#08AC0A]' : 'text-[#4C4C4C]'} w-6 h-8`}
                    icon={faStar}
                  />
                );
              })}
            </div>
            <div className="mx-auto text-sm text-gray-500">{`( ${product.numberRatings} reviews )`}</div>
          </div>
          <div className="basis-[60%] flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">5</div>
              <div className="relative bg-gray-100 h-5 rounded-[6px] w-[50%]">
                <div style={{ width: percent[5] + '%' }} className={`absolute h-full bg-[#76DB98] rounded-[6px]`}></div>
              </div>
              <p className="text-sm font-bold min-w-[30px]">{percent[5]}%</p>
              <p className="text-sm text-gray-500">{countRating[5]}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">4</div>
              <div className="relative bg-gray-100 h-5 rounded-[6px] w-[50%]">
                <div style={{ width: percent[4] + '%' }} className={`absolute h-full bg-[#B7EA83] rounded-[6px]`}></div>
              </div>
              <p className="text-sm font-bold min-w-[30px]">{percent[4]}%</p>
              <p className="text-sm text-gray-500">{countRating[4]}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">3</div>
              <div className="relative bg-gray-100 h-5 rounded-[6px] w-[50%]">
                <div style={{ width: percent[3] + '%' }} className={`absolute h-full bg-[#F6D757] rounded-[6px]`}></div>
              </div>
              <p className="text-sm font-bold min-w-[30px]">{percent[3]}%</p>
              <p className="text-sm text-gray-500">{countRating[3]}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">2</div>
              <div className="relative bg-gray-100 h-5 rounded-[6px] w-[50%]">
                <div style={{ width: percent[2] + '%' }} className={`absolute h-full bg-[#FBB851] rounded-[6px]`}></div>
              </div>
              <p className="text-sm font-bold min-w-[30px]">{percent[2]}%</p>
              <p className="text-sm text-gray-500">{countRating[2]}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">1</div>
              <div className="relative bg-gray-100 h-5 rounded-[6px] w-[50%]">
                <div style={{ width: percent[1] + '%' }} className={`absolute h-full bg-[#F17A54] rounded-[6px]`}></div>
              </div>
              <p className="text-sm font-bold min-w-[30px]">{percent[1]}%</p>
              <p className="text-sm text-gray-500">{countRating[1]}</p>
            </div>
          </div>
        </div>
        <RatingProduct ratings={ratings} product={product} getRatingProd={getRatingProd} loading={loading} />
      </div>
    </div>
  );
}

export default ReviewProduct;
