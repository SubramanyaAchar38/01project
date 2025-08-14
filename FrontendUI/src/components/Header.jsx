

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [userInitial, setUserInitial] = useState("");
  const [avatarColor, setAvatarColor] = useState("#4F46E5"); // Default blue
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const userData = JSON.parse(stored);
        if (userData?.name) {
          setUserInitial(userData.name.charAt(0).toUpperCase());

          // Persist a consistent avatar color for user session
          const color = localStorage.getItem("avatarColor") || generateRandomColor();
          setAvatarColor(color);
          localStorage.setItem("avatarColor", color);
        }
      }
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("avatarColor");
    }
  }, []);

  const generateRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("avatarColor");
    setUserInitial("");
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 shadow">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-purple-500">ALL IN ONE</span>
          </Link>

          <div className="flex items-center space-x-4 lg:order-2">
            {userInitial ? (
              <div className="relative">
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full cursor-pointer"
                  style={{ backgroundColor: avatarColor }}
                >
                  {userInitial}
                </div>

                {showDropdown && (
                  <div className="absolute right-0 z-10 w-32 mt-2 bg-white border rounded shadow-md">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/SignIn"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
              >
                Register
              </Link>
            )}
          </div>

          <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } hover:text-blue-700`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/FindServices"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } hover:text-blue-700`
                  }
                >
                  FindServices
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ContactUs"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } hover:text-blue-700`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/HowItWorks"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } hover:text-blue-700`
                  }
                >
                  How it works
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
