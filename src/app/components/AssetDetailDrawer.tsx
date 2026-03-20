import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, DollarSign, TrendingDown, Shield, Wrench, FileText, Trash2, Edit, Check } from 'lucide-react';
import { Asset } from '../types/asset';
import { formatCurrency, formatDate, getDepreciationChartData } from '../utils/calculations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { DeleteAssetModal } from './DeleteAssetModal';
import { useState } from 'react';
import { toast } from 'sonner';

interface AssetDetailDrawerProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (assetId: string) => void;
  onUpdate?: (asset: Asset) => void;
}

export function AssetDetailDrawer({ asset, isOpen, onClose, onDelete, onUpdate }: AssetDetailDrawerProps) {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Editable fields
  const [editedName, setEditedName] = useState('');
  const [editedManufacturer, setEditedManufacturer] = useState('');
  const [editedModel, setEditedModel] = useState('');
  const [editedSerialNumber, setEditedSerialNumber] = useState('');
  const [editedNotes, setEditedNotes] = useState('');

  if (!asset) return null;

  // Initialize edit fields when entering edit mode
  const handleEnterEditMode = () => {
    setEditedName(asset.name);
    setEditedManufacturer(asset.manufacturer);
    setEditedModel(asset.model);
    setEditedSerialNumber(asset.serialNumber);
    setEditedNotes(asset.notes || '');
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    if (!editedName.trim() || !editedManufacturer.trim()) {
      toast.error('Name and manufacturer are required');
      return;
    }

    setIsSaving(true);
    
    // Simulate save delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const updatedAsset: Asset = {
      ...asset,
      name: editedName,
      manufacturer: editedManufacturer,
      model: editedModel,
      serialNumber: editedSerialNumber,
      notes: editedNotes,
    };

    onUpdate?.(updatedAsset);
    setIsSaving(false);
    setIsEditing(false);
    toast.success('Asset updated successfully!');
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(asset.id);
    setShowDeleteModal(false);
    onClose();
    toast.success('Asset removed from vault');
  };

  const depreciationData = getDepreciationChartData(
    asset.purchaseCost,
    asset.purchaseDate,
    asset.depreciationRate,
    5
  );

  const getWarrantyStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#00FF88]/10 border-[#00FF88]/20 text-[#00FF88]';
      case 'expiring':
        return 'bg-[#FFB800]/10 border-[#FFB800]/20 text-[#FFB800]';
      case 'expired':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      default:
        return 'bg-white/10 border-white/20 text-white';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 z-40 ${
              isMobile ? 'bg-black/90' : 'bg-black/60 backdrop-blur-sm'
            }`}
          />

          {/* Main content scale down effect - desktop/tablet only */}
          {!isMobile && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 0.98 }}
              exit={{ scale: 1 }}
              className="fixed inset-0 z-30 pointer-events-none"
            />
          )}

          {/* Drawer - slides from right on desktop/tablet, from bottom on mobile */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { x: '100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed z-50 overflow-y-auto ${
              isMobile
                ? 'bottom-0 left-0 right-0 top-[10%] rounded-t-3xl'
                : isTablet
                ? 'right-0 top-0 h-screen w-[60%]'
                : 'right-0 top-0 h-screen w-full md:w-[600px]'
            } bg-[#121212] border-white/10 ${
              isMobile ? 'border-t' : 'border-l'
            }`}
          >
            {/* Mobile handle */}
            {isMobile && (
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-white/20 rounded-full" />
              </div>
            )}

            <div className={isMobile ? 'p-4' : isTablet ? 'p-6' : 'p-8'}>
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-2`}>
                    {asset.name}
                  </h2>
                  <p className="text-white/60">
                    {asset.manufacturer} • {asset.model}
                  </p>
                </div>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Quick Stats Grid */}
              <div className={`grid grid-cols-2 ${isMobile ? 'gap-2 mb-6' : 'gap-4 mb-8'}`}>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-[#00FF88]`} />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/60`}>
                      Current Value
                    </span>
                  </div>
                  <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>
                    {formatCurrency(asset.currentValue)}
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    {isMobile ? formatCurrency(asset.purchaseCost) : `Original: ${formatCurrency(asset.purchaseCost)}`}
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-[#FFB800]`} />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/60`}>
                      Depreciation
                    </span>
                  </div>
                  <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>
                    {asset.depreciationRate}%
                  </p>
                  <p className="text-xs text-white/40 mt-1">Per year</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-[#00E5FF]`} />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/60`}>
                      Purchase Date
                    </span>
                  </div>
                  <p className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold text-white`}>
                    {formatDate(asset.purchaseDate)}
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-[#00FF88]`} />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/60`}>
                      Warranties
                    </span>
                  </div>
                  <p className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold text-white`}>
                    {asset.warranties.filter(w => w.status === 'active').length} Active
                  </p>
                </div>
              </div>

              {/* Depreciation Chart */}
              <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl ${isMobile ? 'p-4 mb-6' : 'p-6 mb-8'}`}>
                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white mb-4 flex items-center gap-2`}>
                  <TrendingDown className="w-5 h-5 text-[#00E5FF]" />
                  Value Depreciation Forecast
                </h3>
                <ResponsiveContainer width="100%" height={isMobile ? 160 : 200}>
                  <LineChart data={depreciationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="rgba(255,255,255,0.5)" 
                      fontSize={isMobile ? 10 : 12}
                      tick={{ fill: 'rgba(255,255,255,0.5)' }}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.5)" 
                      fontSize={isMobile ? 10 : 12}
                      tick={{ fill: 'rgba(255,255,255,0.5)' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(18, 18, 18, 0.95)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: 'white',
                      }}
                      formatter={(value: number) => [`$${value.toFixed(0)}`, 'Value']}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#00E5FF"
                      strokeWidth={isMobile ? 2 : 3}
                      dot={{ fill: '#00E5FF', r: isMobile ? 3 : 4 }}
                      activeDot={{ r: isMobile ? 5 : 6, fill: '#00E5FF' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Warranty Tiers */}
              <div className={isMobile ? 'mb-6' : 'mb-8'}>
                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white mb-4 flex items-center gap-2`}>
                  <Shield className="w-5 h-5 text-[#00E5FF]" />
                  Warranty Coverage
                </h3>
                <div className={isMobile ? 'space-y-2' : 'space-y-3'}>
                  {asset.warranties.map((warranty) => (
                    <div
                      key={warranty.id}
                      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl ${isMobile ? 'p-3' : 'p-4'}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-white`}>
                            {warranty.name}
                          </h4>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/60`}>
                            {warranty.provider}
                          </p>
                        </div>
                        <Badge className={`${getWarrantyStatusColor(warranty.status)} ${isMobile ? 'text-xs' : ''}`}>
                          {warranty.status}
                        </Badge>
                      </div>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/70 mb-2`}>
                        {warranty.coverage}
                      </p>
                      <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/50`}>
                        {formatDate(warranty.startDate)} - {formatDate(warranty.endDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance Tasks */}
              {asset.maintenanceTasks.length > 0 && (
                <div className={isMobile ? 'mb-6' : 'mb-8'}>
                  <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white mb-4 flex items-center gap-2`}>
                    <Wrench className="w-5 h-5 text-[#00E5FF]" />
                    Maintenance Schedule
                  </h3>
                  <div className={isMobile ? 'space-y-2' : 'space-y-3'}>
                    {asset.maintenanceTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl ${isMobile ? 'p-3' : 'p-4'}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-white`}>
                              {task.name}
                            </h4>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/60`}>
                              {task.description}
                            </p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-4 mt-3 ${isMobile ? 'text-[10px]' : 'text-xs'} text-white/50`}>
                          <span>Every {task.frequency} days</span>
                          <span>•</span>
                          <span>Next: {formatDate(task.nextDue)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className={isMobile ? 'mb-6' : 'mb-8'}>
                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white mb-4 flex items-center gap-2`}>
                  <FileText className="w-5 h-5 text-[#00E5FF]" />
                  Additional Details
                </h3>
                <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl ${isMobile ? 'p-3 space-y-2' : 'p-4 space-y-2'}`}>
                  <div className="flex justify-between">
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/60`}>
                      Serial Number
                    </span>
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white font-mono`}>
                      {asset.serialNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/60`}>
                      Category
                    </span>
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                      {asset.category}
                    </span>
                  </div>
                  {asset.notes && (
                    <div className="pt-2 border-t border-white/10">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/60 mb-1`}>
                        Notes
                      </p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>
                        {asset.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Editable Fields */}
              {isEditing && (
                <div className={isMobile ? 'mb-6' : 'mb-8'}>
                  <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white mb-4 flex items-center gap-2`}>
                    <Edit className="w-5 h-5 text-[#00E5FF]" />
                    Edit Asset Details
                  </h3>
                  <div className={isMobile ? 'space-y-2' : 'space-y-3'}>
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder="Asset Name"
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
                    />
                    <Input
                      value={editedManufacturer}
                      onChange={(e) => setEditedManufacturer(e.target.value)}
                      placeholder="Manufacturer"
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
                    />
                    <Input
                      value={editedModel}
                      onChange={(e) => setEditedModel(e.target.value)}
                      placeholder="Model"
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
                    />
                    <Input
                      value={editedSerialNumber}
                      onChange={(e) => setEditedSerialNumber(e.target.value)}
                      placeholder="Serial Number"
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
                    />
                    <Input
                      value={editedNotes}
                      onChange={(e) => setEditedNotes(e.target.value)}
                      placeholder="Notes"
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={`flex gap-3 ${isMobile ? 'pb-4' : ''}`}>
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      className={`flex-1 border-white/10 text-white hover:bg-white/5 rounded-xl ${isMobile ? 'h-10 text-sm' : ''}`}
                    >
                      <X className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveEdit}
                      disabled={isSaving}
                      className={`flex-1 bg-[#00E5FF] hover:bg-[#00B8D4] text-white rounded-xl shadow-lg shadow-[#00E5FF]/20 ${isMobile ? 'h-10 text-sm' : ''}`}
                    >
                      {isSaving ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Saving...</span>
                        </div>
                      ) : (
                        <>
                          <Check className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleEnterEditMode}
                      className={`flex-1 border-white/10 text-white hover:bg-white/5 rounded-xl ${isMobile ? 'h-10 text-sm' : ''} transition-all duration-300 hover:border-[#00E5FF]/50`}
                    >
                      <Edit className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteClick}
                      className={`bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-xl ${isMobile ? 'h-10 text-sm' : ''} transition-all duration-300`}
                    >
                      <Trash2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Delete Confirmation Modal */}
          <DeleteAssetModal
            isOpen={showDeleteModal}
            assetName={asset.name}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
}