import React from "react";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import "../styles/index.css";
import { AuthProvider } from "../hooks/useAuth";
import { AppRouter } from "../server/routes/app.router";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      headers() {
        return {
          ...ctx?.req?.headers,
          Authorization: sessionStorage.getItem("token") ?? "",
        };
      },
    };
  },
  ssr: false,
})(MyApp);
