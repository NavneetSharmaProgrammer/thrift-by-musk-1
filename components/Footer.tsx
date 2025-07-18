
import React from 'react';
import { InstagramIcon, UserIcon, WhatsAppIcon } from './Icons.tsx';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3D3D3D] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-serif font-bold mb-2">Thrift by Musk</h3>
            <p className="text-gray-400">Handpicked luxe pieces. Timeless style, guilt-free fashion.</p>
          </div>
          
          {/* Column 2: Navigate */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg mb-3">Navigate</h4>
            <div className="space-y-2 text-gray-300">
                <Link to="/shop" className="block hover:text-white transition-colors">Shop</Link>
                <Link to="/gallery" className="block hover:text-white transition-colors">Styling Gallery</Link>
                <Link to="/#about" className="block hover:text-white transition-colors">About Us</Link>
                <Link to="/#quality" className="block hover:text-white transition-colors">Our Promise</Link>
            </div>
          </div>

          {/* Column 3: Contact & Info */}
           <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-lg mb-3">Connect & Info</h4>
            <div className="space-y-3 text-gray-300">
               <p className="text-gray-400">DM to shop on Instagram*</p>
               <p className="text-gray-400">Ships PAN India</p>
               <div className="flex justify-center md:justify-start space-x-4 pt-2">
                <a href="https://www.instagram.com/thriftbymusk/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors" aria-label="Thrift by Musk Instagram">
                  <InstagramIcon className="h-6 w-6" />
                </a>
                <a href="https://wa.me/919760427922" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors" aria-label="WhatsApp">
                    <WhatsAppIcon className="h-6 w-6" />
                </a>
              </div>
              <div className="flex justify-center md:justify-start space-x-4 pt-2">
                 <a href="https://www.instagram.com/thatskinny.model/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                    <UserIcon className="h-5 w-5" />
                    <span className="text-sm">@thatskinny.model</span>
                </a>
              </div>
              <div className="flex justify-center md:justify-start space-x-4">
                 <a href="https://www.instagram.com/beinggauravbisht/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                    <UserIcon className="h-5 w-5" />
                    <span className="text-sm">@beinggauravbisht</span>
                </a>
              </div>
              <div className="flex justify-center md:justify-start space-x-4">
                 <a href="https://www.instagram.com/priyanka_bisht72200/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                    <UserIcon className="h-5 w-5" />
                    <span className="text-sm">@priyanka_bisht72200</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Thrift by Musk. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;