import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Package, TrendingDown, Shield, Calendar } from 'lucide-react';
import { Asset } from '../types/asset';
import { loadAssets } from '../utils/storage';
import { formatCurrency, formatDate, calculateWarrantyHealth } from '../utils/calculations';
import { Badge } from '../components/ui/badge';
import { useBreakpoint } from '../hooks/useBreakpoint';

export function Vault() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';

  const padding = isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-8';

  useEffect(() => {
    setAssets(loadAssets());
  }, []);

  const getWarrantyStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-[#00FF88]/10 border-[#00FF88]/20 text-[#00FF88]">
            Active
          </Badge>
        );
      case 'expiring':
        return (
          <Badge className="bg-[#FFB800]/10 border-[#FFB800]/20 text-[#FFB800]">
            Expiring Soon
          </Badge>
        );
      case 'expired':
        return (
          <Badge className="bg-red-500/10 border-red-500/20 text-red-400">
            Expired
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex-1 ${padding}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${isMobile ? 'mb-4' : 'mb-8'}`}
        >
          <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-white mb-2`}>
            My Vault
          </h1>
          {!isMobile && (
            <p className="text-white/60">
              Complete overview of all your assets and warranties
            </p>
          )}
        </motion.div>

        {/* Asset List */}
        <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
          {assets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl ${
                isMobile ? 'p-4' : 'p-6'
              } hover:border-[#00E5FF]/30 transition-all duration-300`}
            >
              <div className={`flex items-start ${isMobile ? 'gap-3' : 'gap-6'}`}>
                {/* Icon */}
                {!isMobile && (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-[#00E5FF]/5 flex items-center justify-center flex-shrink-0">
                    <Package className="w-8 h-8 text-[#00E5FF]" />
                  </div>
                )}

                {/* Main Info */}
                <div className="flex-1 min-w-0">
                  <div className={`flex items-start justify-between ${isMobile ? 'mb-3' : 'mb-4'}`}>
                    <div>
                      <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white mb-1`}>
                        {asset.name}
                      </h3>
                      <p className={`${isMobile ? 'text-sm' : 'text-base'} text-white/60`}>
                        {asset.manufacturer} • {asset.model}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-white`}>
                        {formatCurrency(asset.currentValue)}
                      </p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/50`}>
                        Current Value
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className={`grid ${
                    isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'
                  } ${isMobile ? 'gap-2 mb-3' : 'gap-4 mb-4'}`}>
                    <div className={`bg-white/5 rounded-xl ${isMobile ? 'p-2' : 'p-3'} border border-white/5`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-[#00E5FF]`} />
                        <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/50`}>
                          Purchased
                        </span>
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-white`}>
                        {formatDate(asset.purchaseDate)}
                      </p>
                    </div>

                    <div className={`bg-white/5 rounded-xl ${isMobile ? 'p-2' : 'p-3'} border border-white/5`}>
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingDown className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-[#FFB800]`} />
                        <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/50`}>
                          Depreciation
                        </span>
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-white`}>
                        {asset.depreciationRate}% / year
                      </p>
                    </div>

                    <div className={`bg-white/5 rounded-xl ${isMobile ? 'p-2' : 'p-3'} border border-white/5`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-[#00FF88]`} />
                        <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/50`}>
                          Warranty Health
                        </span>
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-white`}>
                        {calculateWarrantyHealth(asset.warranties)}%
                      </p>
                    </div>

                    <div className={`bg-white/5 rounded-xl ${isMobile ? 'p-2' : 'p-3'} border border-white/5`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Package className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-[#00E5FF]`} />
                        <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/50`}>
                          Category
                        </span>
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-white`}>
                        {asset.category}
                      </p>
                    </div>
                  </div>

                  {/* Warranties */}
                  {asset.warranties.length > 0 && (
                    <div>
                      <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold text-white/70 mb-2`}>
                        Warranties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {asset.warranties.map((warranty) => (
                          <div
                            key={warranty.id}
                            className={`flex items-center gap-2 ${
                              isMobile ? 'px-2 py-1' : 'px-3 py-1.5'
                            } bg-white/5 rounded-lg border border-white/10`}
                          >
                            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                              {warranty.name}
                            </span>
                            {getWarrantyStatusBadge(warranty.status)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {assets.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/50 text-lg">No assets in your vault yet</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}