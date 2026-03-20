import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Vault, Plus, BarChart3, Settings } from 'lucide-react';

interface BottomNavProps {
  onAddAsset: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Vault, label: 'Vault', path: '/vault' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function BottomNav({ onAddAsset }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#121212]/95 backdrop-blur-xl border-t border-white/10 pb-safe"
    >
      <div className="flex items-center justify-around px-4 h-20">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          // Insert FAB in the middle
          if (idx === 2) {
            return (
              <div key="fab-divider" className="flex items-center gap-6">
                <motion.button
                  onClick={() => navigate(item.path)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center gap-1 relative ${
                    isActive ? 'text-[#00E5FF]' : 'text-white/50'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -top-1 w-1 h-1 bg-[#00E5FF] rounded-full"
                    />
                  )}
                </motion.button>

                {/* FAB */}
                <motion.button
                  onClick={onAddAsset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 -mt-8 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#00B8D4] flex items-center justify-center shadow-lg shadow-[#00E5FF]/40"
                >
                  <Plus className="w-7 h-7 text-white" />
                </motion.button>
              </div>
            );
          }

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-1 relative ${
                isActive ? 'text-[#00E5FF]' : 'text-white/50'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-1 w-1 h-1 bg-[#00E5FF] rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
