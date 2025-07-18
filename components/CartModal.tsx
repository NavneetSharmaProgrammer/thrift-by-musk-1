import React, { useEffect, useRef } from 'react';
import { useCart } from '../CartContext.tsx';
import { CloseIcon, ShoppingBagIcon, InstagramIcon, WhatsAppIcon } from './Icons.tsx';
import { formatGoogleDriveLink } from '../utils.ts';

const CartModal: React.FC = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, getWhatsAppMessage } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isCartOpen) return;

    const modalNode = modalRef.current;
    if (!modalNode) return;

    const previouslyFocusedElement = document.activeElement as HTMLElement;

    const focusableElements = modalNode.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the close button when the modal opens
    firstElement?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleCart();
      }
      if (event.key === 'Tab') {
        if (event.shiftKey) { // Shift+Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    modalNode.addEventListener('keydown', handleKeyDown);

    return () => {
      modalNode.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [isCartOpen, toggleCart]);

  if (!isCartOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(total);

  const whatsappLink = `https://wa.me/919760427922?text=${getWhatsAppMessage()}`;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
      onClick={toggleCart}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-heading"
    >
      <div 
        ref={modalRef} 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl transition-transform transform translate-x-0" 
        style={{ animation: 'slideIn 0.3s ease-out' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 id="cart-heading" className="text-2xl font-serif font-bold flex items-center gap-2">
            <ShoppingBagIcon className="w-6 h-6" />
            Your Bag
          </h2>
          <button ref={closeButtonRef} onClick={toggleCart} className="p-2 text-gray-500 hover:text-gray-900 transition-colors" aria-label="Close cart">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        {cartItems.length > 0 ? (
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-4 animate-fade-in" style={{animationDuration: '0.5s'}}>
                <img src={formatGoogleDriveLink(item.imageUrls[0], 'image')} alt={item.name} className="w-24 h-28 object-cover rounded-md" />
                <div className="flex-grow flex flex-col">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.brand} / {item.size}</p>
                  <p className="font-serif text-[#8B5E34] mt-1">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(item.price)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-600 hover:underline mt-auto text-left w-fit">Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-grow flex flex-col justify-center items-center text-center p-6">
            <ShoppingBagIcon className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold">Your bag is empty</h3>
            <p className="text-gray-500 mt-2">Find a treasure worth collecting!</p>
          </div>
        )}
        
        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-serif text-[#8B5E34]">{formattedTotal}</span>
            </div>
            <div className="space-y-3">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn bg-green-500 hover:bg-green-600 text-white w-full flex items-center justify-center gap-2">
                <WhatsAppIcon className="w-5 h-5"/>
                WhatsApp to Purchase
              </a>
              <a href="https://www.instagram.com/direct/t/17841446377734346/" target="_blank" rel="noopener noreferrer" className="btn bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white w-full flex items-center justify-center gap-2">
                <InstagramIcon className="w-5 h-5"/>
                DM to Purchase
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">You will be redirected to complete your purchase. Shipping will be calculated manually.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartModal;