import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const AuthContextProvider = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContextProvider);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export const UseAuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ["getAuth"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "http://localhost:1200/user/check_auth",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        if (error.response?.status === 401) {
          setIsAuth(false);
          setUser(null);
          throw new Error("Authentication failed");
        }
        throw error;
      }
    },

    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retryDelay: 1000,
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(data.user);
      setIsAuth(true);
    }

    if (isError) {
      setIsAuth(false);
      setUser(null);
    }
  }, [isSuccess, isError]);

  const value = {
    isAuth,
    setIsAuth,
    user,
    isLoading,
  };
  console.log(isAuth);

  return (
    <AuthContextProvider.Provider value={value}>
      {children}
    </AuthContextProvider.Provider>
  );
};
