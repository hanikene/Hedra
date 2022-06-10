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
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  authLoading: boolean;
  authError: string | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  authLoading: false,
  authError: null,
});

export const AuthProvider: NextPage<AuthProviderProps> = ({ children }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAuthLoading(false);
      } else {
        setUser(null);
        setAuthLoading(true);
        router.push("/login");
      }
    });
    setInitialLoading(false);
  }, [auth]);

  const signUp = async (email: string, password: string) => {
    setAuthLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      router.push("/");
    } catch (err) {
      setAuthError("Error when signing up");
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
      setUser(userCredential.user);
      router.push("/");
    } catch (err) {
      setAuthError("Error when signing in");
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setAuthError("Error when logging out");
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
      authLoading,
      authError,
    }),
    [user, authLoading, authError]
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
