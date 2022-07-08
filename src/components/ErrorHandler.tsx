import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const ErrorHandler = () => {
  const { authError } = useAuth();
  useEffect(() => {
    if (authError) alert(authError);
  }, [authError]);
  return <div />;
};

export default ErrorHandler;
