import ChatBox from './ChatBox';
import ChatList from './ChatList';

export default function MessageBox() {
  return (
    <div className="flex">
      <div className="basis-[23%]">
        <ChatList></ChatList>
      </div>
      <div className="basis-[77%]">
        <ChatBox></ChatBox>
      </div>
    </div>
  );
}
