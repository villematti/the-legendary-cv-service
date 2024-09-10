import { useEffect, useState } from "react";
import { auth } from "../lib/firebase/clientApp";
import { onAuthStateChanged } from "firebase/auth";

function useAuth() {
  const [user, setLocalUser] = useState<any | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        console.log("This is a user");
        setLocalUser(user);
      } else {
        console.log("There is NO user");
      }
    });
    return () => unsubscribe();
  }, []);

  return user;
}

export default useAuth;
