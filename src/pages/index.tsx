import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import App from "../components/App";
import Homepage from "../components/Homepage";
import useAuth from "../hooks/useAuth";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data: result } = trpc.useQuery(["users.get-token"]);
  if (result) console.log(result);

  useEffect(() => {
    if (user && !user.emailVerified) router.push("/verify-email");
  }, [user]);

  if (user && !user.emailVerified) return null;
  if (!user) return <Homepage />;
  return <App index />;
};

export default Home;
