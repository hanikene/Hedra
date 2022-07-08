import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import SideBar from "./SideBar";
import AppHeader from "./AppHeader";
import ChatContainer from "./ChatContainer";

interface Props {
  index?: boolean;
}

const data = {
  user: { username: "John Patterson", userId: "2" },
  messages: [
    {
      text: "Hey John 👋",
      owner: "0",
      date: new Date("2022-02-08 09:30:26 "),
      id: "m1",
    },
    {
      text: "Hello Nassim, How are you doing ?",
      owner: "2",
      date: new Date("2022-02-08 09:34:56"),
      id: "m2",
    },
  ],
};

const App: NextPage<Props> = ({ index }) => {
  const router = useRouter();
  const { userId } = router.query;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 640);
  const { data: data2, isLoading } = trpc.useQuery(["hello"]);
  if (!isLoading) console.log(data2);

  const resizeEvent = () => {
    if (window.innerWidth >= 640) setIsMobileScreen(false);
    else setIsMobileScreen(true);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  return (
    <div className="flex">
      <Head>
        <title>
          {userId ? `${data.user.username} - hedra` : "Hedra - home"}
        </title>
        <meta
          name="description"
          content="Hedra: the Beautiful chat application"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {(index || !isMobileScreen) && (
        <SideBar collapsed={sidebarCollapsed} isMobileScreen={isMobileScreen} />
      )}
      {(!index || !isMobileScreen) && (
        <div className="grow">
          <AppHeader
            username={data.user.username}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            isMobileScreen={isMobileScreen}
            index={index}
          />
          {userId && (
            <ChatContainer userId={data.user.userId} messages={data.messages} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
