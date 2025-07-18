import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants.ts';
import { Product } from '../types.ts';
import { useCart } from '../CartContext.tsx';
import { useDrop } from '../DropContext.tsx';
import { ArrowLeftIcon } from './Icons.tsx';
import { formatGoogleDriveLink } from '../utils.ts';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [activeImage, setActiveImage] = useState<string>('');

  const { addToCart, isProductInCart } = useCart();
  const { isDropLive } = useDrop();

  useEffect(() => {
    const foundProduct = PRODUCTS.find(p => p.id === id);
    setProduct(foundProduct);
    if (foundProduct?.imageUrls?.length) {
      setActiveImage(foundProduct.imageUrls[0]);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20 container mx-auto px-6 animate-fade-in">
        <h2 className="text-2xl text-gray-500 font-serif">Searching our collection...</h2>
        <p className="mt-4 text-gray-500">This piece might be a ghost from the past. Or it might not exist.</p>
        <Link to="/shop" className="btn btn-primary mt-8">Back to Shop</Link>
      </div>
    );
  }

  if (product.isUpcoming && !isDropLive) {
    return (
      <div className="text-center py-20 container mx-auto px-6 animate-fade-in">
        <h2 className="text-3xl font-serif text-[#8B5E34]">It's on the way!</h2>
        <p className="mt-4 text-gray-600 text-lg max-w-md mx-auto">
          This exclusive piece is part of our upcoming drop. Keep an eye on the countdown on our homepage!
        </p>
        <Link to="/" className="btn btn-secondary mt-8">Back to Homepage</Link>
      </div>
    );
  }
  
  const isInCart = isProductInCart(product.id);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
        <div className="mb-8">
            <Link to="/shop" className="flex items-center gap-2 text-gray-500 hover:text-[#8B5E34] transition-colors w-fit font-medium">
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Back to Shop</span>
            </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Media Column */}
            <div className="space-y-4">
                <div className="main-image-container shadow-lg">
                    <img src={formatGoogleDriveLink(activeImage, 'image')} alt={product.name} />
                     {product.sold && (
                        <div className="sold-out-ribbon rounded-lg">
                            <span>Sold Out</span>
                        </div>
                    )}
                </div>

                {product.imageUrls.length > 1 && (
                  <div className="thumbnail-grid">
                    {product.imageUrls.map((img, index) => (
                        <button 
                          key={index} 
                          onClick={() => setActiveImage(img)}
                          className={`thumbnail-button ${activeImage === img ? 'active' : ''}`}
                          aria-label={`View image ${index + 1}`}
                        >
                          <img src={formatGoogleDriveLink(img, 'image')} alt={`thumbnail ${index + 1}`} />
                        </button>
                    ))}
                  </div>
                )}
                
                {product.videoUrl && (
                    <div className="aspect-video bg-stone-100 rounded-lg shadow-lg overflow-hidden mt-6">
                         <iframe
                            className="w-full h-full"
                            src={formatGoogleDriveLink(product.videoUrl, 'video')}
                            title={`Video for ${product.name}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
            
            {/* Details Column */}
            <div className="flex flex-col">
                <p className="text-sm text-gray-500">{product.category}</p>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mt-1">{product.name}</h1>
                <p className="text-4xl font-serif text-[#8B5E34] my-4">{formattedPrice}</p>
                
                <div className="border-y border-gray-200 py-4 my-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Brand</span><span className="font-medium">{product.brand}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Size</span><span className="font-medium">{product.size}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Condition</span><span className="font-medium">{product.condition}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Bust</span><span className="font-medium">{product.measurements.bust}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Length</span><span className="font-medium">{product.measurements.length}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Stock</span>
                    {product.sold 
                        ? <span className="font-medium text-red-600">Sold Out</span>
                        : <span className="font-medium text-green-700">Only 1 Available</span>
                    }
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg space-y-4 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                    <p className="text-gray-600">{product.description}</p>
                </div>
                
                <div className="mt-auto pt-8">
                   <button
                        onClick={() => addToCart(product)}
                        disabled={product.sold || isInCart}
                        className="w-full btn btn-primary text-xl text-center"
                    >
                        {product.sold ? 'Sold Out' : isInCart ? 'In Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductDetailPage;