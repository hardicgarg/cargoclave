import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ToastNotification = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    const styles = {
      success: {
        bg: 'bg-green-50',
        border: 'border-green-500',
        text: 'text-green-900',
        icon: 'CheckCircle',
        iconColor: 'text-green-500'
      },
      error: {
        bg: 'bg-red-50',
        border: 'border-red-500',
        text: 'text-red-900',
        icon: 'XCircle',
        iconColor: 'text-red-500'
      },
      info: {
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        text: 'text-blue-900',
        icon: 'Info',
        iconColor: 'text-blue-500'
      },
      warning: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-500',
        text: 'text-yellow-900',
        icon: 'AlertTriangle',
        iconColor: 'text-yellow-500'
      }
    };

    return styles?.[type] || styles?.success;
  };

  const styles = getToastStyles();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="fixed top-4 right-4 z-[100] max-w-md"
      >
        <div
          className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border-l-4 ${styles?.bg} ${styles?.border}`}
        >
          <div className={`flex-shrink-0 ${styles?.iconColor}`}>
            <Icon name={styles?.icon} size="1.5rem" />
          </div>
          <p className={`flex-1 text-sm font-medium ${styles?.text}`}>
            {message}
          </p>
          <button
            onClick={onClose}
            className={`flex-shrink-0 p-1 hover:bg-white/50 rounded transition-colors ${styles?.iconColor}`}
          >
            <Icon name="X" size="1.125rem" />
          </button>
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 3, ease: 'linear' }}
          className={`h-1 ${styles?.border?.replace('border', 'bg')} rounded-b`}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ToastNotification;