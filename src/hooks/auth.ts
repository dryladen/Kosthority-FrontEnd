import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/users", () =>
    axios
      .get("/api/users")
      .then((response) => response.data.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      }),
  ); // swr for fetch data realtime

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  return {
    user,
    // csrf,
    isLoading,
    // login,
    // logout
  };
};
