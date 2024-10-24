import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    setShowPopup(true);
  };

  const handleConfirmLogout = () => {
    confirmLogout();
    setShowPopup(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    router.push("/");
  };

  return (
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 w-full fixed top-0 backdrop-blur-xl px-6 bg-blue-500">
        <h1 className="text-white text-2xl">
          {router.pathname === '/' ? (
            <Link href="/">Personal Stress Analysis</Link>
          ) : (
            <Link href="/vital">Personal Stress Analysis</Link>
          )}
        </h1>
     
      {router.pathname !== '/' && ( // Hide logout button on '/' route
        <button onClick={handleLogout} className="flex items-center gap-4 cursor-pointer">
          <h2 className="hidden sm:flex text-white"> Logout </h2><FaSignOutAlt className="text-white" />
        </button>
      )}
      
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 h-screen">
          <div className="popup bg-white p-6 rounded shadow-lg">
            <p className="text-gray-700">Are you sure you want to logout?</p>
            <div className="w-full gap-2 flex justify-end pt-4"><button onClick={handleConfirmLogout} className="bg-blue-500 text-white px-4 py-2 rounded-xl">Yes</button>
            <button onClick={() => setShowPopup(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl">No</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
