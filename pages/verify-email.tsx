import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ErrorHandler from "../components/ErrorHandler";
import Header from "../components/Header";
import { LoadingSmallSvg } from "../components/icons";
import useAuth from "../hooks/useAuth";

const VerifyEmail: NextPage = () => {
  const {
    logout,
    user,
    authLoading,
    resendVerificationEmail,
    remainingTimeEmail,
  } = useAuth();

  const router = useRouter();
  let countDownId: any;

  useEffect(() => {
    if (user?.emailVerified) router.push("/");
  }, [user]);

  const changeSecondsToTime = (time: number): string => {
    let minutes: string | number = Math.floor(time / 60);
    let seconds: string | number = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
  };

  const handleResendEmail = () => {
    resendVerificationEmail();
  };

  const handleBack = () => {
    logout(() => {
      router.push("/login");
    });
  };

  return (
    <div>
      <Head>
        <title>Hedra - verify email</title>
        <meta
          name="description"
          content="Hedra: the Beautiful chat application"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="min-h-[calc(100vh-81px)] flex justify-center items-center">
        <div className="login-container">
          <h1 className="font-bold text-4xl family-Raleway tracking-wide text-gray-800 mb-16">
            Verify email
          </h1>
          <p className="px-8 text-left">
            Please Verify your email before using Hedra.
          </p>
          <div>
            {!authLoading ? (
              <button
                className={`font-bold text-lg p-1 ${
                  remainingTimeEmail > 0
                    ? "cursor-not-allowed opacity-40"
                    : "hover:underline"
                }`}
                onClick={handleResendEmail}
                disabled={remainingTimeEmail > 0}
              >
                Resent verification email
              </button>
            ) : (
              <LoadingSmallSvg />
            )}
            {remainingTimeEmail > 0 && (
              <p className="text-xs">
                {changeSecondsToTime(remainingTimeEmail)} before sending another
                email
              </p>
            )}
          </div>
          <div className="text-left text-xs !mt-auto !mb-8">
            <button
              onClick={handleBack}
              className="header-secondary-button text-xl py-2 w-48"
            >
              Back
            </button>
          </div>
        </div>
      </main>
      <ErrorHandler />
    </div>
  );
};

export default VerifyEmail;
