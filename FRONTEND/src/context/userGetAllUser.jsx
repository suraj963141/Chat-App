// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import axios from "axios";

// function useGetAllUsers() {
//   const [allUsers, setAllUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const getUsers = async () => {
//       setLoading(true);
//       try {
//         const token = Cookies.get("jwt");
//         console.log("Sending token:", token);

//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/user/getUserProfile`,
//           // "https://chatapp-q2p8.onrender.com/api/user/getUserProfile",

//           {
//             withCredentials: true,
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         setAllUsers(response.data);
//       } catch (error) {
//         console.log("Error in useGetAllUsers: " + error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUsers();
//   }, []);

//   return [allUsers, loading];
// }

// export default useGetAllUsers;


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
            withCredentials: true, // ✅ ONLY THIS IS NEEDED
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
