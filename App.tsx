import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './CartContext.tsx';
import { DropProvider } from './DropContext.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import CartModal from './components/CartModal.tsx';
import Notification from './components/Notification.tsx';

// Import pages directly to resolve module loading errors
import HomePage from './components/HomePage.tsx';
import ShopPage from './components/ShopPage.tsx';
import GalleryPage from './components/GalleryPage.tsx';
import ProductDetailPage from './components/ProductDetailPage.tsx';

// --- Production-level Enhancements ---

// 1. Error Boundary to catch JS errors in components
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
          <h1 className="text-3xl font-serif font-bold text-red-600">Something went wrong.</h1>
          <p className="mt-2 text-gray-600">We've encountered a problem. Please try refreshing the page.</p>
          <button
            onClick={() => this.setState({ hasError: false }, () => window.location.reload())}
            className="btn btn-primary mt-6"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// 2. Scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};


// --- Main App Component ---

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <CartProvider>
        <DropProvider>
          <HashRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen text-[#3D3D3D] selection:bg-[#8B5E34]/30">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                </Routes>
              </main>
              <Footer />
              <CartModal />
              <Notification />
            </div>
          </HashRouter>
        </DropProvider>
      </CartProvider>
    </ErrorBoundary>
  );
};

export default App;