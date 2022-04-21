import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIscancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete login");
      }

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });
      
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }

    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIscancelled(true);
  }, []);

  return { login, error, isPending };
};
