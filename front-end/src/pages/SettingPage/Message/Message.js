import ChatBox from './ChatBox';
import ChatList from './ChatList';
import { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../../../components/AuthProvider/AuthProvider';
function Message() {
  const { userData } = useContext(AuthContext);
  const [chatList, setChatList] = useState([]);
  const [chatSelected, setChatSelected] = useState(0);
  const [socket, setSocket] = useState();
  useEffect(() => {
    const socket = io('http://localhost:8002/');
    setSocket(socket);
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
    socket.emit('get-chat-list-from-client', { userId: userData._id, fromUser: true });
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
    const intervalId = setInterval(() => {
      socket.emit('get-chat-list-from-client', { userId: userData._id, fromUser: true });
    }, 120000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  return (
    <div>
      {chatList.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-20">
          <p>You currently have no chats</p>
        </div>
      )}
      {chatList.length !== 0 && (
        <div className="flex py-4 px-4 gap-4">
          <div className="basis-[31%]">
            <ChatList chatList={chatList} chatSelected={chatSelected} setChatSelected={setChatSelected} />
          </div>
          <div className="basis-[69%]">
            <ChatBox socket={socket} forUser={true} chatItem={chatList.length > 0 && chatList[chatSelected]} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
