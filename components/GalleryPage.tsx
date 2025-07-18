import React from 'react';
import { Link } from 'react-router-dom';
import { GALLERY_ITEMS } from '../constants.ts';
import { ArrowLeftIcon } from './Icons.tsx';
import { formatGoogleDriveLink } from '../utils.ts';

const GalleryPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-[#8B5E34] transition-colors w-fit font-medium">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Back to Home</span>
            </Link>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Styled by You. Loved Forever.</h1>
          <p className="text-lg text-gray-600 mt-2">Our community bringing thrifted treasures to life.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square block overflow-hidden rounded-lg shadow-lg bg-stone-100"
            >
              <img 
                  src={formatGoogleDriveLink(item.url, 'image')}
                  alt={item.caption || `Styled by a customer`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  loading="lazy"
              />
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                    <p className="text-white text-sm font-semibold truncate">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;