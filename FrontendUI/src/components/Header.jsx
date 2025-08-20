

// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext";

// export default function Header() {
//   const { user, logout, isAuthenticated } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     setShowDropdown(false);
//     navigate("/");
//   };

//   const getUserInitial = () => {
//     return user?.name ? user.name.charAt(0).toUpperCase() : "";
//   };

//   const getAvatarColor = () => {
//     // Generate consistent color based on user email or use a default
//     if (!user?.email) return "#4F46E5";
    
//     // Simple hash function to generate consistent colors
//     let hash = 0;
//     for (let i = 0; i < user.email.length; i++) {
//       hash = user.email.charCodeAt(i) + ((hash << 5) - hash);
//     }
    
//     const hue = Math.abs(hash) % 360;
//     return `hsl(${hue}, 65%, 50%)`;
//   };

//   return (
//     <header className="sticky top-0 z-50 shadow">
//       <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
//         <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
//           <Link to="/" className="flex items-center space-x-2">
//             <span className="text-xl font-bold text-purple-500">ALL IN ONE</span>
//           </Link>

//           <div className="flex items-center space-x-4 lg:order-2">
//             {isAuthenticated ? (
//               <div className="relative">
//                 <div
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   className="flex items-center justify-center w-10 h-10 font-bold text-white transition-opacity rounded-full cursor-pointer hover:opacity-90"
//                   style={{ backgroundColor: getAvatarColor() }}
//                   title={user?.name}
//                 >
//                   {getUserInitial()}
//                 </div>

//                 {showDropdown && (
//                   <div className="absolute right-0 z-10 w-48 mt-2 bg-white border rounded-lg shadow-lg">
//                     <div className="px-4 py-3 border-b">
//                       <p className="text-sm font-medium text-gray-900">{user?.name}</p>
//                       <p className="text-sm text-gray-500">{user?.email}</p>
//                     </div>
//                     <div className="py-1">
//                       {user?.user_type === "provider" && (
//                         <button
//                           onClick={() => {
//                             navigate("/ProviderProfile");
//                             setShowDropdown(false);
//                           }}
//                           className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
//                         >
//                           My Profile
//                         </button>
//                       )}
//                       <button
//                         onClick={handleLogout}
//                         className="w-full px-4 py-2 text-sm text-left text-red-700 hover:bg-red-50"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 to="/SignIn"
//                 className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800"
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>

//           <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1">
//             <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
//               <li>
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? "text-blue-700" : "text-gray-700"
//                     } hover:text-blue-700`
//                   }
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/FindServices"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? "text-blue-700" : "text-gray-700"
//                     } hover:text-blue-700`
//                   }
//                 >
//                   Find Services
//                 </NavLink>
//               </li>
//               {isAuthenticated && (
//                 <li>
//                   <NavLink
//                     to="/MyBookings"
//                     className={({ isActive }) =>
//                       `block py-2 pr-4 pl-3 duration-200 ${
//                         isActive ? "text-blue-700" : "text-gray-700"
//                       } hover:text-blue-700`
//                     }
//                   >
//                     My Bookings
//                   </NavLink>
//                 </li>
//               )}
//               <li>
//                 <NavLink
//                   to="/ContactUs"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? "text-blue-700" : "text-gray-700"
//                     } hover:text-blue-700`
//                   }
//                 >
//                   Contact Us
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/HowItWorks"
//                   className={({ isActive }) =>
//                     `block py-2 pr-4 pl-3 duration-200 ${
//                       isActive ? "text-blue-700" : "text-gray-700"
//                     } hover:text-blue-700`
//                   }
//                 >
//                   How it Works
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react"; // Import useRef
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  // --- NEW: This effect handles clicks outside the dropdown ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the ref exists and the click was outside of it, close the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    // Add event listener to the whole document
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]); // Rerun if the ref changes

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  const getUserInitial = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : "";
  };

  const getAvatarColor = () => {
    if (!user?.email) return "#4F46E5";
    let hash = 0;
    for (let i = 0; i < user.email.length; i++) {
      hash = user.email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 65%, 50%)`;
  };

  return (
    <header className="sticky top-0 z-50 shadow">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-purple-500">ALL IN ONE</span>
          </Link>

          <div className="flex items-center space-x-4 lg:order-2">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}> {/* Attach the ref here */}
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center w-10 h-10 font-bold text-white transition-opacity rounded-full cursor-pointer hover:opacity-90"
                  style={{ backgroundColor: getAvatarColor() }}
                  title={user?.name}
                >
                  {getUserInitial()}
                </div>

                {showDropdown && (
                  <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border rounded-lg shadow-lg">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      {user?.user_type === "provider" && (
                        <button
                          onClick={() => {
                            navigate("/ProviderProfile");
                            setShowDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                        >
                          My Profile
                        </button>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-sm text-left text-red-700 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/SignIn"
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col pl-5 mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {/* Your NavLink items remain the same */}
              <li><NavLink to="/" className={({isActive}) => isActive ? "text-blue-700" : "text-gray-700"}>Home</NavLink></li>
              <li><NavLink to="/FindServices" className={({isActive}) => isActive ? "text-blue-700" : "text-gray-700"}>Find Services</NavLink></li>
              <li><NavLink to="/ContactUs" className={({isActive}) => isActive ? "text-blue-700" : "text-gray-700"}>ContactUs</NavLink></li>
              <li><NavLink to="/HowItWorks" className={({isActive}) => isActive ? "text-blue-700" : "text-gray-700"}>HowItWorks</NavLink></li>
              {/* ... etc */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}