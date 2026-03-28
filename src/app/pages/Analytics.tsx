// import { useState, useEffect } from 'react';
// import { motion } from 'motion/react';
// import { TrendingUp, TrendingDown, Shield, DollarSign } from 'lucide-react';
// import { Asset } from '../types/asset';
// import { loadAssets } from '../utils/storage';
// import { calculateTotalVaultValue, formatCurrency } from '../utils/calculations';
// import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { useBreakpoint } from '../hooks/useBreakpoint';

// export function Analytics() {
//   const [assets, setAssets] = useState<Asset[]>([]);
//   const breakpoint = useBreakpoint();
//   const isMobile = breakpoint === 'mobile';
//   const isTablet = breakpoint === 'tablet';

//   const padding = isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-8';

//   useEffect(() => {
//     setAssets(loadAssets());
//   }, []);

//   const totalValue = calculateTotalVaultValue(assets);
//   const totalPurchaseCost = assets.reduce((sum, asset) => sum + asset.purchaseCost, 0);
//   const totalDepreciation = totalPurchaseCost - totalValue;
//   const activeWarranties = assets.reduce(
//     (sum, asset) => sum + asset.warranties.filter(w => w.status === 'active').length,
//     0
//   );

//   // Category Distribution
//   const categoryData = assets.reduce((acc, asset) => {
//     const existing = acc.find(item => item.name === asset.category);
//     if (existing) {
//       existing.value += asset.currentValue;
//     } else {
//       acc.push({ name: asset.category, value: asset.currentValue });
//     }
//     return acc;
//   }, [] as Array<{ name: string; value: number }>);

//   // Asset Value Comparison
//   const assetValueData = assets.map(asset => ({
//     name: asset.name.length > 15 ? asset.name.substring(0, 15) + '...' : asset.name,
//     purchased: asset.purchaseCost,
//     current: asset.currentValue,
//   }));

//   const COLORS = ['#00E5FF', '#00FF88', '#FFB800', '#FF4444', '#9C27B0', '#FF6B9D'];

//   return (
//     <div className={`flex-1 ${padding}`}>
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className={`${isMobile ? 'mb-4' : 'mb-8'}`}
//         >
//           <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-white mb-2`}>
//             Analytics
//           </h1>
//           {!isMobile && (
//             <p className="text-white/60">
//               Insights and trends across your asset portfolio
//             </p>
//           )}
//         </motion.div>

//         {/* KPI Cards */}
//         <div className={`grid ${
//           isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
//         } ${isMobile ? 'gap-2 mb-4' : 'gap-6 mb-8'}`}>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className={`bg-gradient-to-br from-[#00E5FF]/10 to-transparent backdrop-blur-xl border border-[#00E5FF]/20 rounded-3xl ${isMobile ? 'p-3' : 'p-6'}`}
//           >
//             <div className={`flex items-center justify-between ${isMobile ? 'mb-2' : 'mb-4'}`}>
//               <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} rounded-2xl bg-[#00E5FF]/20 flex items-center justify-center`}>
//                 <DollarSign className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-[#00E5FF]`} />
//               </div>
//               {!isMobile && <TrendingUp className="w-5 h-5 text-[#00FF88]" />}
//             </div>
//             <h3 className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm'} mb-1`}>Total Value</h3>
//             <p className={`${isMobile ? 'text-lg' : 'text-3xl'} font-bold text-white`}>
//               {isMobile ? formatCurrency(totalValue).replace(/,000$/, 'k').replace('.00', '') : formatCurrency(totalValue)}
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className={`bg-gradient-to-br from-[#FFB800]/10 to-transparent backdrop-blur-xl border border-[#FFB800]/20 rounded-3xl ${isMobile ? 'p-3' : 'p-6'}`}
//           >
//             <div className={`flex items-center justify-between ${isMobile ? 'mb-2' : 'mb-4'}`}>
//               <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} rounded-2xl bg-[#FFB800]/20 flex items-center justify-center`}>
//                 <TrendingDown className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-[#FFB800]`} />
//               </div>
//             </div>
//             <h3 className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm'} mb-1`}>
//               {isMobile ? 'Depreciation' : 'Total Depreciation'}
//             </h3>
//             <p className={`${isMobile ? 'text-lg' : 'text-3xl'} font-bold text-white`}>
//               {isMobile ? formatCurrency(totalDepreciation).replace(/,000$/, 'k').replace('.00', '') : formatCurrency(totalDepreciation)}
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className={`bg-gradient-to-br from-[#00FF88]/10 to-transparent backdrop-blur-xl border border-[#00FF88]/20 rounded-3xl ${isMobile ? 'p-3' : 'p-6'}`}
//           >
//             <div className={`flex items-center justify-between ${isMobile ? 'mb-2' : 'mb-4'}`}>
//               <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} rounded-2xl bg-[#00FF88]/20 flex items-center justify-center`}>
//                 <Shield className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-[#00FF88]`} />
//               </div>
//             </div>
//             <h3 className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm'} mb-1`}>
//               {isMobile ? 'Warranties' : 'Active Warranties'}
//             </h3>
//             <p className={`${isMobile ? 'text-lg' : 'text-3xl'} font-bold text-white`}>{activeWarranties}</p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className={`bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-xl border border-purple-500/20 rounded-3xl ${isMobile ? 'p-3' : 'p-6'}`}
//           >
//             <div className={`flex items-center justify-between ${isMobile ? 'mb-2' : 'mb-4'}`}>
//               <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} rounded-2xl bg-purple-500/20 flex items-center justify-center`}>
//                 <TrendingUp className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-purple-400`} />
//               </div>
//             </div>
//             <h3 className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm'} mb-1`}>Total Assets</h3>
//             <p className={`${isMobile ? 'text-lg' : 'text-3xl'} font-bold text-white`}>{assets.length}</p>
//           </motion.div>
//         </div>

