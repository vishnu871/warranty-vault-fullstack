import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingDown, Shield, Calendar, Smartphone } from 'lucide-react';
import { Asset } from '../types/asset';
import { 
  formatCurrency, 
  formatDate, 
  calculateWarrantyHealth, 
  calculateCurrentValue 
} from '../utils/calculations';
import { Badge } from '../components/ui/badge';
import { useBreakpoint } from '../hooks/useBreakpoint';

export function Vault() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';

  const padding = isMobile ? 'p-4' : isTablet ? 'p-6' : 'p-8';

  useEffect(() => {
    const fetchVaultAssets = async () => {
      const token = localStorage.getItem('token');
      try {
        // 🔥 Ensure your backend is running on 5000
        const response = await fetch("https://warranty-vault-fullstack.vercel.app/api/assets", {
          headers: { "x-auth-token": token || "" }
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Sanitizing data to ensure numbers are numbers and dates are dates
          const sanitizedData = data.map((asset: any) => {
            const pCost = Number(asset.purchaseCost || asset.purchasePrice) || 0;
            const dRate = Number(asset.depreciationRate) || 20;
            
            return {
              ...asset,
              // Calculate dynamic value on the fly
              currentValue: calculateCurrentValue(pCost, asset.purchaseDate, dRate)
            };
          });

          setAssets(sanitizedData);
        }
      } catch (err) {
        console.error("Vault fetch failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVaultAssets();
  }, []);

  const getWarrantyStatusBadge = (status: string) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'active':
        return (
          <Badge className="bg-[#00FF88]/10 border-[#00FF88]/20 text-[#00FF88] hover:bg-[#00FF88]/20">
            Active
          </Badge>
        );
      case 'expiring':
        return (
          <Badge className="bg-[#FFB800]/10 border-[#FFB800]/20 text-[#FFB800] hover:bg-[#FFB800]/20">
            Expiring
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

  if (isLoading) {
    return (
      <div className={`flex-1 ${padding} flex items-center justify-center min-h-[60vh]`}>
        <div className="w-12 h-12 border-4 border-[#00E5FF]/20 border-t-[#00E5FF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`flex-1 ${padding} min-h-screen bg-[#121212]`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-white mb-2`}>
            My Vault
          </h1>
          <p className="text-white/50 text-lg">
            Complete overview of all your assets and warranties
          </p>
        </motion.div>

        <div className="space-y-6">
          {assets.map((asset, index) => {
            const health = calculateWarrantyHealth(asset.warranties);
            
            return (
              <motion.div
                key={(asset as any)._id || asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#1E1E1E]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-[#00E5FF]/40 transition-all duration-500 shadow-2xl overflow-hidden"
              >
                {/* Background Glow Effect */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#00E5FF]/5 rounded-full blur-3xl group-hover:bg-[#00E5FF]/10 transition-colors duration-500" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-[#00E5FF]/5 flex items-center justify-center border border-[#00E5FF]/20 shadow-lg shadow-[#00E5FF]/10">
                        <Smartphone className="w-8 h-8 text-[#00E5FF]" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-[#00E5FF] transition-colors">
                          {asset.name}
                        </h2>
                        <p className="text-white/40 font-medium">
                          {asset.manufacturer || asset.brand} • {asset.model || 'Standard Edition'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-left md:text-right w-full md:w-auto">
                      <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {formatCurrency(asset.currentValue || 0)}
                      </h2>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 font-bold">
                        Current Market Value
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatBox 
                      label="Purchased" 
                      value={formatDate(asset.purchaseDate)} 
                      icon={<Calendar className="w-4 h-4 text-[#00E5FF]" />} 
                    />
                    <StatBox 
                      label="Depreciation" 
                      value={`${asset.depreciationRate || 20}% / year`} 
                      icon={<TrendingDown className="w-4 h-4 text-orange-400" />} 
                    />
                    <StatBox 
                      label="Health" 
                      value={`${health}%`} 
                      icon={<Shield className="w-4 h-4 text-[#00FF88]" />} 
                    />
                    <StatBox 
                      label="Category" 
                      value={asset.category || 'Electronics'} 
                      icon={<Package className="w-4 h-4 text-[#00E5FF]" />} 
                    />
                  </div>

                  {/* Warranties Row */}
                  {asset.warranties && asset.warranties.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-3">
                      {asset.warranties.map((warranty: any, wIndex: number) => (
                        <div 
                          key={wIndex}
                          className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <span className="text-xs font-medium text-white/70">{warranty.name || 'Standard Warranty'}</span>
                          {getWarrantyStatusBadge(warranty.status)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Empty State */}
          {assets.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-white/5 rounded-[40px] border border-dashed border-white/10"
            >
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-white/20" />
              </div>
              <p className="text-white/40 text-xl font-medium">Your vault is currently empty</p>
              <p className="text-white/20 mt-2">Start adding assets to track their value and protection</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-component for the stat boxes to keep code clean
function StatBox({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-[24px] p-5 hover:bg-white/[0.08] transition-all duration-300">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{label}</span>
      </div>
      <p className="text-white font-bold text-lg">{value}</p>
    </div>
  );
}