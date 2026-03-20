import { Asset, WarrantyTier } from '../types/asset';

/**
 * Calculate current asset value using Declining Balance Method
 * Formula: Value = Cost × (1 - Rate)^Age
 */
export function calculateCurrentValue(
  purchaseCost: number,
  purchaseDate: Date,
  depreciationRate: number
): number {
  const ageInYears = getAssetAgeInYears(purchaseDate);
  const rate = depreciationRate / 100;
  const currentValue = purchaseCost * Math.pow(1 - rate, ageInYears);
  return Math.max(0, currentValue);
}

/**
 * Get asset age in years (decimal)
 */
export function getAssetAgeInYears(purchaseDate: Date): number {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - purchaseDate.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return diffYears;
}

/**
 * Calculate warranty health percentage (0-100)
 * Based on active warranties and time remaining
 */
export function calculateWarrantyHealth(warranties: WarrantyTier[]): number {
  if (warranties.length === 0) return 0;

  const activeWarranties = warranties.filter(w => w.status === 'active');
  if (activeWarranties.length === 0) return 0;

  // Calculate average time remaining percentage
  const now = new Date();
  let totalHealthScore = 0;

  activeWarranties.forEach(warranty => {
    const totalDuration = warranty.endDate.getTime() - warranty.startDate.getTime();
    const remaining = warranty.endDate.getTime() - now.getTime();
    const healthScore = Math.max(0, Math.min(100, (remaining / totalDuration) * 100));
    totalHealthScore += healthScore;
  });

  return Math.round(totalHealthScore / activeWarranties.length);
}

/**
 * Get warranty status based on remaining time
 */
export function getWarrantyStatus(endDate: Date): 'active' | 'expiring' | 'expired' {
  const now = new Date();
  const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) return 'expired';
  if (daysRemaining <= 30) return 'expiring';
  return 'active';
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Calculate total vault value
 */
export function calculateTotalVaultValue(assets: Asset[]): number {
  return assets.reduce((total, asset) => total + asset.currentValue, 0);
}

/**
 * Get depreciation data for chart (monthly points)
 */
export function getDepreciationChartData(
  purchaseCost: number,
  purchaseDate: Date,
  depreciationRate: number,
  yearsToProject: number = 5
): Array<{ month: string; value: number }> {
  const data: Array<{ month: string; value: number }> = [];
  const rate = depreciationRate / 100;
  const monthsToProject = yearsToProject * 12;

  for (let month = 0; month <= monthsToProject; month += 3) {
    const ageInYears = month / 12;
    const value = purchaseCost * Math.pow(1 - rate, ageInYears);
    const date = new Date(purchaseDate);
    date.setMonth(date.getMonth() + month);

    data.push({
      month: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
      value: Math.max(0, value),
    });
  }

  return data;
}

/**
 * Calculate days until next maintenance
 */
export function calculateDaysUntilMaintenance(lastCompleted: Date | null, frequency: number): number {
  if (!lastCompleted) return 0;
  const nextDue = new Date(lastCompleted);
  nextDue.setDate(nextDue.getDate() + frequency);
  const now = new Date();
  return Math.ceil((nextDue.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}
