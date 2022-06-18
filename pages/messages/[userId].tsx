import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import App from "../../components/App";
import Homepage from "../../components/Homepage";
import useAuth from "../../hooks/useAuth";

const ConversationPage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.emailVerified) router.push("/verify-email");
  }, [user]);

  return user?.emailVerified ? <App /> : <Homepage />;
};

export default ConversationPage;
