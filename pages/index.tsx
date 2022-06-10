import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hedra - home</title>
        <meta
          name="description"
          content="Hedra: the Beautiful chat application"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main>
        <section className="hero-section">
          <div>
            <h1 className="font-bold text-5xl lg:text-6xl mb-4">
              Start Chatting now
            </h1>
            <p className="max-w-lg mb-11">
              Hedra is a chat app that will let you connect with your friends
              all over the world, you can send messages and images, register now
              with your email, phone number or Google account.
            </p>
            <div className="space-x-4 flex justify-center md:justify-start mb-14 md:mb-0">
              <Link href="/register">
                <a>
                  <button className="header-active-button text-xl py-2 px-7">
                    Join now
                  </button>
                </a>
              </Link>
              <Link href="/login">
                <a>
                  <button className="header-secondary-button">Login</button>
                </a>
              </Link>
            </div>
          </div>
          <div className="max-w-sm md:max-w-none">
            <Image
              src="/hero-image.png"
              alt="hero-image"
              height={546}
              width={577}
              className="object-contain"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
