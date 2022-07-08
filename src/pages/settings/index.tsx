import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { CrossSvg, PlusSvg } from "@/components/icons";

interface Props {}

const Settings: NextPage<Props> = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.emailVerified) router.push("/verify-email");
    if (!user) router.push("/");
  }, [user]);
  return !user ? (
    <h1>loading</h1>
  ) : (
    <div>
      <Head>
        <title>Hedra - settings</title>
        <meta
          name="description"
          content="Hedra: the Beautiful chat application"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header className="px-5 md:px-10 py-2">
        <Link href="/">
          <a>
            <div className="flex items-center max-w-full px-5">
              <CrossSvg className="h-6 w-6 stroke-black stroke-2 ml-auto mt-7" />
            </div>
          </a>
        </Link>
      </header>
      <main className="flex flex-col justify-between items-center mt-5 h-[calc(100vh-88px)]">
        <div className="flex flex-col items-center space-y-2">
          <div className="image-setting-container cursor-pointer relative h-52 w-52">
            <div className="container-image-setting">
              <PlusSvg className="h-10 w-10 stroke-white stroke-2" />
            </div>
            <Image
              src="/users/nassim-hani-ikene.jpg"
              alt="User profile picture"
              height={208}
              width={208}
              className="object-contain rounded-lg"
            />
          </div>
          <h1 className="font-bold text-3xl">Nassim Hani Ikene</h1>
          <div className="flex flex-col items-center">
            <p className="text-lg">nassim.ik.hani@gmail.com</p>
            <p className="text-lg">(+213) 799 182 552</p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2 mt-auto py-12">
          <button className=" text-xl">Change Profile Picture</button>
          <Link href="/settings/information">
            <a>
              <button className=" text-xl">Change information</button>
            </a>
          </Link>
          <Link href="/settings/password">
            <a>
              <button className=" text-xl">Change password</button>
            </a>
          </Link>
          <Link href="/">
            <a>
              <button
                className=" text-xl color text-red-600"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Settings;
