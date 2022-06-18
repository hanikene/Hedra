import moment from "moment";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface Props {
  username: string;
  userId: string;
  pictureUrl: string;
  message: string;
  sentDate: Date;
  seen?: boolean;
  active?: boolean;
  loggedIn?: boolean;
}

const ConversationTab: NextPage<Props> = ({
  username,
  userId,
  pictureUrl,
  message,
  sentDate,
  seen,
  active,
  loggedIn,
}) => {
  return (
    <Link href={`/messages/${userId}`}>
      <a>
        <div
          className={`h-28 flex items-center pl-8 border-b-2 cursor-pointer ${
            active ? "bg-second text-white" : "border-gray-200"
          }`}
        >
          <div className="max-h-20 max-w-20 mr-3">
            <Image
              src={pictureUrl}
              alt={username}
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <div>
            <h3 className="font-bold text-xl flex items-center">
              {username}
              {loggedIn && (
                <div className="ml-1 mb-2 h-3 w-3 bg-main rounded-full" />
              )}
            </h3>
            {seen ? (
              <p className="text-sm">{message}</p>
            ) : (
              <p className="font-bold text-sm">You received a new message</p>
            )}
            <p className="text-xs">{moment(sentDate).fromNow()}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ConversationTab;
