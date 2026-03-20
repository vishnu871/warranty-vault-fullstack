import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/button';

interface DeleteAssetModalProps {
  isOpen: boolean;
  assetName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteAssetModal({ isOpen, assetName, onConfirm, onCancel }: DeleteAssetModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[30px] z-50 flex items-center justify-center p-4"
            onClick={onCancel}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: 'spring',
                damping: 25,
                stiffness: 300,
                duration: 0.3 
              }}
              className="bg-[#1E1E1E]/95 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onCancel}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>

              {/* Warning Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: 'spring',
                  delay: 0.1,
                  damping: 15,
                  stiffness: 200 
                }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/20"
              >
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-[#F5F5F5] text-center mb-3"
              >
                Permanently remove this asset?
              </motion.h2>

              {/* Asset Name */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4"
              >
                <p className="text-[#00E5FF] font-semibold text-center truncate">
                  {assetName}
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#B0B0B0] text-center mb-8"
              >
                This action cannot be undone. All warranty information and maintenance history will be permanently deleted.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex gap-3"
              >
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 h-12 border-white/10 text-[#F5F5F5] hover:bg-white/5 rounded-2xl transition-all duration-300"
                >
                  Keep Asset
                </Button>
                <Button
                  onClick={onConfirm}
                  className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl shadow-lg shadow-red-500/30 transition-all duration-300 hover:shadow-red-500/50 hover:scale-[1.02]"
                >
                  Delete Forever
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
