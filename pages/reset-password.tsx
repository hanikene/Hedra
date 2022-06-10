import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorHandler from "../components/ErrorHandler";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
}

const ResetPassword: NextPage = () => {
  const { resetPasswordEmail, user } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.emailVerified) router.push("/");
    else if (user) router.push("/verify-email");
  }, [user]);

  const onSubmit: SubmitHandler<Inputs> = ({ email }) => {
    resetPasswordEmail(email, () => {
      setIsEmailSent(true);
    });
  };

  return (
    <div>
      <Head>
        <title>Hedra - reset password</title>
        <meta
          name="description"
          content="Hedra: the Beautiful chat application"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="min-h-[calc(100vh-81px)] flex justify-center items-center">
        {!isEmailSent ? (
          <form
            id="form"
            className="login-container space-y-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-bold text-4xl family-Raleway tracking-wide text-gray-800 mb-16">
              Reset password
            </h1>
            <p>Write your email to receive a reset password link</p>
            <div className="flex flex-col items-start pt-2 pb-6">
              <label
                htmlFor="email"
                className={`text-gray-900 ml-2 transition-all duration-300 ease-out ${
                  watch("email")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-7"
                }`}
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="form-field"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <div className="h-5">
                {errors.email && (
                  <p className="text-sm text-red-600 ml-2">
                    Please enter a valid email
                  </p>
                )}
              </div>
            </div>
            <div className=" flex flex-col space-y-3">
              <button
                type="submit"
                className="header-active-button text-xl py-2"
              >
                Confirm
              </button>
              <Link href="/login">
                <a className="text-left text-xs">
                  <button
                    type="submit"
                    className="header-secondary-button text-xl py-2 w-48"
                  >
                    Back
                  </button>
                </a>
              </Link>
            </div>
          </form>
        ) : (
          <div className="login-container">
            <h1 className="font-bold text-4xl family-Raleway tracking-wide text-gray-800 mb-16">
              Reset password
            </h1>
            <p className="px-8 text-left">
              Email sent successfully ! Please check your email and click on the
              link to reset your password.
            </p>
            <Link href="/login">
              <a className="text-left text-xs !mt-auto !mb-8">
                <button
                  type="submit"
                  className="header-secondary-button text-xl py-2 w-48"
                >
                  Back
                </button>
              </a>
            </Link>
          </div>
        )}
      </main>
      <ErrorHandler />
    </div>
  );
};

export default ResetPassword;
