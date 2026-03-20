import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Asset, AssetFormData } from '../types/asset';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (asset: Asset) => void;
}

const STEPS = ['Basic Info', 'Warranty & Service', 'Review'];

export function AddAssetModal({ isOpen, onClose, onAdd }: AddAssetModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AssetFormData>({
    name: '',
    category: '',
    purchaseDate: '',
    purchaseCost: '',
    depreciationRate: '20',
    manufacturer: '',
    model: '',
    serialNumber: '',
    notes: '',
    warranties: [],
    maintenanceTasks: [],
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const newAsset: Asset = {
      id: `asset-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      purchaseDate: new Date(formData.purchaseDate),
      purchaseCost: parseFloat(formData.purchaseCost),
      currentValue: parseFloat(formData.purchaseCost),
      depreciationRate: parseFloat(formData.depreciationRate),
      manufacturer: formData.manufacturer,
      model: formData.model,
      serialNumber: formData.serialNumber,
      notes: formData.notes,
      warranties: formData.warranties.map((w, index) => ({
        id: `warranty-${Date.now()}-${index}`,
        name: w.name,
        provider: w.provider,
        startDate: new Date(w.startDate),
        endDate: new Date(w.endDate),
        coverage: w.coverage,
        status: 'active',
      })),
      maintenanceTasks: formData.maintenanceTasks.map((t, index) => ({
        id: `task-${Date.now()}-${index}`,
        name: t.name,
        description: t.description,
        frequency: parseInt(t.frequency),
        lastCompleted: null,
        nextDue: new Date(Date.now() + parseInt(t.frequency) * 24 * 60 * 60 * 1000),
        completed: false,
      })),
      documents: [],
    };

    onAdd(newAsset);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(0);
    setFormData({
      name: '',
      category: '',
      purchaseDate: '',
      purchaseCost: '',
      depreciationRate: '20',
      manufacturer: '',
      model: '',
      serialNumber: '',
      notes: '',
      warranties: [],
      maintenanceTasks: [],
    });
    onClose();
  };

  const addWarranty = () => {
    setFormData({
      ...formData,
      warranties: [
        ...formData.warranties,
        { name: '', provider: '', startDate: '', endDate: '', coverage: '' },
      ],
    });
  };

  const addMaintenanceTask = () => {
    setFormData({
      ...formData,
      maintenanceTasks: [
        ...formData.maintenanceTasks,
        { name: '', description: '', frequency: '30' },
      ],
    });
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return (
        formData.name &&
        formData.category &&
        formData.purchaseDate &&
        formData.purchaseCost &&
        formData.manufacturer
      );
    }
    return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl z-50 max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Add New Asset</h2>
                <Button
                  onClick={handleClose}
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center gap-2">
                {STEPS.map((step, index) => (
                  <div key={index} className="flex items-center flex-1">
                    <div className="flex items-center gap-2 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                          index === currentStep
                            ? 'bg-[#00E5FF] text-white shadow-lg shadow-[#00E5FF]/30'
                            : index < currentStep
                            ? 'bg-[#00FF88] text-white'
                            : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          index === currentStep ? 'text-white' : 'text-white/50'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div
                        className={`h-0.5 w-full mx-2 transition-all duration-300 ${
                          index < currentStep ? 'bg-[#00FF88]' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="name" className="text-white">Asset Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., MacBook Pro 16"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="manufacturer" className="text-white">Manufacturer *</Label>
                        <Input
                          id="manufacturer"
                          value={formData.manufacturer}
                          onChange={(e) =>
                            setFormData({ ...formData, manufacturer: e.target.value })
                          }
                          placeholder="e.g., Apple"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="category" className="text-white">Category *</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="e.g., Electronics"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="model" className="text-white">Model</Label>
                        <Input
                          id="model"
                          value={formData.model}
                          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                          placeholder="e.g., A2780"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="serialNumber" className="text-white">Serial Number</Label>
                        <Input
                          id="serialNumber"
                          value={formData.serialNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, serialNumber: e.target.value })
                          }
                          placeholder="e.g., C02XJ0FTJGH5"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="purchaseDate" className="text-white">Purchase Date *</Label>
                        <Input
                          id="purchaseDate"
                          type="date"
                          value={formData.purchaseDate}
                          onChange={(e) =>
                            setFormData({ ...formData, purchaseDate: e.target.value })
                          }
                          className="bg-white/5 border-white/10 text-white rounded-xl mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="purchaseCost" className="text-white">Purchase Cost *</Label>
                        <Input
                          id="purchaseCost"
                          type="number"
                          value={formData.purchaseCost}
                          onChange={(e) =>
                            setFormData({ ...formData, purchaseCost: e.target.value })
                          }
                          placeholder="e.g., 2999"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="depreciationRate" className="text-white">
                          Depreciation Rate (% per year)
                        </Label>
                        <Input
                          id="depreciationRate"
                          type="number"
                          value={formData.depreciationRate}
                          onChange={(e) =>
                            setFormData({ ...formData, depreciationRate: e.target.value })
                          }
                          placeholder="e.g., 20"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl mt-1"
                        />
                      </div>

                      <div className="col-span-2">
                        <Label htmlFor="notes" className="text-white">Notes</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Any additional information..."
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl mt-1 min-h-[80px]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">Warranties (Optional)</h3>
                        <Button
                          type="button"
                          onClick={addWarranty}
                          size="sm"
                          className="bg-[#00E5FF]/20 hover:bg-[#00E5FF]/30 text-[#00E5FF] rounded-xl"
                        >
                          + Add Warranty
                        </Button>
                      </div>
                      {formData.warranties.length === 0 ? (
                        <p className="text-white/50 text-sm">No warranties added yet</p>
                      ) : (
                        <div className="space-y-3">
                          {formData.warranties.map((warranty, index) => (
                            <div
                              key={index}
                              className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3"
                            >
                              <div className="grid grid-cols-2 gap-3">
                                <Input
                                  value={warranty.name}
                                  onChange={(e) => {
                                    const updated = [...formData.warranties];
                                    updated[index].name = e.target.value;
                                    setFormData({ ...formData, warranties: updated });
                                  }}
                                  placeholder="Warranty Name"
                                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl"
                                />
                                <Input
                                  value={warranty.provider}
                                  onChange={(e) => {
                                    const updated = [...formData.warranties];
                                    updated[index].provider = e.target.value;
                                    setFormData({ ...formData, warranties: updated });
                                  }}
                                  placeholder="Provider"
                                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl"
                                />
                                <Input
                                  type="date"
                                  value={warranty.startDate}
                                  onChange={(e) => {
                                    const updated = [...formData.warranties];
                                    updated[index].startDate = e.target.value;
                                    setFormData({ ...formData, warranties: updated });
                                  }}
                                  placeholder="Start Date"
                                  className="bg-white/5 border-white/10 text-white rounded-xl"
                                />
                                <Input
                                  type="date"
                                  value={warranty.endDate}
                                  onChange={(e) => {
                                    const updated = [...formData.warranties];
                                    updated[index].endDate = e.target.value;
                                    setFormData({ ...formData, warranties: updated });
                                  }}
                                  placeholder="End Date"
                                  className="bg-white/5 border-white/10 text-white rounded-xl"
                                />
                                <Input
                                  value={warranty.coverage}
                                  onChange={(e) => {
                                    const updated = [...formData.warranties];
                                    updated[index].coverage = e.target.value;
                                    setFormData({ ...formData, warranties: updated });
                                  }}
                                  placeholder="Coverage Details"
                                  className="col-span-2 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-white">
                          Maintenance Tasks (Optional)
                        </h3>
                        <Button
                          type="button"
                          onClick={addMaintenanceTask}
                          size="sm"
                          className="bg-[#00E5FF]/20 hover:bg-[#00E5FF]/30 text-[#00E5FF] rounded-xl"
                        >
                          + Add Task
                        </Button>
                      </div>
                      {formData.maintenanceTasks.length === 0 ? (
                        <p className="text-white/50 text-sm">No maintenance tasks added yet</p>
                      ) : (
                        <div className="space-y-3">
                          {formData.maintenanceTasks.map((task, index) => (
                            <div
                              key={index}
                              className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3"
                            >
                              <div className="grid grid-cols-2 gap-3">
                                <Input
                                  value={task.name}
                                  onChange={(e) => {
                                    const updated = [...formData.maintenanceTasks];
                                    updated[index].name = e.target.value;
                                    setFormData({ ...formData, maintenanceTasks: updated });
                                  }}
                                  placeholder="Task Name"
                                  className="col-span-2 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl"
                                />
                                <Input
                                  value={task.description}
                                  onChange={(e) => {
                                    const updated = [...formData.maintenanceTasks];
                                    updated[index].description = e.target.value;
                                    setFormData({ ...formData, maintenanceTasks: updated });
                                  }}
                                  placeholder="Description"
                                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl"
                                />
                                <Input
                                  type="number"
                                  value={task.frequency}
                                  onChange={(e) => {
                                    const updated = [...formData.maintenanceTasks];
                                    updated[index].frequency = e.target.value;
                                    setFormData({ ...formData, maintenanceTasks: updated });
                                  }}
                                  placeholder="Frequency (days)"
                                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/20 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">{formData.name}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-white/50">Manufacturer:</span>
                          <p className="text-white font-medium">{formData.manufacturer}</p>
                        </div>
                        <div>
                          <span className="text-white/50">Category:</span>
                          <p className="text-white font-medium">{formData.category}</p>
                        </div>
                        <div>
                          <span className="text-white/50">Purchase Cost:</span>
                          <p className="text-white font-medium">${formData.purchaseCost}</p>
                        </div>
                        <div>
                          <span className="text-white/50">Depreciation:</span>
                          <p className="text-white font-medium">{formData.depreciationRate}% / year</p>
                        </div>
                        <div>
                          <span className="text-white/50">Warranties:</span>
                          <p className="text-white font-medium">{formData.warranties.length}</p>
                        </div>
                        <div>
                          <span className="text-white/50">Maintenance Tasks:</span>
                          <p className="text-white font-medium">{formData.maintenanceTasks.length}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <Button
                onClick={handleBack}
                variant="ghost"
                disabled={currentStep === 0}
                className="text-white hover:bg-white/10 rounded-xl disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

              <div className="flex gap-2">
                {currentStep < STEPS.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] hover:from-[#00B8D4] hover:to-[#00E5FF] text-white rounded-xl disabled:opacity-30"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-[#00FF88] to-[#00CC6F] hover:from-[#00CC6F] hover:to-[#00FF88] text-white rounded-xl"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Add Asset
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
