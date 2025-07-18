import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../constants.ts';
import ProductCard from './ProductCard.tsx';
import { SearchIcon, FilterIcon, CloseIcon } from './Icons.tsx';
import { useDrop } from '../DropContext.tsx';

const ShopPage: React.FC = () => {
  const { isDropLive } = useDrop();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Available');
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState('All');

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);
  
  const statusFilters = ['All', 'Available', 'Sold Out'];

  const visibleProducts = useMemo(() => {
    return PRODUCTS.filter(p => !p.isUpcoming || isDropLive);
  }, [isDropLive]);

  const brands = useMemo(() => [...Array.from(new Set(visibleProducts.map(p => p.brand)))].sort(), [visibleProducts]);
  const sizes = useMemo(() => ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'].filter(size => visibleProducts.some(p => p.size === size)), [visibleProducts]);
  const conditions = useMemo(() => [...Array.from(new Set(visibleProducts.map(p => p.condition)))].sort(), [visibleProducts]);
  const priceRanges = {
      'All': [0, Infinity],
      'Under ₹1000': [0, 999],
      '₹1000 - ₹1500': [1000, 1500],
      'Over ₹1500': [1501, Infinity],
  };

  const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
      setter(prev => 
          prev.includes(value) 
          ? prev.filter(item => item !== value)
          : [...prev, value]
      );
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (statusFilter !== 'Available') count++;
    if (priceFilter !== 'All') count++;
    count += selectedBrands.length;
    count += selectedSizes.length;
    count += selectedConditions.length;
    return count;
  }, [searchQuery, statusFilter, priceFilter, selectedBrands, selectedSizes, selectedConditions]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('Available');
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedConditions([]);
    setPriceFilter('All');
  };

  const filteredProducts = useMemo(() => {
    const priceRange = priceRanges[priceFilter as keyof typeof priceRanges];

    return visibleProducts.filter(product => {
      const matchesStatus = statusFilter === 'All' || (statusFilter === 'Available' && !product.sold) || (statusFilter === 'Sold Out' && product.sold);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.size);
      const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(product.condition);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             product.brand.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesBrand && matchesSize && matchesCondition && matchesPrice && matchesSearch;
    });
  }, [searchQuery, statusFilter, selectedBrands, selectedSizes, selectedConditions, priceFilter, visibleProducts]);

  const CheckboxFilterGroup: React.FC<{title: string, options: string[], selected: string[], onChange: (value: string) => void}> = ({ title, options, selected, onChange }) => (
    <div className="py-4 border-b border-gray-200">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
        {options.map(option => (
          <label key={option} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
              className="custom-checkbox"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const FilterSidebarContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-serif">Filters</h2>
        <button onClick={clearAllFilters} className="text-sm text-[#8B5E34] hover:underline">Clear All</button>
      </div>
      <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B5E34] focus:border-[#8B5E34] transition"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
      </div>
      <div className="border-b border-gray-200 py-4">
        <h3 className="font-semibold mb-3">Availability</h3>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                statusFilter === filter
                  ? 'bg-[#3D3D3D] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <CheckboxFilterGroup title="Brand" options={brands} selected={selectedBrands} onChange={(val) => handleCheckboxChange(setSelectedBrands, val)} />
      <CheckboxFilterGroup title="Size" options={sizes} selected={selectedSizes} onChange={(val) => handleCheckboxChange(setSelectedSizes, val)} />
      <CheckboxFilterGroup title="Condition" options={conditions} selected={selectedConditions} onChange={(val) => handleCheckboxChange(setSelectedConditions, val)} />
      <div>
        <h3 className="font-semibold mb-2">Price</h3>
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#8B5E34] focus:border-[#8B5E34] transition bg-white">
            {Object.keys(priceRanges).map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold">All Finds</h1>
                <p className="text-lg text-gray-600 mt-2">Our curated collection of vintage and pre-loved treasures.</p>
            </div>
             {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
                <button onClick={() => setIsFilterOpen(true)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-semibold">
                    <FilterIcon className="w-5 h-5" />
                    Filters
                    {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
              {/* Desktop Filter Sidebar */}
              <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24 h-fit bg-gray-50/70 p-6 rounded-lg border border-gray-200">
                <FilterSidebarContent />
              </aside>

              {/* Mobile Filter Panel */}
              {isFilterOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={() => setIsFilterOpen(false)}>
                  <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setIsFilterOpen(false)} className="absolute top-4 right-4 p-2">
                        <CloseIcon className="w-6 h-6 text-gray-500" />
                    </button>
                    <FilterSidebarContent />
                  </div>
                </div>
              )}

              {/* Product Grid */}
              <main className="lg:col-span-3">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-16 flex flex-col items-center justify-center h-full bg-white rounded-lg border border-gray-200">
                        <h2 className="text-2xl font-serif text-gray-600">No Treasures Found</h2>
                        <p className="text-gray-500 mt-2 max-w-xs">Try adjusting your search or filters to find your next favorite piece.</p>
                        <button onClick={clearAllFilters} className="btn btn-secondary mt-6">Clear All Filters</button>
                    </div>
                )}
              </main>
            </div>
        </div>
    </div>
  );
};

export default ShopPage;