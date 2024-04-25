import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { calculateTimeAgo, formatDate } from '../../../utils/formatDate';
export default function ChatList({ chatList, chatSelected, setChatSelected }) {
  return (
    <div className="flex flex-col ">
      {chatList.map((el, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              setChatSelected(idx);
            }}
            className={`${
              chatSelected === idx ? 'bg-gray-200' : 'hover:bg-gray-100'
            } flex px-4 gap-2 py-2  transition-all cursor-pointer rounded-lg`}
          >
            <div
              style={{ backgroundImage: `url(${el?.shop.avatar})` }}
              className=" h-[50px] relative min-w-[50px] bg-no-repeat bg-center bg-cover rounded-full"
            >
              <div
                className={`${
                  el?.shop.isActive ? 'block' : 'hidden'
                } bg-green-500 w-[15px] h-[15px] border-[2px] border-white absolute bottom-[0px] right-[0px] rounded-full`}
              ></div>
              {el?.shop.isActive === false && calculateTimeAgo(el?.shop.lastActive) && (
                <div className="bg-green-200 w-[23px] h-[11px] justify-center text-[11px] px-3 py-2 font-bold flex items-center border-[2px] text-green-600 border-white absolute bottom-[1px] right-[-6px] rounded-full">
                  {`${calculateTimeAgo(el?.shop.lastActive)}m`}
                </div>
              )}
            </div>

            <div className="flex flex-col flex-1 gap-1">
              <div className="flex gap-1">
                <p className="font-bold h-[24px] line-clamp-1">{el.shop.name}</p>
                <div className="">
                  {el?.shop.isChecked && <FontAwesomeIcon icon={faCircleCheck} className="text-sm text-[#20D5EC]" />}
                </div>
              </div>
              <div className="flex gap-1 w-full ">
                <p
                  className={`${
                    el.message[el.message.length - 1].fromUser === false &&
                    el.message[el.message.length - 1].createdAt > el.userSeenAt
                      ? 'text-gray-900 font-semibold'
                      : ' text-gray-500'
                  } text-sm basis-[70%] h-[24px] line-clamp-1`}
                >
                  {el.message[el.message.length - 1].message}
                </p>
                <div
                  className={`${
                    el.message[el.message.length - 1].fromUser === false &&
                    el.message[el.message.length - 1].createdAt > el.userSeenAt
                      ? 'text-gray-900 font-semibold'
                      : ' text-gray-500'
                  } basis-[30%] text-sm line-clamp-1`}
                >
                  {formatDate(el.message[el.message.length - 1].createdAt)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
