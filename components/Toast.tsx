import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const bgColor =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
        ? 'bg-red-500'
        : 'bg-blue-500';

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-40 animate-in fade-in slide-in-from-bottom-4 duration-300`}
    >
      {message}
    </div>
  );
}
