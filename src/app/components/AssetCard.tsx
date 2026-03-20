import { motion } from 'motion/react';
import { Package, Calendar, DollarSign, Shield } from 'lucide-react';
import { Asset } from '../types/asset';
import { formatCurrency, formatDate, calculateWarrantyHealth } from '../utils/calculations';
import { Progress } from './ui/progress';

interface AssetCardProps {
  asset: Asset;
  index: number;
  onClick: () => void;
}

export function AssetCard({ asset, index, onClick }: AssetCardProps) {
  const warrantyHealth = calculateWarrantyHealth(asset.warranties);
  const activeWarranties = asset.warranties.filter(w => w.status === 'active').length;

  const getHealthColor = (health: number) => {
    if (health >= 70) return 'from-[#00FF88] to-[#00CC6F]';
    if (health >= 40) return 'from-[#FFB800] to-[#FF8C00]';
    return 'from-[#FF4444] to-[#CC0000]';
  };

  const getHealthGlow = (health: number) => {
    if (health >= 70) return 'shadow-[#00FF88]/30';
    if (health >= 40) return 'shadow-[#FFB800]/30';
    return 'shadow-[#FF4444]/30';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer overflow-hidden hover:border-[#00E5FF]/30 transition-all duration-300"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/0 to-[#00E5FF]/0 group-hover:from-[#00E5FF]/5 group-hover:to-transparent transition-all duration-300" />
      
      {/* Background image if available */}
      {asset.imageUrl && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
          <img 
            src={asset.imageUrl} 
            alt={asset.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
              {asset.name}
            </h3>
            <p className="text-sm text-white/50">
              {asset.manufacturer} • {asset.category}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-[#00E5FF]/5 flex items-center justify-center">
            <Package className="w-6 h-6 text-[#00E5FF]" />
          </div>
        </div>

        {/* Warranty Health Bar with Glow */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/70 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Warranty Health
            </span>
            <span className="text-xs font-semibold text-white">
              {warrantyHealth}%
            </span>
          </div>
          <motion.div
            whileHover={{ boxShadow: `0 0 20px rgba(0, 229, 255, 0.3)` }}
            className="transition-shadow duration-300"
          >
            <Progress 
              value={warrantyHealth} 
              className="h-2 bg-white/10"
              indicatorClassName={`bg-gradient-to-r ${getHealthColor(warrantyHealth)} transition-all duration-500`}
            />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-[#00FF88]" />
              <span className="text-xs text-white/50">Current Value</span>
            </div>
            <p className="text-lg font-bold text-white">
              {formatCurrency(asset.currentValue)}
            </p>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-xs text-white/50">Purchase Date</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {formatDate(asset.purchaseDate)}
            </p>
          </div>
        </div>

        {/* Active Warranties Badge */}
        {activeWarranties > 0 && (
          <div className="mt-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20">
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="text-xs font-medium text-[#00FF88]">
              {activeWarranties} Active {activeWarranties === 1 ? 'Warranty' : 'Warranties'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}