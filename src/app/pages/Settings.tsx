// import { motion } from 'motion/react';
// import { Bell, Download, Trash2, User, Shield, Key, LogOut, Edit, Check, X, Camera, Lock, AlertTriangle } from 'lucide-react';
// import { Button } from '../components/ui/button';
// import { Switch } from '../components/ui/switch';
// import { Label } from '../components/ui/label';
// import { Input } from '../components/ui/input';
// import { toast } from 'sonner';
// import { useBreakpoint } from '../hooks/useBreakpoint';
// import { useAuth } from '../contexts/AuthContext';
// import { useState } from 'react';
// import { useNavigate } from 'react-router';

// export function Settings() {
//   const breakpoint = useBreakpoint();
//   const isMobile = breakpoint === 'mobile';
//   const isTablet = breakpoint === 'tablet';
//   const { user, updateProfile, signOut } = useAuth();
//   const navigate = useNavigate();

//   const [isEditingProfile, setIsEditingProfile] = useState(false);
//   const [editedName, setEditedName] = useState(user?.name || '');
//   const [editedEmail, setEditedEmail] = useState(user?.email || '');
  
//   const [isChangingPassword, setIsChangingPassword] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const padding = isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-8';

//   const handleSaveProfile = () => {
//     if (!editedName || !editedEmail) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(editedEmail)) {
//       toast.error('Please enter a valid email address');
//       return;
//     }

//     updateProfile({ name: editedName, email: editedEmail });
//     setIsEditingProfile(false);
//     toast.success('Profile updated successfully!');
//   };

//   const handleCancelEdit = () => {
//     setEditedName(user?.name || '');
//     setEditedEmail(user?.email || '');
//     setIsEditingProfile(false);
//   };

//   const handleChangePassword = () => {
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       toast.error('Please fill in all password fields');
//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error('New password must be at least 6 characters');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error('New passwords do not match');
//       return;
//     }

//     // In a real app, this would verify current password and update
//     setIsChangingPassword(false);
//     setCurrentPassword('');
//     setNewPassword('');
//     setConfirmPassword('');
//     toast.success('Password changed successfully!');
//   };

//   const handleSignOut = () => {
//     signOut();
//     toast.success('Signed out successfully');
//     navigate('/auth');
//   };

//   const handleExportData = () => {
//     const data = localStorage.getItem('warranty_vault_assets');
//     if (data) {
//       const blob = new Blob([data], { type: 'application/json' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `warranty-vault-backup-${new Date().toISOString().split('T')[0]}.json`;
//       a.click();
//       toast.success('Vault exported successfully');
//     } else {
//       toast.error('No data to export');
//     }
//   };

//   const handleFactoryReset = () => {
//     if (!confirm('⚠️ FACTORY RESET WARNING\n\nThis will permanently delete ALL your assets, warranties, and account data. This action cannot be undone.\n\nAre you absolutely sure?')) {
//       return;
//     }

//     // Second confirmation for extra safety
//     if (!confirm('FINAL CONFIRMATION\n\nThis is your last chance to cancel. All data will be lost forever.\n\nProceed with factory reset?')) {
//       return;
//     }

//     localStorage.clear();
//     toast.success('Vault reset complete');
//     setTimeout(() => window.location.href = '/auth', 1500);
//   };

//   const hasProfileChanges = editedName !== user?.name || editedEmail !== user?.email;

//   return (
//     <div className={`flex-1 ${padding}`}>
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className={`${isMobile ? 'mb-4' : 'mb-8'}`}
//         >
//           <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-[#F5F5F5] mb-2`}>
//             Settings
//           </h1>
//           {!isMobile && (
//             <p className="text-[#B0B0B0]">
//               Manage your profile, security, and vault preferences
//             </p>
//           )}
//         </motion.div>

