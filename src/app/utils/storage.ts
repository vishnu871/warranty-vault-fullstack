import { Asset } from '../types/asset';

const STORAGE_KEY = 'warranty_vault_assets';

/**
 * Load assets from localStorage
 */
export function loadAssets(): Asset[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    
    // Convert date strings back to Date objects
    return parsed.map((asset: any) => ({
      ...asset,
      purchaseDate: new Date(asset.purchaseDate),
      warranties: asset.warranties.map((w: any) => ({
        ...w,
        startDate: new Date(w.startDate),
        endDate: new Date(w.endDate),
      })),
      maintenanceTasks: asset.maintenanceTasks.map((t: any) => ({
        ...t,
        lastCompleted: t.lastCompleted ? new Date(t.lastCompleted) : null,
        nextDue: new Date(t.nextDue),
      })),
      documents: asset.documents.map((d: any) => ({
        ...d,
        uploadDate: new Date(d.uploadDate),
      })),
    }));
  } catch (error) {
    console.error('Failed to load assets:', error);
    return [];
  }
}

/**
 * Save assets to localStorage
 */
export function saveAssets(assets: Asset[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  } catch (error) {
    console.error('Failed to save assets:', error);
  }
}

/**
 * Add a new asset
 */
export function addAsset(asset: Asset): Asset[] {
  const assets = loadAssets();
  assets.push(asset);
  saveAssets(assets);
  return assets;
}

/**
 * Update an existing asset
 */
export function updateAsset(updatedAsset: Asset): Asset[] {
  const assets = loadAssets();
  const index = assets.findIndex(a => a.id === updatedAsset.id);
  if (index !== -1) {
    assets[index] = updatedAsset;
    saveAssets(assets);
  }
  return assets;
}

/**
 * Delete an asset
 */
export function deleteAsset(assetId: string): Asset[] {
  const assets = loadAssets();
  const filtered = assets.filter(a => a.id !== assetId);
  saveAssets(filtered);
  return filtered;
}
