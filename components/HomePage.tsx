import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS, INSTAGRAM_FEED_IMAGES } from '../constants.ts';
import ProductCard from './ProductCard.tsx';
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../hooks/useIntersectionObserver.tsx';
import { useDrop } from '../DropContext.tsx';
import { 
  CheckCircleIcon, 
  SourcingIcon, 
  CleaningIcon, 
  PackagingIcon, 
  InstagramIcon,
  LeafIcon,
  RecycleIcon,
  FireIcon,
  ShieldCheckIcon,
  MapPinIcon,
  PlanetIcon,
  StyleIcon
} from './Icons.tsx';

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string, id?:string}> = ({ children, className, id }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id={id} 
      ref={ref as React.RefObject<HTMLElement>} 
      className={`${className || ''} reveal ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </section>
  );
}

// --- Countdown Hook ---
const useCountdown = (targetDate: string) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  if (countDown < 0) {
    return [0, 0, 0, 0];
  }
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};
// --- End Countdown Hook ---

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <div className="text-2xl font-bold font-serif text-[#8B5E34] animate-fade-in">The drop is live!</div>;
  }
  
  const TimeBox: React.FC<{value: number, label: string}> = ({value, label}) => (
      <div className="countdown-box bg-white/60 backdrop-blur-sm shadow-md">
          <span className="text-3xl font-bold text-[#3D3D3D]">{value.toString().padStart(2, '0')}</span>
          <span className="text-xs text-gray-600 uppercase tracking-wider">{label}</span>
      </div>
  )

  return (
    <div className="flex items-center justify-center space-x-2 md:space-x-4 mt-6">
        <TimeBox value={days} label="Days" />
        <TimeBox value={hours} label="Hours" />
        <TimeBox value={minutes} label="Minutes" />
        <TimeBox value={seconds} label="Seconds" />
    </div>
  );
};


const HomePage: React.FC = () => {
  const { launchDate, isDropLive } = useDrop();

  const owners = [
    { name: '@thatskinny.model', link: 'https://www.instagram.com/thatskinny.model/', image: 'https://picsum.photos/seed/owner1/200' },
    { name: '@beinggauravbisht', link: 'https://www.instagram.com/beinggauravbisht/', image: 'https://picsum.photos/seed/owner2/200' },
    { name: '@priyanka_bisht72200', link: 'https://www.instagram.com/priyanka_bisht72200/', image: 'https://picsum.photos/seed/owner3/200' },
  ];
  
  const featuredProducts = useMemo(() => {
    // Show products that are not sold AND (are not upcoming OR the drop is live)
    return PRODUCTS.filter(p => 
      !p.sold && (!p.isUpcoming || isDropLive)
    ).slice(0, 3);
  }, [isDropLive]);
 
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section id="home" className="h-[80vh] flex items-center justify-center text-center relative overflow-hidden bg-stone-50">
          <div className="hero-shape bg-pink-200/50 w-64 h-64 top-1/4 left-1/4" style={{ animationDelay: '0s' }}></div>
          <div className="hero-shape bg-purple-200/50 w-48 h-48 top-1/2 right-1/4" style={{ animationDelay: '4s' }}></div>
          <div className="hero-shape bg-teal-200/50 w-56 h-56 bottom-1/4 left-1/3" style={{ animationDelay: '8s' }}></div>

        <div className="bg-white/50 backdrop-blur-sm p-8 rounded-lg z-10 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-[#3D3D3D]">Thrift by Musk</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-700">Handpicked luxe pieces. Zara, Ralph Lauren & rare gems.</p>
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
        </div>
      </section>
      
      {/* Our Values Section */}
      <AnimatedSection id="values" className="bg-white py-12 -mt-16 md:-mt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <LeafIcon className="w-8 h-8 text-[#8B5E34]" />
              <span className="font-semibold text-gray-700 text-sm">Sustainable</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RecycleIcon className="w-8 h-8 text-[#8B5E34]" />
              <span className="font-semibold text-gray-700 text-sm">Pre-loved</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FireIcon className="w-8 h-8 text-[#8B5E34]" />
              <span className="font-semibold text-gray-700 text-sm">Limited Pieces</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheckIcon className="w-8 h-8 text-[#8B5E34]" />
              <span className="font-semibold text-gray-700 text-sm">Cleaned & Inspected</span>
            </div>
            <div className="flex flex-col items-center gap-2 col-span-2 md:col-span-1">
              <MapPinIcon className="w-8 h-8 text-[#8B5E34]" />
              <span className="font-semibold text-gray-700 text-sm">Ships PAN India</span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Coming Soon Section */}
      <AnimatedSection id="coming-soon" className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">A Fresh Drop is on its Way...</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          ...and it's everything your wardrobe's been waiting for. Pastels, prints & pretty details - each piece handpicked with love. The countdown has begun!
        </p>
        <CountdownTimer targetDate={launchDate} />
      </AnimatedSection>

      {/* Featured Finds Section */}
      <AnimatedSection id="featured" className="py-16 md:py-0">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold">Featured Finds</h2>
                <p className="text-lg text-gray-600 mt-2">A sneak peek of our latest curated pieces.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-8">
                  <p>Check back soon for our featured finds!</p>
                </div>
              )}
            </div>
             <div className="text-center mt-12">
                <Link to="/shop" className="btn btn-secondary">View All Treasures</Link>
            </div>
        </div>
      </AnimatedSection>

      {/* Instagram Feed Section */}
      <AnimatedSection id="instagram-feed" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Follow Our Feed</h2>
            <p className="text-lg text-gray-600 mt-2">Get daily style inspiration and drop sneak peeks on our Instagram.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
            {INSTAGRAM_FEED_IMAGES.map((item, index) => (
              <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="instagram-image-container group">
                <img src={item.imageUrl} alt={`Instagram post ${index + 1}`} loading="lazy" />
                <div className="instagram-image-overlay">
                  <InstagramIcon className="w-8 h-8 text-white" />
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="https://www.instagram.com/thriftbymusk/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Follow on Instagram
            </a>
          </div>
        </div>
      </AnimatedSection>
      
      {/* How We Curate Section */}
      <AnimatedSection id="how-we-curate" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">How We Curate Your Closet</h2>
            <p className="text-lg text-gray-600 mt-2">Our three-step process to ensure quality and style.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-pink-100/50 p-5 rounded-full mb-4">
                <SourcingIcon className="w-10 h-10 text-[#8B5E34]" />
              </div>
              <h3 className="text-xl font-semibold font-serif mb-2">1. The Hunt</h3>
              <p className="text-gray-600">We scour thrift stores and hidden gems to find unique, high-quality pieces with character and a story to tell.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100/50 p-5 rounded-full mb-4">
                <CleaningIcon className="w-10 h-10 text-[#8B5E34]" />
              </div>
              <h3 className="text-xl font-semibold font-serif mb-2">2. The Revival</h3>
              <p className="text-gray-600">Every item is lovingly cleaned, professionally steamed, and mended if needed, ensuring it's fresh and ready for you.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-teal-100/50 p-5 rounded-full mb-4">
                <PackagingIcon className="w-10 h-10 text-[#8B5E34]" />
              </div>
              <h3 className="text-xl font-semibold font-serif mb-2">3. The Delivery</h3>
              <p className="text-gray-600">Your new treasure is thoughtfully packaged and shipped, ready to begin its next chapter in your wardrobe.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Vintage Section */}
      <AnimatedSection id="why-thrifting" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Why Choose Vintage?</h2>
            <p className="text-lg text-gray-600 mt-2">Discover the beauty of giving fashion a second story.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center p-6 rounded-lg hover:bg-stone-50 transition-colors">
              <div className="bg-green-100/50 p-5 rounded-full mb-4">
                <PlanetIcon className="w-10 h-10 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold font-serif mb-2">Love Our Planet</h3>
              <p className="text-gray-600">By choosing pre-loved, you actively reduce textile waste and lessen the environmental footprint of fast fashion, one beautiful garment at a time.</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg hover:bg-stone-50 transition-colors">
              <div className="bg-blue-100/50 p-5 rounded-full mb-4">
                <RecycleIcon className="w-10 h-10 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold font-serif mb-2">Give Clothes a Second Life</h3>
              <p className="text-gray-600">Every piece you thrift contributes to a circular economy, extending the life of quality clothing and celebrating its enduring craftsmanship.</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg hover:bg-stone-50 transition-colors">
              <div className="bg-yellow-100/50 p-5 rounded-full mb-4">
                <StyleIcon className="w-10 h-10 text-yellow-700" />
              </div>
              <h3 className="text-xl font-semibold font-serif mb-2">Define Your Own Style</h3>
              <p className="text-gray-600">Escape the trend cycle and curate a wardrobe that's uniquely you. Thrifting empowers self-expression with one-of-a-kind finds.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Quality Assurance Section */}
      <AnimatedSection id="quality" className="py-16 bg-stone-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Quality Promise</h2>
          <div className="flex justify-center items-center gap-3 text-lg text-gray-600 max-w-3xl mx-auto">
            <CheckCircleIcon className="w-7 h-7 text-green-600 flex-shrink-0" />
            <p>All items are lovingly cleaned, thoroughly inspected, and carefully steamed before being shipped to their new home.</p>
          </div>
        </div>
      </AnimatedSection>

      {/* About Us Section */}
       <AnimatedSection id="about" className="py-16 md:py-0 pb-16 md:pb-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">About Us</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Founded by a team with a shared passion for sustainable fashion, Thrift by Musk is on a mission to bring you timeless style without the guilt. We believe in the magic of pre-loved clothes and the stories they hold.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                  {owners.map(owner => (
                    <a href={owner.link} key={owner.name} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                      <img src={owner.image} alt={owner.name} className="w-32 h-32 rounded-full object-cover shadow-lg mb-3 transition-transform duration-300 group-hover:scale-105" />
                      <span className="font-semibold text-gray-700 group-hover:text-[#8B5E34]">{owner.name}</span>
                    </a>
                  ))}
                </div>
            </div>
        </AnimatedSection>
    </div>
  );
};

export default HomePage;