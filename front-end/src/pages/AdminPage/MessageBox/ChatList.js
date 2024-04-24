import { formatDate } from '../../../utils/formatDate';

export default function ChatList({ chatList, chatSelected, setChatSelected }) {
  return (
    <div className="flex flex-col mt-14">
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
              style={{ backgroundImage: `url(${el?.user.avatar})` }}
              className=" h-[50px] min-w-[50px] bg-no-repeat bg-center bg-cover rounded-full"
            ></div>
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex gap-1">
                <p className="font-bold h-[24px] line-clamp-1">{el.user.firstName + ' ' + el.user.lastName}</p>
              </div>
              <div className="flex gap-1 w-full ">
                <p
                  className={`${
                    el.message[el.message.length - 1].fromUser &&
                    el.message[el.message.length - 1].createdAt > el.shopSeenAt
                      ? 'text-gray-900 font-semibold'
                      : ' text-gray-500'
                  } text-sm basis-[70%] h-[24px] line-clamp-1`}
                >
                  {el.message[el.message.length - 1].message}
                </p>
                <div
                  className={`${
                    el.message[el.message.length - 1].fromUser &&
                    el.message[el.message.length - 1].createdAt > el.shopSeenAt
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
