import { NextPage } from "next";
import { LeftArrowSvg, ParamsSvg } from "./icons";

interface Props {
  username: string;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (state: boolean) => void;
}

const data = {
  isLoggedIn: true,
};

const AppHeader: NextPage<Props> = ({
  username,
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  return (
    <div className="h-24 flex items-center px-8 space-x-3">
      <LeftArrowSvg
        className={`h-6 w-6 cursor-pointer mr-3 transition-transform duration-300 ${
          sidebarCollapsed
            ? "rotate-180 hover:translate-x-1"
            : "hover:-translate-x-1"
        }`}
        onClick={() => {
          setSidebarCollapsed(!sidebarCollapsed);
        }}
      />
      <h1 className="text-4xl font-bold">{username}</h1>
      {data.isLoggedIn && <div className="mb-2 h-4 w-4 bg-main rounded-full" />}
      <ParamsSvg className="h-8 w-8 fill-gray-600 !ml-auto cursor-pointer transition-transform duration-300 hover:rotate-45" />
    </div>
  );
};

export default AppHeader;
