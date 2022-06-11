import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import ErrorHandler from "../components/ErrorHandler";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { GoogleIcon } from "../components/icons";

interface Inputs {
  email: string;
  password: string;
  password2: string;
}

const Register: NextPage = () => {
  const { signUp, signInWithGoogle, user } = useAuth();
  const { handleSubmit, register, watch, getValues } = useForm<Inputs>();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.emailVerified) router.push("/verify-email");
    else if (user) router.push("/");
  }, [user]);

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    signUp(email, password);
  };

  const emailRegex = getValues("email")?.match(
    /^[A-Z0-9._%+-]+\@[A-Z0-9.-]+.[A-Z]{2,}$/i
  );

  const min8LengthRegex = getValues("password")?.match(/^.{8,}$/);
  const min1LowerCaseRegex = getValues("password")?.match(/^.*[a-z]+.*$/);
  const min1UpperCaseRegex = getValues("password")?.match(/^.*[A-Z]+.*$/);
  const min1NumberRegex = getValues("password")?.match(/^.*[0-9]+.*$/);
  const min1specialCharRegex = getValues("password")?.match(/^.*[^\w\s]+.*$/);
  const passwordRegex =
    min8LengthRegex &&
    min1LowerCaseRegex &&
    min1UpperCaseRegex &&
    min1NumberRegex &&
    min1specialCharRegex;

  return (
    <div>
      <Head>
        <title>Hedra - register</title>
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
          className="login-container space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-4xl family-Raleway tracking-wide text-gray-800 mb-3">
            Register
          </h1>
          <div className="flex flex-col items-start relative">
            <label
              htmlFor="email"
              className={`text-gray-900 ml-2 transition-all duration-300 ease-out ${
                watch("email")
                  ? "opacity-100 translate-y-0 cursor-pointer"
                  : "opacity-0 translate-y-7 cursor-text"
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
            {getValues("email") && (
              <div className="absolute bottom-1 right-1 h-6 w-6">
                {emailRegex ? (
                  <CheckCircleIcon className="fill-main" />
                ) : (
                  <XCircleIcon className="fill-red-500" />
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col items-start relative">
            <label
              htmlFor="password"
              className={`text-gray-900 ml-2 transition-all duration-200 ease-out ${
                watch("password")
                  ? "opacity-100 translate-y-0 cursor-pointer"
                  : "opacity-0 translate-y-7 cursor-text"
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
            <div className="password-indicator">
              <p>
                <div
                  className={`state-pin ${
                    min8LengthRegex ? "bg-main" : "bg-orange-400"
                  }`}
                ></div>
                password has at least 8 characters
              </p>
              <p>
                <div
                  className={`state-pin ${
                    min1LowerCaseRegex ? "bg-main" : "bg-orange-400"
                  }`}
                ></div>
                password has at least 1 lowercase
              </p>
              <p>
                <div
                  className={`state-pin ${
                    min1UpperCaseRegex ? "bg-main" : "bg-orange-400"
                  }`}
                ></div>
                password has at least 1 uppercase
              </p>
              <p>
                <div
                  className={`state-pin ${
                    min1NumberRegex ? "bg-main" : "bg-orange-400"
                  }`}
                ></div>
                password has at least 1 number
              </p>
              <p>
                <div
                  className={`state-pin ${
                    min1specialCharRegex ? "bg-main" : "bg-orange-400"
                  }`}
                ></div>
                password has at least 1 special character
              </p>
            </div>
            {getValues("password") && (
              <div className="absolute bottom-1 right-1 h-6 w-6">
                {passwordRegex ? (
                  <CheckCircleIcon className="fill-main" />
                ) : (
                  <XCircleIcon className="fill-red-500" />
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col items-start relative">
            <label
              htmlFor="password2"
              className={`text-gray-900 ml-2 transition-all duration-200 ease-out ${
                watch("password2")
                  ? "opacity-100 translate-y-0 cursor-pointer"
                  : "opacity-0 translate-y-7 cursor-text"
              }`}
            >
              Retype your password
            </label>
            <input
              type="password"
              id="password2"
              className="form-field"
              placeholder="Retype your password"
              {...register("password2", {
                required: true,
              })}
            />
            {getValues("password2") && (
              <div className="absolute bottom-1 right-1 h-6 w-6">
                {getValues("password") === getValues("password2") ? (
                  <CheckCircleIcon className="fill-main" />
                ) : (
                  <XCircleIcon className="fill-red-500" />
                )}
              </div>
            )}
          </div>
          <div className="!mt-auto flex flex-col space-y-3">
            <button
              type="button"
              className="flex justify-center items-center space-x-2 rounded mx-auto w-fit text-second  hover:text-second-shadow fill-second hover:fill-second-shadow transition-colors"
            >
              <span className="text-sm w-36" onClick={signInWithGoogle}>
                Sign up with Google
              </span>
              <GoogleIcon className="max-h-3" />
            </button>
            <button
              type="submit"
              className="header-active-button text-xl py-2 px-14 w-fit mx-auto "
              disabled={
                getValues("password") !== getValues("password2") ||
                !passwordRegex ||
                !emailRegex
              }
            >
              Confirm
            </button>
            <Link href="/login">
              <a className="text-left text-xs">
                Already have an account ? Sign in now !
              </a>
            </Link>
          </div>
        </form>
        <ErrorHandler />
      </main>
    </div>
  );
};

export default Register;
