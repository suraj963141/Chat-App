import { useEffect, useState } from "react";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/getUserProfile`,
          {
            withCredentials: true,
          }
        );

        setAllUsers(response.data);
      } catch (error) {
        console.log("Error in useGetAllUsers:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;
