import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext.tsx';
import { MenuIcon, CloseIcon, ShoppingBagIcon } from './Icons.tsx';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, toggleCart, isCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    // This effect ensures that scrolling is disabled whenever a modal or the mobile menu is open.
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup function to reset the style when the component unmounts or dependencies change.
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isCartOpen]);

  // If the hash changes (e.g., after navigating from another page), scroll to the element.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);


  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `py-2 text-xl md:text-base transition-colors duration-300 ${isActive ? 'text-[#8B5E34] font-semibold' : 'text-gray-600 hover:text-[#8B5E34]'}`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClasses} onClick={closeMenu} end>Home</NavLink>
      <NavLink to="/shop" className={navLinkClasses} onClick={closeMenu}>Shop</NavLink>
      <NavLink to="/gallery" className={navLinkClasses} onClick={closeMenu}>Gallery</NavLink>
      <Link to="/#about" onClick={(e) => handleNavClick(e, '#about')} className="text-gray-600 hover:text-[#8B5E34] py-2 text-xl md:text-base transition-colors duration-300">About</Link>
    </>
  );

  return (
    <>
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-serif font-bold text-[#3D3D3D]">Thrift by Musk</Link>
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks}
            </nav>
            <div className="flex items-center space-x-4">
               <button 
                  onClick={toggleCart} 
                  className="relative text-gray-600 hover:text-[#8B5E34] transition-colors" 
                  aria-label="Open Shopping Bag"
                  aria-haspopup="dialog"
                  aria-expanded={isCartOpen}
                  id="shopping-bag-button"
               >
                  <ShoppingBagIcon className="h-6 w-6" />
                  {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#8B5E34] text-xs font-bold text-white">
                          {cartItems.length}
                      </span>
                  )}
              </button>
              <button 
                className="md:hidden text-gray-600" 
                onClick={() => setIsMenuOpen(true)}
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu-overlay"
                aria-label="Open menu"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Full-Screen Overlay */}
      <div 
        id="mobile-menu-overlay" 
        className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-sm transition-opacity duration-300 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold text-[#3D3D3D]" onClick={closeMenu}>Thrift by Musk</Link>
          <button 
            className="text-gray-600" 
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <CloseIcon className="h-7 w-7" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
          {navLinks}
        </nav>
      </div>
    </>
  );
};

export default Header;