export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  videoUrl?: string;
  category: string;
  brand: string;
  size: string;
  measurements: {
    bust: string;
    length: string;
  };
  condition: string;
  sold: boolean;
  isUpcoming?: boolean;
}

export interface CartItem extends Product {}

export interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  notification: { message: string } | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleCart: () => void;
  isProductInCart: (productId: string) => boolean;
  getWhatsAppMessage: () => string;
}

export interface GalleryItem {
  id: string;
  url: string; // Google Drive link to the image file
  caption?: string; // Optional caption
}