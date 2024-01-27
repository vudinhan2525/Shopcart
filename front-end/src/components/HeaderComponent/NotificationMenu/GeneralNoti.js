import { forwardRef, useContext, useImperativeHandle } from 'react';
import formatDateAgo from '../../../utils/formatDate';
import http from '../../../utils/http';
import { AuthContext } from '../../AuthProvider/AuthProvider';
const GeneralNoti = forwardRef(({ notiGeneral, userData }, ref) => {
  const { refreshUserData } = useContext(AuthContext);
  const handleReadNoti = async (el) => {
    try {
      const response = await http.post(`/noti/readOneNoti`, { userId: userData._id, notiId: el._id });
      if (response.data.status === 'success') {
        refreshUserData();
      }
    } catch (error) {}
  };
  const handleReadAllNoti = async (el) => {
    try {
      const response = await http.post(`/noti/readAllNoti`, { userId: userData._id });
      if (response.data.status === 'success') {
        refreshUserData();
      }
    } catch (error) {}
  };
  useImperativeHandle(ref, () => ({
    readAllNoti() {
      handleReadAllNoti();
    },
  }));

  return (
    <div className="relative">
      <div className="max-h-[350px] overflow-y-auto">
        {notiGeneral.map((el, idx) => {
          return (
            <div
              key={idx}
              onClick={() => handleReadNoti(el)}
              className={`flex gap-3 py-2 px-3 hover:bg-gray-300 ${
                userData.notifications[idx].isRead === false && 'bg-gray-200'
              } items-center cursor-pointer rounded-xl`}
            >
              <div
                className=" w-[40px] h-[40px] bg-no-repeat bg-center bg-contain rounded-full"
                style={{ backgroundImage: `url(${el.images})` }}
              ></div>
              <div className="flex-1">
                <p className="text-base text-black  line-clamp-1 font-semibold">{el.header}</p>
                <p className="line-clamp-2 text-xs">{el.content}</p>
                <p className="text-[10px] font-bold text-blue-600">{formatDateAgo(el.dateUp)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default GeneralNoti;
