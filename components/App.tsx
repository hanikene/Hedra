import { NextPage } from "next";
import ChatContainer from "./ChatContainer";
import AppHeader from "./AppHeader";
import SideBar from "./SideBar";
import { useRouter } from "next/router";
import moment from "moment";
import Head from "next/head";
import { useState } from "react";

interface Props {}

const data = {
  username: "John Patterson",
  userId: 2,
  messages: [
    {
      text: "Hey John 👋",
      owner: 0,
      date: moment("May 23, 2022 12:24:00"),
    },
    {
      text: "Hello Nassim, How are you doing ?",
      owner: 2,
      date: moment("May 23, 2022 12:44:00"),
    },
  ],
};

const App: NextPage<Props> = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex">
      <Head>
        <title>{userId ? `${data.username} - hedra` : "Hedra - home"}</title>
        <meta
          name="description"
          content="Hedra: the Beautiful chat application"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SideBar collapsed={sidebarCollapsed} />
      <div className="grow">
        <AppHeader
          username={data.username}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        {userId && <ChatContainer />}
      </div>
    </div>
  );
};

export default App;