//         {/* Charts */}
//         <div className={`grid grid-cols-1 ${!isMobile && 'lg:grid-cols-2'} ${isMobile ? 'gap-3' : 'gap-6'}`}>
//           {/* Category Distribution */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl ${isMobile ? 'p-4' : 'p-6'}`}
//           >
//             <h2 className={`${isMobile ? 'text-base' : 'text-xl'} font-bold text-white mb-6`}>
//               Value by Category
//             </h2>
//             {categoryData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
//                 <PieChart>
//                   <Pie
//                     data={categoryData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={isMobile ? false : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     outerRadius={isMobile ? 70 : 100}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {categoryData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: 'rgba(18, 18, 18, 0.95)',
//                       border: '1px solid rgba(255,255,255,0.1)',
//                       borderRadius: '12px',
//                       color: 'white',
//                       fontSize: isMobile ? '12px' : '14px',
//                     }}
//                     formatter={(value: number) => formatCurrency(value)}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className={`${isMobile ? 'h-[200px]' : 'h-[300px]'} flex items-center justify-center text-white/50`}>
//                 No data available
//               </div>
//             )}
//           </motion.div>

//           {/* Asset Value Comparison */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl ${isMobile ? 'p-4' : 'p-6'}`}
//           >
//             <h2 className={`${isMobile ? 'text-base' : 'text-xl'} font-bold text-white mb-6`}>
//               Purchase vs Current Value
//             </h2>
//             {assetValueData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
//                 <BarChart data={assetValueData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
//                   <XAxis 
//                     dataKey="name" 
//                     stroke="rgba(255,255,255,0.5)" 
//                     fontSize={isMobile ? 10 : 12}
//                     tick={{ fill: 'rgba(255,255,255,0.5)' }}
//                   />
//                   <YAxis 
//                     stroke="rgba(255,255,255,0.5)" 
//                     fontSize={isMobile ? 10 : 12}
//                     tick={{ fill: 'rgba(255,255,255,0.5)' }}
//                     tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: 'rgba(18, 18, 18, 0.95)',
//                       border: '1px solid rgba(255,255,255,0.1)',
//                       borderRadius: '12px',
//                       color: 'white',
//                       fontSize: isMobile ? '12px' : '14px',
//                     }}
//                     formatter={(value: number) => formatCurrency(value)}
//                   />
//                   {!isMobile && (
//                     <Legend 
//                       wrapperStyle={{ color: 'white' }}
//                       iconType="circle"
//                     />
//                   )}
//                   <Bar dataKey="purchased" fill="#FFB800" name="Purchase Cost" radius={[8, 8, 0, 0]} />
//                   <Bar dataKey="current" fill="#00E5FF" name="Current Value" radius={[8, 8, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className={`${isMobile ? 'h-[200px]' : 'h-[300px]'} flex items-center justify-center text-white/50`}>
//                 No data available
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Shield, DollarSign } from 'lucide-react';
import { Asset } from '../types/asset';
import { calculateCurrentValue, formatCurrency, calculateWarrantyHealth } from '../utils/calculations';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useBreakpoint } from '../hooks/useBreakpoint';

