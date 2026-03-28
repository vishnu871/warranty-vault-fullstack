// import { Asset } from '../types/asset';
// // import { calculateCurrentValue, getWarrantyStatus } from './calculations';
import { Asset } from '../types/asset';
// POINT THIS TO YOUR NEW CALCULATIONS FILE
import { calculateCurrentValue, getWarrantyStatus } from './calculations';

/**
 * Generate sample assets for demonstration
 */
export function generateSampleAssets(): Asset[] {
  const now = new Date();
  
  const asset1: Asset = {
    id: 'sample-1',
    name: 'MacBook Pro 16"',
    category: 'Electronics',
    purchaseDate: new Date('2023-01-15'),
    purchaseCost: 3499,
    currentValue: 0,
    depreciationRate: 20,
    manufacturer: 'Apple',
    model: 'MacBook Pro 16-inch (2023)',
    serialNumber: 'C02XJ0FTJGH5',
    notes: 'M2 Max, 32GB RAM, 1TB SSD',
    imageUrl: 'https://images.unsplash.com/photo-1551533390-b80b6ffa7816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNib29rJTIwcHJvJTIwbGFwdG9wfGVufDF8fHx8MTc3Mzk3MzgyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    warranties: [
      {
        id: 'w1-1',
        name: 'Manufacturer Warranty',
        provider: 'Apple',
        startDate: new Date('2023-01-15'),
        endDate: new Date('2024-01-15'),
        coverage: 'Hardware defects',
        status: 'expired',
      },
      {
        id: 'w1-2',
        name: 'AppleCare+ Extended',
        provider: 'Apple',
        startDate: new Date('2023-01-15'),
        endDate: new Date('2026-01-15'),
        coverage: 'Accidental damage, hardware',
        status: 'active',
      },
    ],
    maintenanceTasks: [
      {
        id: 'm1-1',
        name: 'Clean Keyboard & Vents',
        description: 'Remove dust from keyboard and cooling vents',
        frequency: 90,
        lastCompleted: new Date('2024-12-01'),
        nextDue: new Date('2025-03-01'),
        completed: false,
      },
      {
        id: 'm1-2',
        name: 'Battery Health Check',
        description: 'Check battery cycle count and health',
        frequency: 180,
        lastCompleted: new Date('2024-10-01'),
        nextDue: new Date('2025-04-01'),
        completed: false,
      },
    ],
    documents: [],
  };

  const asset2: Asset = {
    id: 'sample-2',
    name: 'Samsung 65" QLED TV',
    category: 'Home Appliances',
    purchaseDate: new Date('2022-06-20'),
    purchaseCost: 1899,
    currentValue: 0,
    depreciationRate: 25,
    manufacturer: 'Samsung',
    model: 'QN65Q80A',
    serialNumber: 'KBXYZ123456',
    notes: '4K QLED, HDR10+, 120Hz',
    imageUrl: 'https://images.unsplash.com/photo-1762417582263-7f423d344b77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1zdW5nJTIwdGVsZXZpc2lvbiUyMGRpc3BsYXl8ZW58MXx8fHwxNzczOTgzNjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    warranties: [
      {
        id: 'w2-1',
        name: 'Manufacturer Warranty',
        provider: 'Samsung',
        startDate: new Date('2022-06-20'),
        endDate: new Date('2023-06-20'),
        coverage: 'Parts and labor',
        status: 'expired',
      },
      {
        id: 'w2-2',
        name: 'Extended Protection Plan',
        provider: 'Best Buy',
        startDate: new Date('2022-06-20'),
        endDate: new Date('2027-06-20'),
        coverage: 'Full coverage including accidental damage',
        status: 'active',
      },
    ],
    maintenanceTasks: [
      {
        id: 'm2-1',
        name: 'Screen Cleaning',
        description: 'Clean screen with microfiber cloth',
        frequency: 30,
        lastCompleted: new Date('2025-02-20'),
        nextDue: new Date('2025-03-22'),
        completed: false,
      },
    ],
    documents: [],
  };

  const asset3: Asset = {
    id: 'sample-3',
    name: 'Dyson V15 Detect',
    category: 'Home Appliances',
    purchaseDate: new Date('2024-03-10'),
    purchaseCost: 749,
    currentValue: 0,
    depreciationRate: 15,
    manufacturer: 'Dyson',
    model: 'V15 Detect Absolute',
    serialNumber: 'DY-V15-98765',
    notes: 'Cordless vacuum with laser detection',
    imageUrl: 'https://images.unsplash.com/photo-1722710070534-e31f0290d8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkeXNvbiUyMHZhY3V1bSUyMGNsZWFuZXJ8ZW58MXx8fHwxNzczOTEyNTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    warranties: [
      {
        id: 'w3-1',
        name: 'Manufacturer Warranty',
        provider: 'Dyson',
        startDate: new Date('2024-03-10'),
        endDate: new Date('2026-03-10'),
        coverage: '2-year parts and labor',
        status: 'active',
      },
    ],
    maintenanceTasks: [
      {
        id: 'm3-1',
        name: 'Clean Filter',
        description: 'Rinse and dry filter',
        frequency: 30,
        lastCompleted: new Date('2025-02-18'),
        nextDue: new Date('2025-03-20'),
        completed: false,
      },
      {
        id: 'm3-2',
        name: 'Empty Bin & Check Brush',
        description: 'Empty dust bin and remove hair from brush bar',
        frequency: 7,
        lastCompleted: new Date('2025-03-13'),
        nextDue: new Date('2025-03-20'),
        completed: false,
      },
    ],
    documents: [],
  };

  // Calculate current values and update warranty statuses
  const assets = [asset1, asset2, asset3];
  
  assets.forEach(asset => {
    asset.currentValue = calculateCurrentValue(
      asset.purchaseCost,
      asset.purchaseDate,
      asset.depreciationRate
    );
    
    asset.warranties.forEach(warranty => {
      warranty.status = getWarrantyStatus(warranty.endDate);
    });
  });

  return assets;
}