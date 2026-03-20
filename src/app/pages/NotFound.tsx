import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00FF88]">
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Search className="w-12 h-12 text-white/40" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-white/60 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:from-[#00B8D4] hover:to-[#00E5FF] text-white rounded-2xl px-8 shadow-lg shadow-[#00E5FF]/30"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
