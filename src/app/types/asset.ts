export interface WarrantyTier {
  id: string;
  name: string;
  provider: string;
  startDate: Date;
  endDate: Date;
  coverage: string;
  status: 'active' | 'expiring' | 'expired';
}

export interface MaintenanceTask {
  id: string;
  name: string;
  description: string;
  frequency: number; // days
  lastCompleted: Date | null;
  nextDue: Date;
  completed: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: 'receipt' | 'warranty' | 'manual' | 'other';
  url: string;
  uploadDate: Date;
}

export interface Asset {
  brand: string;
  id: string;
  name: string;
  category: string;
  purchaseDate: Date;
  purchaseCost: number;
  currentValue: number;
  depreciationRate: number; // percentage per year
  manufacturer: string;
  model: string;
  serialNumber: string;
  warranties: WarrantyTier[];
  maintenanceTasks: MaintenanceTask[];
  documents: Document[];
  imageUrl?: string;
  notes: string;
}

export interface AssetFormData {
  name: string;
  category: string;
  purchaseDate: string;
  purchaseCost: string;
  depreciationRate: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  notes: string;
  warranties: Array<{
    name: string;
    provider: string;
    startDate: string;
    endDate: string;
    coverage: string;
  }>;
  maintenanceTasks: Array<{
    name: string;
    description: string;
    frequency: string;
  }>;
}
