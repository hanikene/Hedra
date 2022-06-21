import { NextPage } from "next";
import { useRouter } from "next/router";
import UserTab from "./UserTab";

interface Props {
  collapsed: boolean;
}

const data = [
  {
    username: "Samantha Geldberg",
    pictureUrl: "/users/samantha-geldberg.jpg",
    userId: "1",
    message: "Hello",
    sentDate: new Date(),
    seen: false,
    loggedIn: false,
  },
  {
    username: "John Petterson",
    pictureUrl: "/users/john-petterson.jpg",
    userId: "2",
    message: "Hello Nassim, How are you doing ?",
    sentDate: new Date(),
    seen: true,
    loggedIn: true,
  },
  {
    username: "Albert Ngoro",
    pictureUrl: "/users/albert-ngoro.jpg",
    userId: "3",
    message: "😂😂😂😂",
    sentDate: new Date(),
    seen: true,
    loggedIn: false,
  },
  {
    username: "Alexis Brown",
    pictureUrl: "/users/alexis-brown.jpg",
    userId: "4",
    message: "See ya 👋",
    sentDate: new Date(),
    seen: true,
    loggedIn: true,
  },
];

const SideBar: NextPage<Props> = ({ collapsed }) => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div
      className={`h-screen border-r-2 border-gray-200 overflow-hidden grid-sidebar ${
        collapsed ? "w-0" : "w-96"
      }`}
    >
      <div className="px-8 pt-11 border-b-2 border-gray-200">
        <h2 className="font-bold text-4xl">Message</h2>
        <input
          className="my-4 px-6 py-2 w-full rounded-full bg-gray-100"
          type="text"
          placeholder="Search for a person here..."
        />
      </div>
      <div className="overflow-y-auto">
        {data.map((tab) => (
          <UserTab
            key={tab.userId}
            username={tab.username}
            userId={tab.userId}
            message={tab.message}
            pictureUrl={tab.pictureUrl}
            sentDate={tab.sentDate}
            seen={tab.seen}
            loggedIn={tab.loggedIn}
            active={tab.userId === userId}
          />
        ))}
      </div>
      <button className="px-auto py-5 w-full text-main font-bold text-xl bg-[#fcfcfc]">
        Invite Friends
      </button>
    </div>
  );
};

export default SideBar;
