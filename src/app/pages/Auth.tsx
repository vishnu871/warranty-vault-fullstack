import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Vault, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';
// 🔥 Import the new Modal
import { ForgotPasswordModal } from '../components/ForgotPasswordModal';



export function Auth() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // 🔥 State to control the Forgot Password Modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        toast.success('Welcome back to the Vault!');
      } else {
        await signUp(name, email, password);
        toast.success('Account created successfully!');
      }
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const isSignIn = mode === 'signin';

  return (
    <div className="min-h-screen bg-[#121212] dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 229, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 255, 136, 0.15) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6, delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#00B8D4] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#00E5FF]/20"
            >
              <Vault className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Warranty Vault</h1>
            <p className="text-white/60">Premium Asset Protection OS</p>
          </div>

          {/* Tab Toggle */}
          <div className="flex gap-2 mb-6 bg-white/5 rounded-2xl p-1">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                isSignIn
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] shadow-lg shadow-[#00E5FF]/20'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                !isSignIn
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] shadow-lg shadow-[#00E5FF]/20'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isSignIn && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Label className="text-white/70 mb-2 block">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required={!isSignIn}
                      className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-2xl h-12 focus:border-[#00E5FF]/50 focus:ring-[#00E5FF]/20"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <Label className="text-white/70 mb-2 block">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-2xl h-12 focus:border-[#00E5FF]/50 focus:ring-[#00E5FF]/20"
                />
              </div>
            </div>

            <div>
              <Label className="text-white/70 mb-2 block">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-2xl h-12 focus:border-[#00E5FF]/50 focus:ring-[#00E5FF]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isSignIn && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                    id="remember"
                    className="border-white/20"
                  />
                  <Label htmlFor="remember" className="text-sm text-white/60 cursor-pointer">
                    Remember me
                  </Label>
                </div>
                {/* 🔥 Updated Button to trigger the Modal */}
                <button 
                  type="button" 
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-sm text-[#00E5FF] hover:text-[#00B8D4] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:from-[#00B8D4] hover:to-[#00E5FF] text-white rounded-2xl h-12 text-base font-semibold shadow-lg shadow-[#00E5FF]/30 transition-all duration-300 hover:shadow-[#00E5FF]/50 hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <span>{isSignIn ? 'Enter the Vault' : 'Create Account'}</span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-white/50">
              {isSignIn ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setMode(isSignIn ? 'signup' : 'signin')}
                className="text-[#00E5FF] hover:text-[#00B8D4] font-medium transition-colors"
              >
                {isSignIn ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-xs text-white/40">
            🔒 Your data is securely stored locally in your browser
          </p>
        </motion.div>
      </motion.div>

      {/* 🔥 The Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={isForgotModalOpen} 
        onClose={() => setIsForgotModalOpen(false)} 
      />
    </div>
  );
}