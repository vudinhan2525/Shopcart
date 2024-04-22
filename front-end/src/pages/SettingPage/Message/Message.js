import ChatBox from './ChatBox';
import ChatList from './ChatList';
import { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../../../components/AuthProvider/AuthProvider';
function Message() {
  const { userData } = useContext(AuthContext);
  const [chatList, setChatList] = useState([]);
  const [chatSelected, setChatSelected] = useState(0);
  useEffect(() => {
    const socket = io('http://localhost:8002/');
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
    socket.emit('get-chat-list-from-client', userData._id);
    socket.on('return-chat-from-server', (res) => {
      setChatList(res);
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex py-4 px-4">
      <div className="basis-[31%]">
        <ChatList chatList={chatList} chatSelected={chatSelected} setChatSelected={setChatSelected} />
      </div>
      <div className="basis-[69%]">
        <ChatBox chatItem={chatList.length > 0 && chatList[chatSelected]} />
      </div>
    </div>
  );
}

export default Message;
