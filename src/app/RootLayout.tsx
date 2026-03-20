import { Outlet } from 'react-router';
import { Toaster } from './components/ui/sonner';
import { AppSidebar } from './components/AppSidebar';
import { BottomNav } from './components/BottomNav';
import { useBreakpoint } from './hooks/useBreakpoint';
import { useState } from 'react';
import { AddAssetModal } from './components/AddAssetModal';
import { Asset } from './types/asset';
import { loadAssets, saveAssets } from './utils/storage';
import { calculateCurrentValue, getWarrantyStatus } from './utils/calculations';
import { toast } from 'sonner';

export function RootLayout() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const isDesktop = breakpoint === 'desktop';
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Calculate margin based on sidebar width
  const marginLeft = isMobile ? 'ml-0' : isDesktop ? 'ml-64' : 'ml-20';
  const paddingBottom = isMobile ? 'pb-24' : 'pb-0';

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

    const assets = loadAssets();
    const updatedAssets = [...assets, newAsset];
    saveAssets(updatedAssets);
    toast.success('Asset added successfully!');
    
    // Trigger page reload to update asset list
    window.dispatchEvent(new CustomEvent('assetsUpdated'));
  };

  return (
    <div className="min-h-screen bg-[#121212] flex dark">
      {/* Desktop/Tablet Sidebar */}
      {!isMobile && <AppSidebar />}
      
      {/* Main Content */}
      <div className={`flex-1 ${marginLeft} ${paddingBottom} transition-all duration-300`}>
        <Outlet />
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && <BottomNav onAddAsset={() => setIsAddModalOpen(true)} />}

      {/* Add Asset Modal (for mobile FAB) */}
      <AddAssetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAsset}
      />

      {/* Toast Notifications */}
      <Toaster 
        theme="dark"
        position={isMobile ? "top-center" : "bottom-right"}
        toastOptions={{
          style: {
            background: 'rgba(18, 18, 18, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#F5F5F5',
            backdropFilter: 'blur(20px)',
          },
        }}
      />
    </div>
  );
}