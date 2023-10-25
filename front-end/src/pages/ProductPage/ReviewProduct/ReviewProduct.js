import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img1 from '../../../assets/img/user/avatar.png';
function ReviewProduct() {
  return (
    <div className="  py-7 px-7  bg-white border-[1px] rounded-xl w-[80%] mt-9">
      <div>
        <header className="text-xl font-bold">Customer reviews about Iphone13</header>
        <div className="flex mt-6 gap-5">
          <div className="basis-[40%] relative items-center flex flex-col after:absolute after:h-full after:w-[1px] after:right-0 after:bg-gray-300 ">
            <div className="mx-auto text-4xl font-bold">4.7/5</div>
            <div>
              <FontAwesomeIcon className="text-[#08AC0A] w-6 h-8" icon={faStar} />
              <FontAwesomeIcon className="text-[#08AC0A] w-6 h-8" icon={faStar} />
              <FontAwesomeIcon className="text-[#08AC0A] w-6 h-8" icon={faStar} />
              <FontAwesomeIcon className="text-[#08AC0A] w-6 h-8" icon={faStar} />
              <FontAwesomeIcon className="text-[#08AC0A] w-6 h-8" icon={faStar} />
            </div>
            <div className="mx-auto text-sm text-gray-500">( 1315 reviews )</div>
          </div>
          <div className="basis-[60%] flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">5</div>
              <div className="relative bg-gray-100 h-5 rounded-[6px] w-[50%]">
                <div className="absolute h-full bg-[#76DB98] w-[75%] rounded-[6px]"></div>
              </div>
              <p className="text-sm font-bold min-w-[30px]">75%</p>
              <p className="text-sm text-gray-500">982</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">4</div>
              <div className="relative bg-gray-100 h-5 rounded-[6px] w-[50%]">
                <div className="absolute h-full bg-[#B7EA83] w-[16%] rounded-[6px]"></div>
              </div>
              <p className="text-sm font-bold min-w-[30px]">16%</p>
              <p className="text-sm text-gray-500">205</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">3</div>
              <div className="relative bg-gray-100 h-5 rounded-[6px] w-[50%]">
                <div className="absolute h-full bg-[#F6D757] w-[5%] rounded-[6px]"></div>
              </div>
              <p className="text-sm font-bold min-w-[30px]">5%</p>
              <p className="text-sm text-gray-500">65</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">2</div>
              <div className="relative bg-gray-100 h-5 rounded-[6px] w-[50%]">
                <div className="absolute h-full bg-[#FBB851] w-[1%] rounded-[6px]"></div>
              </div>
              <p className="text-sm font-bold min-w-[30px]">1%</p>
              <p className="text-sm text-gray-500">17</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">1</div>
              <div className="relative bg-gray-100 h-5 rounded-[6px] w-[50%]">
                <div className="absolute h-full bg-[#F17A54] w-[3%] rounded-[6px]"></div>
              </div>
              <p className="text-sm font-bold min-w-[30px]">3%</p>
              <p className="text-sm text-gray-500">46</p>
            </div>
          </div>
        </div>
        <header className="text-xl font-bold">Sort By</header>
        <div>
          <div className="flex gap-4 mt-3">
            <div className="px-4 cursor-pointer active-ct bg-[#EBEDED] py-2 rounded-full font-semibold">All</div>
            <div className="px-4 cursor-pointer bg-[#EBEDED] py-2 rounded-full font-semibold">Have image</div>
            <div className="px-4 cursor-pointer bg-[#EBEDED] py-2 rounded-full font-semibold">Sold</div>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="px-4 cursor-pointer bg-[#EBEDED] py-2 rounded-full font-semibold">5 Star</div>
            <div className="px-4 cursor-pointer bg-[#EBEDED] py-2 rounded-full font-semibold">4 Star</div>
            <div className="px-4 cursor-pointer bg-[#EBEDED] py-2 rounded-full font-semibold">3 Star</div>
            <div className="px-4 cursor-pointer bg-[#EBEDED] py-2 rounded-full font-semibold">2 Star</div>
            <div className="px-4 cursor-pointer bg-[#EBEDED] py-2 rounded-full font-semibold">1 Star</div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-200 my-4"></div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 items-center">
            <div
              style={{ backgroundImage: `url(${img1})` }}
              className="h-[50px] w-[50px] bg-no-repeat bg-center bg-contain"
            ></div>
            <div className="basis-full">
              <div className="bg-[#EBEDED] flex flex-col justify-between py-2 px-3 rounded-lg h-[90px]">
                <div className="font-bold flex gap-2 items-center">
                  <div>Nhung Phạm</div>
                  <div>
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                  </div>
                </div>
                <div className=" text-[15px] leading-[20px] ">
                  Giao hàng nhanh nhân viên nhiệt tình, điện thoại xài rất mượt ^^
                </div>
                <div className="mt-[2px]">
                  <div className="text-xs text-gray-600">17/10/2023 11:09</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              style={{ backgroundImage: `url(${img1})` }}
              className="h-[50px] w-[50px] bg-no-repeat bg-center bg-contain"
            ></div>
            <div className=" basis-full">
              <div className="bg-[#EBEDED] flex flex-col justify-between py-2 px-3 rounded-lg h-[90px]">
                <div className="font-bold flex gap-2 items-center">
                  <div>An Vu</div>
                  <div>
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-gray-700 w-4 h-4" icon={faStar} />
                  </div>
                </div>
                <div className=" text-[15px] leading-[20px] flex items-center">Chất lượng rất tốt</div>
                <div className="mt-[2px]">
                  <div className="text-xs text-gray-600">17/10/2023 11:09</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div
              style={{ backgroundImage: `url(${img1})` }}
              className="h-[50px] w-[50px] bg-no-repeat bg-center bg-contain"
            ></div>
            <div className=" basis-full">
              <div className="bg-[#EBEDED] flex flex-col justify-between py-2 px-3 rounded-lg h-[90px]">
                <div className="font-bold flex gap-2 items-center">
                  <div>Hieu Nguyen</div>
                  <div>
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-[#FFBF00] w-4 h-4" icon={faStar} />
                    <FontAwesomeIcon className="text-gray-700 w-4 h-4" icon={faStar} />
                  </div>
                </div>
                <div className=" text-[15px] leading-[20px] flex items-center">
                  Với mình đây là mẫu iPhone vừa vặn nhất từ túi tiền, tính năng, kích thước,
                </div>
                <div className="mt-[2px]">
                  <div className="text-xs text-gray-600">17/10/2023 11:09</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewProduct;
