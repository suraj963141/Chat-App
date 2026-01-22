import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../stateManage/UseConversation.js";
import { useEffect } from "react";
import sound from "../assets/notifi.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const setMessages = useConversation((state) => state.setMessages);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const audio = new Audio(sound);
      audio.play();

      setMessages((prevMessages) => {
        if (!Array.isArray(prevMessages)) {
          return [newMessage];
        }
        return [...prevMessages, newMessage];
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, setMessages]);
};

export default useGetSocketMessage;
