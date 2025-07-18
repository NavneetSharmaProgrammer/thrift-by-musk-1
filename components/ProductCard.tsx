import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types.ts';
import { useCart } from '../CartContext.tsx';
import { formatGoogleDriveLink } from '../utils.ts';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isProductInCart } = useCart();
  const isInCart = isProductInCart(product.id);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="product-card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col">
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="product-card-image-container bg-stone-100">
          {product.imageUrls[0] && (
            <img src={formatGoogleDriveLink(product.imageUrls[0], 'image')} alt={product.name} loading="lazy" className="product-card-image front" />
          )}
          {product.imageUrls[1] && (
            <img src={formatGoogleDriveLink(product.imageUrls[1], 'image')} alt={`${product.name} alternate view`} loading="lazy" className="product-card-image back opacity-0" />
          )}
        </div>
        {product.sold ? (
          <div className="sold-out-ribbon">
            <span>Sold Out</span>
          </div>
        ) : (
          !isInCart && <div className="absolute top-3 right-3 bg-white/90 text-[#8B5E34] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">Only 1 Available</div>
        )}
      </Link>
      <div className="p-6 text-center flex flex-col flex-grow">
        <div className="flex justify-center items-baseline gap-2 text-sm text-gray-500 mb-2">
            <span>{product.size}</span>
            <span className="text-gray-300">&middot;</span>
            <span>{product.brand}</span>
        </div>
        <Link to={`/product/${product.id}`} className="flex-grow">
            <h3 className="font-semibold text-lg mb-2 text-[#3D3D3D] hover:text-[#8B5E34] transition-colors">{product.name}</h3>
        </Link>
         <p className="text-xs text-gray-400 mb-3">{product.condition}</p>
        <p className="font-serif text-xl text-[#8B5E34] mb-4 mt-auto">{formattedPrice}</p>
        <div className="mt-auto">
          <button
            onClick={() => addToCart(product)}
            disabled={product.sold || isInCart}
            className="btn btn-primary w-full"
          >
            {product.sold ? 'Sold Out' : isInCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);