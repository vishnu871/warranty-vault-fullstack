// import { motion } from 'motion/react';
// import { useNavigate, useLocation } from 'react-router';
// import { LayoutDashboard, Vault, BarChart3, Settings } from 'lucide-react';
// import { useBreakpoint } from '../hooks/useBreakpoint';

// const sidebarItems = [
//   { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
//   { icon: Vault, label: 'My Vault', path: '/vault' },
//   { icon: BarChart3, label: 'Analytics', path: '/analytics' },
//   { icon: Settings, label: 'Settings', path: '/settings' },
// ];

// export function AppSidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const breakpoint = useBreakpoint();

//   // Desktop: 260px with labels, Tablet: 80px icons only
//   const isDesktop = breakpoint === 'desktop';
//   const sidebarWidth = isDesktop ? 'w-64' : 'w-20';

//   return (
//     <motion.aside
//       initial={{ x: -100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className={`fixed left-0 top-0 h-screen ${sidebarWidth} bg-[#121212]/80 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col py-8 ${
//         isDesktop ? 'px-6' : 'items-center px-0'
//       } transition-all duration-300`}
//     >
//       {/* Logo */}
//       <div className={`mb-12 ${isDesktop ? '' : 'flex justify-center'}`}>
//         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#00B8D4] flex items-center justify-center shadow-lg shadow-[#00E5FF]/20">
//           <Vault className="w-6 h-6 text-white" />
//         </div>
//         {isDesktop && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mt-3"
//           >
//             <h2 className="text-white font-bold text-lg">Warranty Vault</h2>
//             <p className="text-white/50 text-sm">Premium Asset OS</p>
//           </motion.div>
//         )}
//       </div>

//       {/* Navigation Items */}
//       <nav className="flex-1 flex flex-col gap-2">
//         {sidebarItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = location.pathname === item.path;

//           return (
//             <motion.button
//               key={item.path}
//               onClick={() => navigate(item.path)}
//               whileHover={{ scale: isDesktop ? 1.02 : 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className={`relative ${
//                 isDesktop ? 'w-full h-12 px-4 rounded-2xl flex items-center gap-3' : 'w-14 h-14 rounded-2xl flex items-center justify-center'
//               } transition-all duration-300 ${
//                 isActive
//                   ? 'bg-[#00E5FF]/20 text-[#00E5FF] shadow-lg shadow-[#00E5FF]/20'
//                   : 'text-white/50 hover:text-white hover:bg-white/5'
//               }`}
//             >
//               <Icon className="w-6 h-6" />
//               {isDesktop && (
//                 <motion.span
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="font-medium"
//                 >
//                   {item.label}
//                 </motion.span>
//               )}
//               {isActive && !isDesktop && (
//                 <motion.div
//                   layoutId="activeIndicator"
//                   className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#00E5FF] rounded-r-full"
//                 />
//               )}
//             </motion.button>
//           );
//         })}
//       </nav>

//       {/* User Avatar Placeholder */}
//       <div className={`${isDesktop ? 'flex items-center gap-3' : 'flex justify-center'}`}>
//         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
//           WV
//         </div>
//         {isDesktop && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <p className="text-white font-medium text-sm">Vault User</p>
//             <p className="text-white/50 text-xs">Premium Account</p>
//           </motion.div>
//         )}
//       </div>
//     </motion.aside>
//   );
// }

import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Vault, BarChart3, Settings, LogOut } from 'lucide-react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useAuth } from '../contexts/AuthContext'; // Import Auth hook

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Vault, label: 'My Vault', path: '/vault' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const breakpoint = useBreakpoint();
  const { user, signOut } = useAuth(); // Get real user data and signOut function

  const isDesktop = breakpoint === 'desktop';
  const sidebarWidth = isDesktop ? 'w-64' : 'w-20';

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 top-0 h-screen ${sidebarWidth} bg-[#121212]/80 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col py-8 ${
        isDesktop ? 'px-6' : 'items-center px-0'
      } transition-all duration-300`}
    >
      {/* Logo */}
      <div className={`mb-12 ${isDesktop ? '' : 'flex justify-center'}`}>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#00B8D4] flex items-center justify-center shadow-lg shadow-[#00E5FF]/20">
          <Vault className="w-6 h-6 text-white" />
        </div>
        {isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3"
          >
            <h2 className="text-white font-bold text-lg">Warranty Vault</h2>
            <p className="text-white/50 text-sm">Premium Asset OS</p>
          </motion.div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileHover={{ scale: isDesktop ? 1.02 : 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative ${
                isDesktop ? 'w-full h-12 px-4 rounded-2xl flex items-center gap-3' : 'w-14 h-14 rounded-2xl flex items-center justify-center'
              } transition-all duration-300 ${
                isActive
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] shadow-lg shadow-[#00E5FF]/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-6 h-6" />
              {isDesktop && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
              {isActive && !isDesktop && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#00E5FF] rounded-r-full"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* --- REAL USER PROFILE SECTION --- */}
      <div className={`mt-auto pt-6 border-t border-white/5 ${isDesktop ? 'w-full' : 'w-14'}`}>
        <div className={`group relative flex items-center ${isDesktop ? 'gap-3 p-2' : 'justify-center'} bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300`}>
          
          {/* Avatar with Dynamic Initial */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/10 flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase() || 'V'}
          </div>

          {/* User Details (Desktop Only) */}
          {isDesktop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 min-w-0"
            >
              <p className="text-white font-bold text-sm truncate">
                {user?.name || 'Vishnu'}
              </p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest">
                Premium Account
              </p>
            </motion.div>
          )}

          {/* Logout Button (Appears on Hover) */}
          {isDesktop && (
            <button
              onClick={signOut}
              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 text-red-400 rounded-xl transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
          
          {/* Mobile Logout (Tooltip style) */}
          {!isDesktop && (
            <button
              onClick={signOut}
              className="absolute -top-12 bg-red-500 text-white p-2 rounded-xl scale-0 group-hover:scale-100 transition-transform origin-bottom"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}