import { motion } from 'motion/react';
import { Package, Plus, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  onAddAsset: () => void;
}

export function EmptyState({ onAddAsset }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[600px] px-4"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-[#00E5FF]/20 blur-3xl rounded-full" />
        <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-[#00E5FF]/20 to-[#00E5FF]/5 border border-[#00E5FF]/30 flex items-center justify-center">
          <Package className="w-16 h-16 text-[#00E5FF]" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -top-2 -right-2"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFB800] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-8 max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-3">
          Your Vault is Empty
        </h2>
        <p className="text-white/60 text-lg">
          Start building your asset portfolio by adding your first item. Track warranties, monitor value, and never lose important documents again.
        </p>
      </motion.div>

      {/* Features List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl w-full"
      >
        {[
          { icon: '📊', title: 'Track Value', desc: 'Real-time depreciation' },
          { icon: '🛡️', title: 'Warranty Watch', desc: 'Never miss coverage' },
          { icon: '📄', title: 'Digital Docs', desc: 'All receipts in one place' },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center"
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
            <p className="text-white/50 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button
          onClick={onAddAsset}
          size="lg"
          className="bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:from-[#00B8D4] hover:to-[#00E5FF] text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg shadow-[#00E5FF]/30 hover:shadow-[#00E5FF]/50 transition-all duration-300"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Your First Asset
        </Button>
      </motion.div>
    </motion.div>
  );
}
