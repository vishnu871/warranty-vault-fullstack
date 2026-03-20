import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Filter } from 'lucide-react';
import { Asset } from '../types/asset';
import { loadAssets, saveAssets, deleteAsset as deleteAssetFromStorage } from '../utils/storage';
import { calculateCurrentValue, calculateTotalVaultValue, getWarrantyStatus } from '../utils/calculations';
import { generateSampleAssets } from '../utils/mockData';
import { TotalValueCounter } from '../components/TotalValueCounter';
import { AssetCard } from '../components/AssetCard';
import { EmptyState } from '../components/EmptyState';
import { AssetDetailDrawer } from '../components/AssetDetailDrawer';
import { AddAssetModal } from '../components/AddAssetModal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useBreakpoint } from '../hooks/useBreakpoint';

export function Dashboard() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const breakpoint = useBreakpoint();

  // Responsive spacing
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';
  const padding = isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-8';
  const gridGap = isMobile ? 'gap-3' : isTablet ? 'gap-4' : 'gap-6';
  const gridCols = isMobile 
    ? 'grid-cols-1' 
    : isTablet 
    ? 'grid-cols-2' 
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      let loadedAssets = loadAssets();
      
      // If no assets, load sample data for demonstration
      if (loadedAssets.length === 0) {
        loadedAssets = generateSampleAssets();
        saveAssets(loadedAssets);
      }

      // Update current values and warranty statuses
      loadedAssets = loadedAssets.map(asset => ({
        ...asset,
        currentValue: calculateCurrentValue(
          asset.purchaseCost,
          asset.purchaseDate,
          asset.depreciationRate
        ),
        warranties: asset.warranties.map(w => ({
          ...w,
          status: getWarrantyStatus(w.endDate),
        })),
      }));

      setAssets(loadedAssets);
      setIsLoading(false);
    }, 300);
  }, []);

  // Listen for asset updates from RootLayout
  useEffect(() => {
    const handleAssetsUpdated = () => {
      const loadedAssets = loadAssets();
      const updatedAssets = loadedAssets.map(asset => ({
        ...asset,
        currentValue: calculateCurrentValue(
          asset.purchaseCost,
          asset.purchaseDate,
          asset.depreciationRate
        ),
        warranties: asset.warranties.map(w => ({
          ...w,
          status: getWarrantyStatus(w.endDate),
        })),
      }));
      setAssets(updatedAssets);
    };

    window.addEventListener('assetsUpdated', handleAssetsUpdated);
    return () => window.removeEventListener('assetsUpdated', handleAssetsUpdated);
  }, []);

  const handleDeleteAsset = (id: string) => {
    deleteAssetFromStorage(id);
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  const handleUpdateAsset = (updatedAsset: Asset) => {
    const updatedAssets = assets.map(a => a.id === updatedAsset.id ? updatedAsset : a);
    setAssets(updatedAssets);
    saveAssets(updatedAssets);
    
    // Update selected asset for drawer
    setSelectedAsset(updatedAsset);
  };

  const handleAddAsset = (newAsset: Asset) => {
    // Calculate initial current value
    newAsset.currentValue = calculateCurrentValue(
      newAsset.purchaseCost,
      newAsset.purchaseDate,
      newAsset.depreciationRate
    );

    // Update warranty statuses
    newAsset.warranties = newAsset.warranties.map(w => ({
      ...w,
      status: getWarrantyStatus(w.endDate),
    }));

    const updatedAssets = [...assets, newAsset];
    setAssets(updatedAssets);
    saveAssets(updatedAssets);
  };

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  const totalValue = calculateTotalVaultValue(assets);

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className={`flex-1 ${padding}`}>
        <div className="max-w-7xl mx-auto">
          {/* Loading Skeletons */}
          <div className="mb-8 h-32 bg-white/5 rounded-3xl animate-pulse" />
          <div className={`grid ${gridCols} ${gridGap}`}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white/5 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            Dashboard
          </h1>
          {!isMobile && (
            <p className="text-white/60">
              Track, manage, and monitor your valuable assets
            </p>
          )}
        </motion.div>

        {assets.length === 0 ? (
          <EmptyState onAddAsset={() => setIsAddModalOpen(true)} />
        ) : (
          <>
            {/* Total Value Counter */}
            <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
              <TotalValueCounter value={totalValue} assetCount={assets.length} />
            </div>

            {/* Search and Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`flex items-center ${isMobile ? 'flex-col gap-2 mb-4' : 'gap-4 mb-6'}`}
            >
              <div className={`${isMobile ? 'w-full' : 'flex-1'} relative`}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assets..."
                  className={`pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-2xl ${isMobile ? 'h-11' : 'h-12'}`}
                />
              </div>
              {!isMobile && (
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:from-[#00B8D4] hover:to-[#00E5FF] text-white rounded-2xl h-12 px-6 shadow-lg shadow-[#00E5FF]/20"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Asset
                </Button>
              )}
            </motion.div>

            {/* Asset Grid */}
            <div className={`grid ${gridCols} ${gridGap}`}>
              {filteredAssets.map((asset, index) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  index={index}
                  onClick={() => handleAssetClick(asset)}
                />
              ))}
            </div>

            {filteredAssets.length === 0 && searchQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-white/50 text-lg">
                  No assets found matching "{searchQuery}"
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Asset Detail Drawer */}
      <AssetDetailDrawer
        asset={selectedAsset}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onDelete={handleDeleteAsset}
        onUpdate={handleUpdateAsset}
      />

      {/* Add Asset Modal */}
      {!isMobile && (
        <AddAssetModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddAsset}
        />
      )}
    </div>
  );
}