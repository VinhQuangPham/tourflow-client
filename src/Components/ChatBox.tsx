import { useEffect, useRef, useState } from "react";
import "../styles/ChatBox.css";
import { v4 as uuidv4 } from "uuid";

interface MessageSender {
  sender: string;
  text: string;
}

interface MessageRecipient {
  recipient_id: string;
  text: string;
}
const uniqueId: string = uuidv4();
type Message = MessageSender | MessageRecipient;

const ChatBox = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [val, setVal] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const buttons = [
    {
      title: "Đặt tour",
      payload: "/request_tour_form",
    },
    {
      title: "Xem tour phổ biến",
      payload: "/show_tours",
    },
  ];

  const postMessageToAIService = async (sender: string, message: any) => {
    try {
      // const res = await fetch("http://localhost:5111/api/home", {
      //test api
      const res = await fetch(
        "http://10.106.21.73:5005/webhooks/rest/webhook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sender, message }),
          mode: "cors",
        }
      );
      if (!res.ok) {
        console.log("POST FAILED");
        throw new Error("Network response was not ok");
      }

      const data: MessageRecipient[] = await res.json();
      data.map((message) =>
        setMessageList((prevList) => [message, ...prevList])
      );
      console.log(messageList);
      // setMessageList((prevList) => [data, ...prevList]);
    } catch (error) {
      console.error(
        "Exception in postMessageToAIService in ChatBot.tsx",
        error
      );
    }
  };
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVal(e.target.value);
  }
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Enter pressed"); // kiểm tra xem hàm có được gọi hai lần không

      scrollToBottom();
      setMessage(val);
    }
  };
  // xuất phát từ Sài Gòn

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessageBox = (message: string, index: any, className: string) => {
    return (
      <div key={index} className={`message_box ${className}`}>
        {message}
      </div>
    );
  };
  useEffect(() => {
    scrollToBottom();
    if (message) {
      const newUserMessage: MessageSender = {
        sender: uniqueId,
        text: val,
      };
      setMessageList((prevList) => [newUserMessage, ...prevList]);
      postMessageToAIService(uniqueId, message);
    }
    setVal("");
  }, [message]);
  function isRecipientMessage(message: Message): message is MessageRecipient {
    return (message as MessageRecipient).recipient_id !== undefined;
  }
  return (
    <div id="container">
      <div id="chat_name">Nicole ChatBot</div>
      <div id="messages_container">
        {messageList.map((message: Message, index) => {
          if (isRecipientMessage(message)) {
            return addMessageBox(message.text, index, "bot");
          } else {
            return addMessageBox(message.text, index, "user");
          }
        })}
      </div>
      <div id="button_container">
        {buttons.map((button, index) => (
          <div
            className="button"
            key={index}
            onClick={() => {
              postMessageToAIService(uniqueId, button.payload);
              console.log(button.payload);
            }}
          >
            {button.title}
          </div>
        ))}
      </div>
      <input
        type="text"
        id="chat_input"
        placeholder="input yout message"
        value={val}
        onChange={handleChange}
        onKeyDown={(e: any) => {
          handleKeyPress(e);
        }}
      />
    </div>
  );
};

export default ChatBox;
