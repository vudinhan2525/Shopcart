import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate } from '../../../utils/formatDate';
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
              className=" h-[50px] min-w-[50px] bg-no-repeat bg-center bg-cover rounded-full"
            ></div>
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex gap-1">
                <p className="font-bold h-[24px] line-clamp-1">{el.shop.name}</p>
                <div className="">
                  {el?.shop.isChecked && <FontAwesomeIcon icon={faCircleCheck} className="text-sm text-[#20D5EC]" />}
                </div>
              </div>
              <div className="flex gap-1 w-full ">
                <p className="text-sm text-gray-500 basis-[70%] h-[24px] line-clamp-1">
                  {el.message[el.message.length - 1].message}
                </p>
                <div className="basis-[30%] text-sm text-gray-500 line-clamp-1">
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