export function Analytics() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';

  const padding = isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-8';

  // --- FETCH REAL DATA FROM BACKEND ---
  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch("http://localhost:5000/api/assets", {
          headers: { "x-auth-token": token || "" }
        });
        if (response.ok) {
          const data = await response.json();
          setAssets(data);
        }
      } catch (err) {
        console.error("Analytics fetch failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  // --- SANITIZED CALCULATIONS ---
  // We perform these on every render to ensure the "Current Value" is always fresh
  let totalCurrentValue = 0;
  let totalPurchaseCost = 0;
  let activeWarrantiesCount = 0;

  const categoryMap: Record<string, number> = {};
  
  const processedAssets = assets.map((asset: any) => {
    const pCost = Number(asset.purchaseCost) || 0;
    const pDate = new Date(asset.purchaseDate);
    const dRate = Number(asset.depreciationRate) || 20;

    const cValue = calculateCurrentValue(pCost, pDate, dRate);
    const health = calculateWarrantyHealth(asset.warranties || []);
    
    // Accumulate Totals
    totalCurrentValue += cValue;
    totalPurchaseCost += pCost;
    activeWarrantiesCount += (asset.warranties || []).filter((w: any) => w.status === 'active').length;

    // Group for Pie Chart
    const cat = asset.category || 'Other';
    categoryMap[cat] = (categoryMap[cat] || 0) + cValue;

    return {
      name: asset.name,
      purchased: pCost,
      current: cValue,
      category: cat
    };
  });

  const totalDepreciation = totalPurchaseCost - totalCurrentValue;

  // Format data for Pie Chart
  const categoryData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  // Format data for Bar Chart (Limited to top 6 for UI clarity)
  const assetValueData = processedAssets.slice(0, 6).map(a => ({
    name: a.name.length > 12 ? a.name.substring(0, 10) + '..' : a.name,
    purchased: a.purchased,
    current: a.current,
  }));

  const COLORS = ['#00E5FF', '#00FF88', '#FFB800', '#FF4444', '#9C27B0', '#FF6B9D'];

  if (isLoading) {
    return <div className="p-8 text-white animate-pulse">Analyzing Vault Data...</div>;
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
            Analytics
          </h1>
          {!isMobile && (
            <p className="text-white/60">Insights and trends across your asset portfolio</p>
          )}
        </motion.div>

        {/* KPI Cards */}
        <div className={`grid ${
          isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        } ${isMobile ? 'gap-2 mb-4' : 'gap-6 mb-8'}`}>
          
          <KPICard 
            title="Total Value" 
            value={totalCurrentValue} 
            icon={DollarSign} 
            color="#00E5FF" 
            delay={0.1} 
            isMobile={isMobile}
          />

          <KPICard 
            title={isMobile ? "Depreciation" : "Total Depreciation"} 
            value={totalDepreciation} 
            icon={TrendingDown} 
            color="#FFB800" 
            delay={0.2} 
            isMobile={isMobile}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#00FF88]/10 to-transparent backdrop-blur-xl border border-[#00FF88]/20 rounded-3xl p-6"
          >
            <Shield className="w-6 h-6 text-[#00FF88] mb-4" />
            <h3 className="text-white/60 text-sm mb-1">Active Warranties</h3>
            <p className="text-3xl font-bold text-white">{activeWarrantiesCount}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6"
          >
            <TrendingUp className="w-6 h-6 text-purple-400 mb-4" />
            <h3 className="text-white/60 text-sm mb-1">Total Assets</h3>
            <p className="text-3xl font-bold text-white">{assets.length}</p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className={`grid grid-cols-1 ${!isMobile && 'lg:grid-cols-2'} ${isMobile ? 'gap-3' : 'gap-6'}`}>
          
          {/* Pie Chart */}
          <motion.div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Value by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%" cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', border: 'none', borderRadius: '12px', color: 'white' }}
                  formatter={(value: any) => typeof value === 'number' ? formatCurrency(value) : value}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Purchase vs Current Value</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={assetValueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#121212', border: 'none', borderRadius: '12px' }}
                />
                <Bar dataKey="purchased" fill="#FFB800" name="Purchase" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="current" fill="#00E5FF" name="Current" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Helper component for KPI Cards
function KPICard({ title, value, icon: Icon, color, delay, isMobile }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-3xl ${isMobile ? 'p-4' : 'p-6'}`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4`} style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <h3 className="text-white/60 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">
        {formatCurrency(Math.round(value))}
      </p>
    </motion.div>
  );
}