//         {/* Settings Sections */}
//         <div className={isMobile ? 'space-y-3' : 'space-y-6'}>
//           {/* Profile Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className={`bg-[#1E1E1E]/80 backdrop-blur-xl border border-white/10 rounded-3xl ${isMobile ? 'p-4' : 'p-6'}`}
//           >
//             <div className={`flex items-center justify-between ${isMobile ? 'mb-4' : 'mb-6'}`}>
//               <div className="flex items-center gap-3">
//                 <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-2xl bg-[#00E5FF]/20 flex items-center justify-center`}>
//                   <User className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-[#00E5FF]`} />
//                 </div>
//                 <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-[#F5F5F5]`}>Profile</h2>
//               </div>
//               {!isEditingProfile ? (
//                 <Button
//                   onClick={() => setIsEditingProfile(true)}
//                   variant="outline"
//                   size={isMobile ? 'sm' : 'default'}
//                   className="border-white/10 text-[#F5F5F5] hover:bg-white/5 rounded-xl transition-all duration-300 hover:border-[#00E5FF]/50"
//                 >
//                   <Edit className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
//                   Edit
//                 </Button>
//               ) : (
//                 <div className="flex gap-2">
//                   <Button
//                     onClick={handleCancelEdit}
//                     variant="ghost"
//                     size={isMobile ? 'sm' : 'default'}
//                     className="text-white/60 hover:text-white hover:bg-white/5 rounded-xl"
//                   >
//                     <X className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
//                   </Button>
//                   <Button
//                     onClick={handleSaveProfile}
//                     disabled={!hasProfileChanges}
//                     size={isMobile ? 'sm' : 'default'}
//                     className="bg-[#00E5FF] hover:bg-[#00B8D4] text-white rounded-xl disabled:opacity-50 transition-all duration-300 shadow-lg shadow-[#00E5FF]/20"
//                   >
//                     <Check className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
//                   </Button>
//                 </div>
//               )}
//             </div>

