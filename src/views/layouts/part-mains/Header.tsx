import { AnimatePresence, motion } from "framer-motion";
import { Mail, Search, Bell, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FiLogOut, FiMenu } from "react-icons/fi";

export const Header = ({
  onToggleSidebar,
  sidebar,
}: {
  onToggleSidebar: () => void;
  sidebar: string;
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const messageRef = useRef(null);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    photo: null,
  };

  const role = ["Super Admin"];

  const setUserDefault = () => {
    console.log("Logged out");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !(profileRef.current as any).contains(e.target)
      ) {
        setShowProfile(false);
      }
      if (
        notificationRef.current &&
        !(notificationRef.current as any).contains(e.target)
      ) {
        setShowNotifications(false);
      }
      if (
        messageRef.current &&
        !(messageRef.current as any).contains(e.target)
      ) {
        setShowMessages(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-gradient-to-r from-[#0050E0] to-purple-600 fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
        >
          <FiMenu size={20} />
        </button>
        
        <div className="text-white font-semibold text-lg">
          Search Jobs
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search something here..."
            className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="p-4 hover:bg-gray-50 border-b border-gray-50 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Pesanan Baru</p>
                          <p className="text-xs text-gray-500 mt-1">Pesanan Meja Nomor 14</p>
                          <p className="text-xs text-gray-400 mt-1">15 menit lalu</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={profileRef}>
          <div
            className="flex items-center space-x-3 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="text-right">
              <div className="font-semibold text-sm text-white">
                {user.name}
              </div>
              <div className="text-xs text-white/80">Super Admin</div>
            </div>
            <div className="relative">
              <img
                src={
                  user.photo
                    ? user.photo
                    : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                }
                className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                alt="Profile"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
              >
                <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        user.photo
                          ? user.photo
                          : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      }
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover border-3 border-white/30"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {user.name}
                      </h3>
                      <p className="text-sm text-white/80">
                        {role.join(", ")}
                      </p>
                      <p className="text-sm text-white/80 mt-1 flex items-center gap-1">
                        <Mail size={12} />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-2">
                    <button className="w-full py-3 px-4 text-left hover:bg-gray-50 rounded-lg transition-colors text-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="font-medium">Profile Settings</span>
                      </div>
                    </button>
                    
                    <button className="w-full py-3 px-4 text-left hover:bg-gray-50 rounded-lg transition-colors text-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">Settings</span>
                      </div>
                    </button>
                  </div>

                  <hr className="my-4 border-gray-200" />
                  
                  <button
                    onClick={setUserDefault}
                    className="w-full py-3 px-4 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center space-x-2 transition-colors font-medium"
                  >
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};