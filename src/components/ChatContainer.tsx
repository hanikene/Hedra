import moment from "moment";
import { NextPage } from "next";

interface Message {
  text: string;
  owner: string;
  date: Date;
  id: string;
}

interface Props {
  userId: string;
  messages: Message[];
}

const ChatContainer: NextPage<Props> = ({ userId, messages }) => {
  return (
    <div className="sm:pt-8 px-3 sm:px-8 space-y-5">
      {messages.map((message) => (
        <MessageLine key={message.id} message={message} userId={userId} />
      ))}
    </div>
  );
};

interface MessageLineProps {
  userId: string;
  message: Message;
}

const MessageLine: NextPage<MessageLineProps> = ({ message, userId }) => {
  const isUserMessage = message.owner !== userId;
  return (
    <div
      key={message.id}
      className={`flex justify-between items-end ${
        isUserMessage && "flex-row-reverse"
      }`}
    >
      <div
        className={`max-w-[544px] grow px-5 py-3 text-sm sm:text-base rounded-full ${
          isUserMessage
            ? "bg-second text-white rounded-br-none ml-6"
            : "bg-gray-200 rounded-bl-none mr-6"
        }`}
      >
        {message.text}
      </div>
      <p className="text-[#8F8F8F] text-sm min-w-fit">
        {moment(message.date).format("LT")}
      </p>
    </div>
  );
};

export default ChatContainer;
