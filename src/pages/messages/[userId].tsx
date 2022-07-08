import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import App from "../../components/App";
import useAuth from "../../hooks/useAuth";

const ConversationPage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.emailVerified) router.push("/verify-email");
    else if (!user) router.push("/");
  }, [user]);
  return user?.emailVerified ? <App /> : <div />;
};

export default ConversationPage;
