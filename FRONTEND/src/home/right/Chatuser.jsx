import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../stateManage/UseConversation.js";

const Chatuser = () => {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUserStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  if (!selectedConversation) return null;

  const isOnline = getOnlineUserStatus(selectedConversation._id) === "Online";

  return (
    <div className="pl-5 pt-5 pb-3 h-[12vh] flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300">
      <div className="relative">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img src="ab.jpg" alt="avatar" />
        </div>
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>

      <div>
        <h1 className="text-xl text-white">{selectedConversation.name}</h1>
        <span className="text-sm text-gray-300">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
};

export default Chatuser;
