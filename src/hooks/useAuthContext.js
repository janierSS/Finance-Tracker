import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (ctx === undefined) {
    throw new Error("useAuthContext() must be used inside a AuthContextProvider");
  }
  return ctx;
};