//             {/* Profile Avatar */}
//             <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
//               <div className="relative">
//                 <div className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20'} rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#00B8D4] flex items-center justify-center shadow-lg shadow-[#00E5FF]/20`}>
//                   <User className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-white`} />
//                 </div>
//                 {isEditingProfile && (
//                   <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#00E5FF] hover:bg-[#00B8D4] flex items-center justify-center transition-colors shadow-lg">
//                     <Camera className="w-4 h-4 text-white" />
//                   </button>
//                 )}
//               </div>
//               <div className="flex-1">
//                 <p className={`${isMobile ? 'text-sm' : 'text-base'} text-[#F5F5F5] font-semibold`}>
//                   {user?.name || 'Warranty Vault User'}
//                 </p>
//                 <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#B0B0B0]`}>
//                   {user?.email || 'user@warrantyvault.com'}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <Label className={`${isMobile ? 'text-sm' : ''} text-[#B0B0B0] mb-2 block`}>Display Name</Label>
//                 {isEditingProfile ? (
//                   <Input
//                     value={editedName}
//                     onChange={(e) => setEditedName(e.target.value)}
//                     className={`bg-white/5 border-white/10 text-[#F5F5F5] focus:border-[#00E5FF]/50 focus:ring-[#00E5FF]/20 rounded-xl ${isMobile ? 'h-10 text-sm' : 'h-12'} transition-all duration-300`}
//                   />
//                 ) : (
//                   <p className={`${isMobile ? 'text-sm' : 'text-base'} text-[#F5F5F5] mt-1 py-3 px-4 bg-white/5 rounded-xl`}>
//                     {user?.name || 'Warranty Vault User'}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <Label className={`${isMobile ? 'text-sm' : ''} text-[#B0B0B0] mb-2 block`}>Email Address</Label>
//                 {isEditingProfile ? (
//                   <Input
//                     type="email"
//                     value={editedEmail}
//                     onChange={(e) => setEditedEmail(e.target.value)}
//                     className={`bg-white/5 border-white/10 text-[#F5F5F5] focus:border-[#00E5FF]/50 focus:ring-[#00E5FF]/20 rounded-xl ${isMobile ? 'h-10 text-sm' : 'h-12'} transition-all duration-300`}
//                   />
//                 ) : (
//                   <p className={`${isMobile ? 'text-sm' : 'text-base'} text-[#F5F5F5] mt-1 py-3 px-4 bg-white/5 rounded-xl`}>
//                     {user?.email || 'user@warrantyvault.com'}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           {/* Vault Security Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className={`bg-[#1E1E1E]/80 backdrop-blur-xl border border-white/10 rounded-3xl ${isMobile ? 'p-4' : 'p-6'}`}
//           >
//             <div className={`flex items-center gap-3 ${isMobile ? 'mb-4' : 'mb-6'}`}>
//               <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-2xl bg-[#FFB800]/20 flex items-center justify-center`}>
//                 <Shield className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-[#FFB800]`} />
//               </div>
//               <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-[#F5F5F5]`}>
//                 Vault Security
//               </h2>
//             </div>
//             <div className="space-y-4">
//               {/* Password Change */}
//               {!isChangingPassword ? (
//                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
//                   <div className="flex items-center gap-3">
//                     <Key className="w-5 h-5 text-[#FFB800]" />
//                     <div>
//                       <p className={`${isMobile ? 'text-sm' : 'text-base'} text-[#F5F5F5] font-medium`}>
//                         Password
//                       </p>
//                       <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#B0B0B0]`}>
//                         Last changed: Never
//                       </p>
//                     </div>
//                   </div>
//                   <Button
//                     onClick={() => setIsChangingPassword(true)}
//                     variant="outline"
//                     size={isMobile ? 'sm' : 'default'}
//                     className="border-white/10 text-[#F5F5F5] hover:bg-white/5 rounded-xl"
//                   >
//                     <Lock className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
//                     Change
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="p-4 bg-white/5 rounded-xl border border-[#00E5FF]/30 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <Label className="text-[#F5F5F5]">Change Password</Label>
//                     <Button
//                       onClick={() => {
//                         setIsChangingPassword(false);
//                         setCurrentPassword('');
//                         setNewPassword('');
//                         setConfirmPassword('');
//                       }}
//                       variant="ghost"
//                       size="sm"
//                       className="text-white/60 hover:text-white"
//                     >
//                       <X className="w-4 h-4" />
//                     </Button>
//                   </div>
//                   <Input
//                     type="password"
//                     placeholder="Current Password"
//                     value={currentPassword}
//                     onChange={(e) => setCurrentPassword(e.target.value)}
//                     className={`bg-white/5 border-white/10 text-[#F5F5F5] focus:border-[#00E5FF]/50 rounded-xl ${isMobile ? 'h-10 text-sm' : 'h-12'}`}
//                   />
//                   <Input
//                     type="password"
//                     placeholder="New Password (min. 6 characters)"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className={`bg-white/5 border-white/10 text-[#F5F5F5] focus:border-[#00E5FF]/50 rounded-xl ${isMobile ? 'h-10 text-sm' : 'h-12'}`}
//                   />
//                   <Input
//                     type="password"
//                     placeholder="Confirm New Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className={`bg-white/5 border-white/10 text-[#F5F5F5] focus:border-[#00E5FF]/50 rounded-xl ${isMobile ? 'h-10 text-sm' : 'h-12'}`}
//                   />
//                   <Button
//                     onClick={handleChangePassword}
//                     className="w-full bg-[#00E5FF] hover:bg-[#00B8D4] text-white rounded-xl shadow-lg shadow-[#00E5FF]/20"
//                   >
//                     Update Password
//                   </Button>
//                 </div>
//               )}

//               {/* Session Management */}
//               <div className="pt-4 border-t border-white/10">
//                 <p className={`text-[#B0B0B0] ${isMobile ? 'text-xs' : 'text-sm'} mb-4`}>
//                   Your data is encrypted and stored locally. No information is sent to external servers.
//                 </p>
//                 <Button
//                   onClick={handleSignOut}
//                   variant="outline"
//                   className={`w-full justify-start border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 rounded-xl ${isMobile ? 'h-10 text-sm' : ''} transition-all duration-300`}
//                 >
//                   <LogOut className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
//                   Sign Out
//                 </Button>
//               </div>
//             </div>
//           </motion.div>

//           {/* Notifications Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className={`bg-[#1E1E1E]/80 backdrop-blur-xl border border-white/10 rounded-3xl ${isMobile ? 'p-4' : 'p-6'}`}
//           >
//             <div className={`flex items-center gap-3 ${isMobile ? 'mb-4' : 'mb-6'}`}>
//               <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-2xl bg-[#00FF88]/20 flex items-center justify-center`}>
//                 <Bell className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-[#00FF88]`} />
//               </div>
//               <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-[#F5F5F5]`}>
//                 Notifications
//               </h2>
//             </div>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex-1">
//                   <Label className={`${isMobile ? 'text-sm' : 'text-base'} text-[#F5F5F5]`}>
//                     Warranty Expiry Alerts
//                   </Label>
//                   <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#B0B0B0] mt-1`}>
//                     {isMobile ? 'Expiring warranty notifications' : 'Get notified when warranties are about to expire'}
//                   </p>
//                 </div>
//                 <Switch defaultChecked />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex-1">
//                   <Label className={`${isMobile ? 'text-sm' : 'text-base'} text-[#F5F5F5]`}>
//                     Maintenance Reminders
//                   </Label>
//                   <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#B0B0B0] mt-1`}>
//                     {isMobile ? 'Upcoming maintenance alerts' : 'Receive alerts for upcoming maintenance tasks'}
//                   </p>
//                 </div>
//                 <Switch defaultChecked />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex-1">
//                   <Label className={`${isMobile ? 'text-sm' : 'text-base'} text-[#F5F5F5]`}>
//                     Value Depreciation Reports
//                   </Label>
//                   <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#B0B0B0] mt-1`}>
//                     {isMobile ? 'Monthly value updates' : 'Monthly summary of asset value changes'}
//                   </p>
//                 </div>
//                 <Switch />
//               </div>
//             </div>
//           </motion.div>

//           {/* Data Management Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className={`bg-[#1E1E1E]/80 backdrop-blur-xl border border-white/10 rounded-3xl ${isMobile ? 'p-4' : 'p-6'}`}
//           >
//             <div className={`flex items-center gap-3 ${isMobile ? 'mb-4' : 'mb-6'}`}>
//               <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-2xl bg-blue-500/20 flex items-center justify-center`}>
//                 <Download className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-blue-400`} />
//               </div>
//               <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-[#F5F5F5]`}>
//                 Data Management
//               </h2>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <Button
//                   onClick={handleExportData}
//                   variant="outline"
//                   className={`w-full justify-start border-white/10 text-[#F5F5F5] hover:bg-white/5 rounded-xl transition-all duration-300 hover:border-[#00E5FF]/50 ${isMobile ? 'h-10 text-sm' : ''}`}
//                 >
//                   <Download className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
//                   Export Vault as JSON
//                 </Button>
//                 <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#B0B0B0] mt-2`}>
//                   {isMobile ? 'Download complete backup' : 'Download a complete backup of all your assets, warranties, and data'}
//                 </p>
//               </div>
              
//               <div className="pt-4 border-t border-white/10">
//                 <div className="flex items-center gap-2 mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
//                   <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
//                   <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-400`}>
//                     Danger Zone: Irreversible Actions
//                   </p>
//                 </div>
//                 <Button
//                   onClick={handleFactoryReset}
//                   variant="destructive"
//                   className={`w-full justify-start bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-xl ${isMobile ? 'h-10 text-sm' : ''} transition-all duration-300 hover:border-red-500/40`}
//                 >
//                   <Trash2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
//                   Factory Reset Vault
//                 </Button>
//                 <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#B0B0B0] mt-2`}>
//                   {isMobile 
//                     ? 'Permanently delete everything. Requires double confirmation.' 
//                     : 'Permanently delete all assets, warranties, settings, and account data. This action requires double confirmation and cannot be undone.'
//                   }
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { motion } from 'framer-motion';
import { Bell, Download, Trash2, User, Shield, Key, LogOut, Edit, Check, X, Camera, Lock, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export function Settings() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';
  const { user, updateProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 🔥 For seeing original pwd while typing
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const [notifs, setNotifs] = useState({
    warrantyAlerts: true,
    maintenanceReminders: true,
    depreciationReports: false
  });

  const padding = isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-8';

  // 1. Load User Settings on Mount
  useEffect(() => {
    const fetchSettings = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { "x-auth-token": token }
        });
        const data = await res.json();
        if (data.settings) setNotifs(data.settings);
      } catch (err) {
        console.error("Failed to load settings from server");
      }
    };
    fetchSettings();
  }, []);

  // 2. Handle Notification Toggles (Fixed Sync Logic)
  const handleToggle = async (key: string, value: boolean) => {
    const previousState = { ...notifs };
    const updated = { ...notifs, [key]: value };
    setNotifs(updated); 

    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/settings", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          "x-auth-token": token || "" 
        },
        body: JSON.stringify({ settings: updated })
      });

      if (!response.ok) throw new Error();
      toast.success("Preferences synced to vault");
    } catch (err) {
      toast.error("Failed to sync settings - check server connection");
      setNotifs(previousState); // Rollback on failure
    }
  };

  // 3. Handle Password Update (Plain Text Logic)
  const handleUpdatePassword = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const res = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          "x-auth-token": token || "" 
        },
        body: JSON.stringify({ 
          currentPassword: passwords.current, 
          newPassword: passwords.new 
        })
      });

      if (res.ok) {
        toast.success('Vault security updated!');
        setIsChangingPassword(false);
        setPasswords({ current: '', new: '', confirm: '' });
      } else {
        const data = await res.json();
        toast.error(data.msg || 'Current password incorrect');
      }
    } catch (err) {
      toast.error('Server connection error');
    }
  };

  const handleSaveProfile = () => {
    updateProfile({ name: editedName, email: editedEmail });
    setIsEditingProfile(false);
    toast.success('Profile updated successfully!');
  };

  const handleExportData = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch("http://localhost:5000/api/assets", {
        headers: { "x-auth-token": token || "" }
      });
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `warranty-vault-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      toast.success('Vault data exported');
    } catch(e) {
      toast.error("Export failed");
    }
  };

  return (
    <div className={`flex-1 ${padding}`}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-[#F5F5F5] mb-2">Settings</h1>
          <p className="text-[#B0B0B0]">Manage your profile, security, and vault preferences</p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Section */}
          <section className="bg-[#1E1E1E]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#00E5FF]/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <h2 className="text-xl font-bold text-[#F5F5F5]">Profile</h2>
              </div>
              <Button 
                onClick={() => isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true)}
                className={isEditingProfile ? "bg-[#00FF88] text-black" : "bg-white/5"}
              >
                {isEditingProfile ? <Check className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditingProfile ? "Save" : "Edit"}
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#00B8D4] flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-[#00E5FF]/20">
                {user?.name?.charAt(0) || 'V'}
              </div>
              <div className="space-y-1">
                {isEditingProfile ? (
                  <Input value={editedName} onChange={e => setEditedName(e.target.value)} className="bg-white/5 border-white/10 text-white h-10" />
                ) : (
                  <p className="text-[#F5F5F5] font-bold text-lg">{user?.name}</p>
                )}
                <p className="text-[#B0B0B0] text-sm">{user?.email}</p>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-[#1E1E1E]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#00FF88]/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#00FF88]" />
              </div>
              <h2 className="text-xl font-bold text-[#F5F5F5]">Notifications</h2>
            </div>
            <div className="space-y-6">
              <ToggleRow 
                label="Warranty Expiry Alerts" 
                desc="Get notified when warranties are about to expire" 
                checked={notifs.warrantyAlerts} 
                onCheckedChange={(v) => handleToggle('warrantyAlerts', v)} 
              />
              <ToggleRow 
                label="Maintenance Reminders" 
                desc="Receive alerts for upcoming maintenance tasks" 
                checked={notifs.maintenanceReminders} 
                onCheckedChange={(v) => handleToggle('maintenanceReminders', v)} 
              />
              <ToggleRow 
                label="Value Depreciation Reports" 
                desc="Monthly summary of asset value changes" 
                checked={notifs.depreciationReports} 
                onCheckedChange={(v) => handleToggle('depreciationReports', v)} 
              />
            </div>
          </section>

          {/* Vault Security */}
          <section className="bg-[#1E1E1E]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#FFB800]/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#FFB800]" />
              </div>
              <h2 className="text-xl font-bold text-[#F5F5F5]">Vault Security</h2>
            </div>
            
            {isChangingPassword ? (
              <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="relative">
                   <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Current Password" 
                    value={passwords.current} 
                    onChange={e => setPasswords({...passwords, current: e.target.value})} 
                    className="bg-[#121212] border-white/10 text-white pr-10" 
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-white/40 hover:text-white transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                <Input type={showPassword ? "text" : "password"} placeholder="New Password" value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} className="bg-[#121212] border-white/10 text-white" />
                <Input type={showPassword ? "text" : "password"} placeholder="Confirm New Password" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} className="bg-[#121212] border-white/10 text-white" />
                
                <div className="flex gap-2">
                  <Button onClick={() => setIsChangingPassword(false)} variant="ghost" className="flex-1">Cancel</Button>
                  <Button onClick={handleUpdatePassword} className="flex-1 bg-[#00E5FF] text-black font-bold">Update</Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setIsChangingPassword(true)} variant="outline" className="w-full justify-start border-white/10 text-white h-12">
                <Key className="w-4 h-4 mr-2" /> Change Vault Password
              </Button>
            )}

            <Button onClick={() => { signOut(); navigate('/login'); }} variant="outline" className="w-full justify-start border-red-500/20 text-red-400 mt-4 hover:bg-red-500/10">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </section>

          {/* Data Management */}
          <section className="bg-[#1E1E1E]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <Download className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-[#F5F5F5]">Data Management</h2>
              </div>
              <Button onClick={handleExportData} className="w-full bg-white/5 border border-white/10 text-white hover:bg-[#00E5FF]/20 transition-all">
                <Download className="w-4 h-4 mr-2" /> Export Vault as JSON
              </Button>
          </section>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, checked, onCheckedChange }: { label: string; desc: string; checked: boolean; onCheckedChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <Label className="text-[#F5F5F5] text-base">{label}</Label>
        <p className="text-xs text-[#B0B0B0] mt-1">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}