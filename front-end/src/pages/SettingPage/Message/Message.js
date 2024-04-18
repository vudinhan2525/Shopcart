import ChatBox from './ChatBox';
import ChatList from './ChatList';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
function Message() {
  useEffect(() => {
    // const socket = io('http://localhost:8002/');
    // socket.on('connect', () => {
    //   console.log('Connected to Socket.IO server');
    // });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  return (
    <div className="flex">
      <div className="basis-[25%]">
        <ChatList />
      </div>
      <div className="basis-[75%]">
        <ChatBox />
      </div>
    </div>
  );
}

export default Message;
