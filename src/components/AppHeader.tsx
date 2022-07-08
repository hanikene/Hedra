import { NextPage } from "next";
import Link from "next/link";
import { LeftArrowSvg, ParamsSvg } from "./icons";

interface Props {
  username: string;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (state: boolean) => void;
  isMobileScreen: boolean;
  index?: boolean;
}

const data = {
  isLoggedIn: true,
};

const AppHeader: NextPage<Props> = ({
  username,
  sidebarCollapsed,
  setSidebarCollapsed,
  isMobileScreen,
  index,
}) => {
  return (
    <div className="h-24 flex items-center px-4 space-x-3">
      {!index &&
        (isMobileScreen ? (
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
        ))}

      {!index && <h1 className="text-2xl sm:text-4xl font-bold">{username}</h1>}
      {!index && data.isLoggedIn && (
        <div className="mb-2 h-3 w-3 sm:h-4 sm:w-4 bg-main rounded-full" />
      )}
      <div className="!ml-auto">
        <Link href="/settings">
          <a>
            <ParamsSvg className="h-5 w-5 sm:h-8 sm:w-8 fill-gray-600 cursor-pointer transition-transform duration-300 hover:rotate-45" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AppHeader;
