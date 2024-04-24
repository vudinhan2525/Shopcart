import { useContext, useEffect, useState } from 'react';
import ChatList from './ChatList';
import { io } from 'socket.io-client';
import { AuthContext } from '../../../components/AuthProvider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import ChatBox from '../../SettingPage/Message/ChatBox';

export default function MessageBox() {
  const [socket, setSocket] = useState();
  const [showShopList, setShowShopList] = useState(true);
  const [shopSelected, setShopSelected] = useState(0);
  const [shopList, setShopList] = useState([]);
  const [chatSelected, setChatSelected] = useState(0);
  const [chatList, setChatList] = useState([]);
  const { userData } = useContext(AuthContext);
  useEffect(() => {
    const socket = io('http://localhost:8002/');

    setSocket(socket);
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
    socket.emit('get-shop-list-from-client', { userShop: userData.adminShop });
    socket.on('return-shop-list-from-server', (res) => {
      setShopList(res);
    });
    //socket.emit('get-chat-list-from-client', { userId: userData._id, fromUser: false });
    socket.on('return-chat-from-server', (res) => {
      setChatList(res);
    });
    socket.on('send-message-from-server', (msg) => {
      setChatList((prevChatData) => {
        const updatedChatData = prevChatData.map((conversation) => {
          if (conversation.conv_id === msg.conv_id) {
            return {
              ...conversation,
              message: [...conversation.message, msg],
            };
          }
          return conversation;
        });
        console.log(updatedChatData);
        return updatedChatData;
      });
    });
    socket.on('return-updateseen-from-server', ({ shopSeenAt, userSeenAt, convId }) => {
      setChatList((prev) => {
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].conv_id === convId) {
            prev[i].shopSeenAt = shopSeenAt;
            prev[i].userSeenAt = userSeenAt;
          }
        }
        return prev;
      });
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (socket && shopList.length > 0) {
      socket.emit('get-chat-list-from-client', { shopId: shopList[shopSelected]._id, fromUser: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopSelected, shopList]);
  return (
    <div className="flex">
      {showShopList && (
        <div>
          <header className="text-2xl font-bold px-3 mb-6">All chats from users</header>
          <div className="flex flex-col">
            {shopList.map((el, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setShopSelected(idx);
                    setShowShopList(false);
                  }}
                  className="px-4 py-3 flex gap-2 transition-all rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <div
                    style={{ backgroundImage: `url(${el.avatar})` }}
                    className=" h-[50px] min-w-[50px] bg-no-repeat bg-center bg-cover rounded-full"
                  ></div>
                  <div className="flex gap-1">
                    <p className="font-bold h-[24px] line-clamp-1">{el.name}</p>
                    <div className="">
                      {el.isChecked && <FontAwesomeIcon icon={faCircleCheck} className="text-sm text-[#20D5EC]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!showShopList && (
        <div className="flex relative w-full">
          <div
            onClick={() => {
              setShowShopList(true);
            }}
            className="absolute w-[50px] h-[50px]  cursor-pointer flex items-center justify-center rounded-full transition-all hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-xl" />
          </div>
          <div className="basis-[25%]">
            <ChatList chatList={chatList} chatSelected={chatSelected} setChatSelected={setChatSelected}></ChatList>
          </div>
          <div className="basis-[75%]">
            <ChatBox socket={socket} forUser={false} chatItem={chatList.length > 0 && chatList[chatSelected]}></ChatBox>
          </div>
        </div>
      )}
    </div>
  );
}
