import { NextPage } from "next";
import SideBar from "./SideBar";

interface Props {}

const App: NextPage<Props> = () => {
  return (
    <div>
      <SideBar />
    </div>
  );
};

export default App;
