"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";
import nookies from "nookies";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        nookies.set(undefined, "token", token, { path: "/" });
        setUser(user);
      } else {
        nookies.destroy(undefined, "token");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response.user) {
        toast.success(
          `Registered successfully. Please check your email ${email} for confirmation`
        );
      }
    } catch (error) {
      console.log({ SignUpError: error });
      if (error as FirebaseError) {
        toast.error(
          (error?.message as keyof FirebaseError) ||
            "Something went wrong. Try again later"
        );
      }
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log({ response });
      if (response.user) {
        toast.success("User Registered successfully. Redirecting to Dashboard");
      }
    } catch (error) {
      console.log({ SignInError: error });
      toast.error("Invalid credentials.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      nookies.destroy(undefined, "token");
    } catch (error) {
      toast.error("Couldn't sign you out. Please reload the page.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
