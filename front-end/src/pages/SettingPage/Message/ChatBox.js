import { useEffect, useState } from 'react';

export default function ChatBox({ chatItem }) {
  const [chatData, setChatData] = useState();
  useEffect(() => {
    if (chatItem) {
      setChatData(chatItem);
    }
  }, [chatItem]);
  return <div>ChatBox</div>;
}
