import { NextPage } from "next";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { COUNT_DOWN_TIME } from "../constants";

interface InterfaceAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: (successCallback?: () => void) => Promise<void>;
  resetPasswordEmail: (
    email: string,
    successCallback?: () => void
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resendVerificationEmail: (successCallback?: () => void) => Promise<void>;
  authLoading: boolean;
  authError: string | null;
  remainingTimeEmail: number;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<InterfaceAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async (successCallback?: () => void) => {},
  signInWithGoogle: async () => {},
  resetPasswordEmail: async (email: string, successCallback?: () => void) => {},
  resendVerificationEmail: async (successCallback?: () => void) => {},
  authLoading: false,
  authError: null,
  remainingTimeEmail: 0,
});

export const AuthProvider: NextPage<AuthProviderProps> = ({ children }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [lastEmailDate, setLastEmailDate] = useState<Date | null>(null);
  const [remainingTimeEmail, setRemainingTimeEmail] = useState(0);
  const router = useRouter();
  let countDownId: any;

  useEffect(() => {
    if (authError) setAuthError(null);
  }, [authError]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user) {
        await setUser(user);
        setInitialLoading(false);
      } else {
        await setUser(null);
        setInitialLoading(false);
      }
    });
  }, [auth]);

  useEffect(() => {
    if (lastEmailDate) {
      const now = new Date();
      const timeStampsNow = now.getTime();
      const timeStampsEnd = lastEmailDate.getTime() + COUNT_DOWN_TIME * 1000;
      if (timeStampsEnd > timeStampsNow) {
        countDownId = setInterval(() => {
          const nowInterval = new Date();
          const timeStampsNowInterval = nowInterval.getTime();
          const time = Math.floor(
            (timeStampsEnd - timeStampsNowInterval) / 1000
          );
          if (time === 0) clearInterval(countDownId);
          setRemainingTimeEmail(time);
        }, 1000);
      }
    }
    return () => clearInterval(countDownId);
  }, [lastEmailDate]);

  const signUp = async (email: string, password: string) => {
    setAuthLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user, {
        url: "http://localhost:3000/login",
      });
      setLastEmailDate(new Date());
      router.push("/verify-email");
    } catch (err: any) {
      if (err?.code === "auth/email-already-in-use")
        setAuthError("Error: Email already used");
      else setAuthError("Error when signing up");
    } finally {
      setAuthLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setAuthLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user.emailVerified) {
        router.push("/");
      } else {
        router.push("/verify-email");
      }
    } catch (err) {
      setAuthError("Error when signing in");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async (successCallback?: () => void) => {
    console.log("logout");
    setAuthLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      if (successCallback) successCallback();
    } catch (err) {
      setAuthError("Error when logging out");
    } finally {
      setAuthLoading(false);
    }
  };

  const resetPasswordEmail = async (
    email: string,
    successCallback?: () => void
  ) => {
    setAuthLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setLastEmailDate(new Date());
      if (successCallback) successCallback();
    } catch (err) {
      setAuthError("Error when sending reset password email");
    } finally {
      setAuthLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setAuthLoading(true);
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      setAuthError("Error when signing in with Google");
    } finally {
      setAuthLoading(false);
    }
  };

  const resendVerificationEmail = async (successCallback?: () => void) => {
    setAuthLoading(true);
    try {
      if (!user) throw new Error();
      await sendEmailVerification(user, {
        url:
          window.location.hostname === "localhost"
            ? `http://${window.location.hostname}:3000/login`
            : `https://${window.location.hostname}/login`,
      });
      setLastEmailDate(new Date());
      if (successCallback) successCallback();
    } catch (err) {
      setAuthError("Error when sending verification email");
    } finally {
      setAuthLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      logout,
      resetPasswordEmail,
      signInWithGoogle,
      resendVerificationEmail,
      authLoading,
      authError,
      remainingTimeEmail,
    }),
    [user, authLoading, authError, remainingTimeEmail]
  );

  return (
    <AuthContext.Provider value={value}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
