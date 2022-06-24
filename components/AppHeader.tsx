import { NextPage } from "next";
import Link from "next/link";
import { LeftArrowSvg, ParamsSvg } from "./icons";

interface Props {
  username: string;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (state: boolean) => void;
  isMobileScreen: boolean;
}

const data = {
  isLoggedIn: true,
};

const AppHeader: NextPage<Props> = ({
  username,
  sidebarCollapsed,
  setSidebarCollapsed,
  isMobileScreen,
}) => {
  return (
    <div className="h-24 flex items-center px-4 space-x-3">
      {isMobileScreen ? (
        <Link href={"/"}>
          <a>
            <LeftArrowSvg className={`h-4 w-4 mr-3`} />
          </a>
        </Link>
      ) : (
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
      )}
      <h1 className="text-2xl sm:text-4xl font-bold">{username}</h1>
      {data.isLoggedIn && (
        <div className="mb-2 h-3 w-3 sm:h-4 sm:w-4 bg-main rounded-full" />
      )}
      <ParamsSvg className="h-5 w-5 sm:h-8 sm:w-8 fill-gray-600 !ml-auto cursor-pointer transition-transform duration-300 hover:rotate-45" />
    </div>
  );
};

export default AppHeader;
