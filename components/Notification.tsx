import React from 'react';
import { useCart } from '../CartContext.tsx';
import { CheckCircleIcon } from './Icons.tsx';

const Notification: React.FC = () => {
  const { notification } = useCart();

  if (!notification) {
    return null;
  }

  return (
    <div
      className="toast-notification animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <CheckCircleIcon className="w-5 h-5 text-white flex-shrink-0" />
        <span>{notification.message}</span>
      </div>
    </div>
  );
};

export default Notification;
