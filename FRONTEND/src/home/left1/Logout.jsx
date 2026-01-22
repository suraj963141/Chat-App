// import { useState } from "react";
// import { CiLogout } from "react-icons/ci";
// import axios from "axios";
// import Cookies from "js-cookie";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Logout = () => {
//   const [setLoading] = useState(false);
//   const naviagte = useNavigate();
//   const handleLogout = async () => {
//     setLoading(true);
//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/user/logout`);
//       localStorage.removeItem("messenger");
//       Cookies.remove("jwt");
//       setLoading(false);
//       toast.success("Logout Successfully");
//       naviagte("/login");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to Logout");
//     }
//   };
//   return (
//     <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end">
//       <div className="p-3 align-bottom">
//         <button>
//           <CiLogout
//             onClick={handleLogout}
//             className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300"
//           />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Logout;

import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider"; //

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [, setAuthUser] = useAuth();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/user/logout`);

      // clear storage
      localStorage.removeItem("messenger");
      Cookies.remove("jwt");

      
      setAuthUser(null);

      toast.success("Logout Successfully");
      navigate("/login", { replace: true }); 
    } catch (error) {
      console.log(error);
      toast.error("Failed to Logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end">
      <div className="p-3">
        <button onClick={handleLogout} disabled={loading}>
          <CiLogout className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Logout;
