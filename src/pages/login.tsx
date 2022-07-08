import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorHandler from "../components/ErrorHandler";
import Header from "../components/Header";
import { GoogleIcon } from "../components/icons";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const { signIn, signInWithGoogle, user } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.emailVerified) router.push("/verify-email");
    else if (user) router.push("/");
  }, [user]);

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    signIn(email, password);
  };

  return (
    <div>
      <Head>
        <title>Hedra - login</title>
        <meta
          name="description"
          content="Hedra: the Beautiful chat application"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <main className="min-h-[calc(100vh-81px)] flex justify-center items-center">
        <form
          id="form"
          className="login-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-4xl family-Raleway tracking-wide text-gray-800 mb-3">
            Login
          </h1>
          <div className="flex flex-col items-start">
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
          <div className="flex flex-col items-start">
            <label
              htmlFor="password"
              className={`text-gray-900 ml-2 transition-all duration-200 ease-out ${
                watch("password")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-7"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-field"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            <div className="h-5">
              {errors.password && (
                <p className="text-sm text-red-600 ml-2">
                  Please enter your password
                </p>
              )}
            </div>
          </div>
          <div className="!mt-auto flex flex-col space-y-3">
            <button
              type="button"
              className="flex justify-center items-center space-x-2 rounded mx-auto w-fit text-second  hover:text-second-shadow fill-second hover:fill-second-shadow transition-colors"
            >
              <span className="text-sm w-36" onClick={signInWithGoogle}>
                Sign in with Google
              </span>
              <GoogleIcon className="max-h-3" />
            </button>
            <button
              type="submit"
              className="header-active-button text-xl py-2 px-14 w-fit mx-auto"
            >
              Confirm
            </button>
            <Link href="/reset-password">
              <a className="text-left text-xs">
                Forgot your password ? Reset it now
              </a>
            </Link>
          </div>
        </form>
      </main>
      <ErrorHandler />
    </div>
  );
};

export default Login;
