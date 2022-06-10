import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../components/Header";

interface Inputs {
  email: string;
  password: string;
}

const login: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    // signIn(email, password);
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
          className="login-form"
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
              placeholder="Email or username"
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
              type="submit"
              className="header-active-button text-xl py-2 px-7"
            >
              Confirm
            </button>
            <Link href="/register">
              <a className="text-left text-xs">
                New in Hedra ? Register right now !
              </a>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default login;
