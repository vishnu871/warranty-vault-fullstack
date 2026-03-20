import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { TrendingUp, Vault } from 'lucide-react';

interface TotalValueCounterProps {
  value: number;
  assetCount: number;
}

export function TotalValueCounter({ value, assetCount }: TotalValueCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const springValue = useSpring(0, { duration: 1500, bounce: 0 });
  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );

  useEffect(() => {
    if (!hasAnimated && value > 0) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (value > 0) {
      springValue.set(value);
    }
  }, [value, springValue, hasAnimated]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-[#00E5FF]/10 via-[#00E5FF]/5 to-transparent backdrop-blur-xl border border-[#00E5FF]/20 rounded-3xl p-8 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/5 via-transparent to-[#00E5FF]/5 animate-pulse" />
      
      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00E5FF]/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#00B8D4] flex items-center justify-center shadow-lg shadow-[#00E5FF]/30">
              <Vault className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/60 font-medium">Total Vault Value</p>
              <p className="text-xs text-white/40">{assetCount} {assetCount === 1 ? 'Asset' : 'Assets'} Tracked</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20">
            <TrendingUp className="w-4 h-4 text-[#00FF88]" />
            <span className="text-sm font-semibold text-[#00FF88]">Active</span>
          </div>
        </div>

        {/* Counter Display */}
        <motion.div className="text-5xl md:text-6xl font-bold text-white mb-2">
          <motion.span>{displayValue}</motion.span>
        </motion.div>

        {/* Sub info */}
        <p className="text-white/50 text-sm">
          Real-time calculated using declining balance depreciation
        </p>
      </div>

      {/* Decorative grid */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
        <div className="absolute inset-0 grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="w-2 h-2 bg-[#00E5FF] rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
