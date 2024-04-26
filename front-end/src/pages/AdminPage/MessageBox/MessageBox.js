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
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(false);
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
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (socket && shopList.length > 0) {
        socket.emit('get-chat-list-from-client', { shopId: shopList[shopSelected]._id, fromUser: false });
      }
    }, 120000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
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
                    setIsLoading(true);
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
            {!isLoading && (
              <ChatList
                setIsLoading={setIsLoading}
                chatList={chatList}
                chatSelected={chatSelected}
                setChatSelected={setChatSelected}
              ></ChatList>
            )}
            {isLoading && (
              <div className="mt-12">
                {[1, 2, 3, 4].map((el, idx) => {
                  return (
                    <div key={idx} className="px-6 animate-pulse flex">
                      <div className="w-[60px] h-[60px]">
                        <svg
                          className="w-10 h-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="basis-[75%]">
            {!isLoading && <ChatBox socket={socket} forUser={false} chatItem={chatList[chatSelected]}></ChatBox>}
          </div>
        </div>
      )}
    </div>
  );
}
