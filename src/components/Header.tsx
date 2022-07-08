import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Header: NextPage = () => {
  return (
    <header className="flex items-center justify-between px-5 md:px-10 py-2">
      <Link href="/">
        <a>
          <div className="flex items-center max-w-xs md:max-w-full">
            <Image
              src="/favicon.png"
              alt="logo"
              height={65}
              width={65}
              className="object-contain"
            />
            <h3 className="text-5xl font-bold ml-2 hidden md:block">Hedra</h3>
          </div>
        </a>
      </Link>
      <ul className="flex space-x-3 md:space-x-6 items-center">
        <Link href="https://www.linkedin.com/in/hanikene/">
          <a target="_blank">
            <li className="text-sm md:text-xl font-bold">Hire me</li>
          </a>
        </Link>
        <Link href="/login">
          <a>
            <li className="text-sm md:text-xl font-bold">Sign in</li>
          </a>
        </Link>
        <Link href="/register">
          <a>
            <li className="header-active-button">Register</li>
          </a>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
