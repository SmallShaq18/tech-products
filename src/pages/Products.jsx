import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts }     from '../hooks/useProducts';
import { useDebounce }     from '../hooks/useDebounce';
import ProductGrid         from '../components/product/ProductGrid';
import ProductFilters      from '../components/product/ProductFilters';
import Pagination          from '../components/ui/Pagination';

const Products = () => {
  const { products, categories, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery,      setSearchQuery]      = useState(searchParams.get('search')   || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy,           setSortBy]           = useState(searchParams.get('sort')     || 'rating');
  const [inStockOnly,      setInStockOnly]      = useState(searchParams.get('inStock') === 'true');
  const [priceRange,       setPriceRange]       = useState(Number(searchParams.get('maxPrice')) || 2000);
  const [currentPage,      setCurrentPage]      = useState(Number(searchParams.get('page')) || 1);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const productsPerPage = 12;

  const filteredProducts = useMemo(() => {
    let f = products;
    if (selectedCategory !== 'all')
      f = f.filter(p => p.category === selectedCategory);
    if (debouncedSearch)
      f = f.filter(p =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    if (inStockOnly) f = f.filter(p => p.stock > 0);
    f = f.filter(p => p.price <= priceRange);
    f.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':  return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name':       return a.title.localeCompare(b.title);
        default:           return (b.rating || 0) - (a.rating || 0);
      }
    });
    return f;
  }, [products, selectedCategory, debouncedSearch, inStockOnly, priceRange, sortBy]);

  const totalPages       = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex       = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const updateSearchParams = (params) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([k, v]) => {
      (v === 'all' || v === '' || v === false) ? next.delete(k) : next.set(k, v);
    });
    setSearchParams(next);
  };

  const handleCategoryChange = (c)  => { setSelectedCategory(c); setCurrentPage(1); updateSearchParams({ category: c, page: 1 }); };
  const handleSortChange     = (s)  => { setSortBy(s); updateSearchParams({ sort: s }); };
  const handleSearchChange   = (q)  => { setSearchQuery(q); setCurrentPage(1); updateSearchParams({ search: q, page: 1 }); };
  const handleInStockChange  = (v)  => { setInStockOnly(v); setCurrentPage(1); updateSearchParams({ inStock: v, page: 1 }); };
  const handlePriceChange    = (p)  => { setPriceRange(p); setCurrentPage(1); updateSearchParams({ maxPrice: p, page: 1 }); };
  const handlePageChange     = (pg) => { setCurrentPage(pg); updateSearchParams({ page: pg }); };

  return (
    <main className="th-products-page">
      <div className="container">

        {/* Page header */}
        <div className="th-products-page__header">
          <div>
            <span className="th-sec-label">Collections</span>
            <h1 className="th-sec-title mb-0">All Products</h1>
          </div>
          {!loading && (
            <span className="th-products-page__count">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Filters */}
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          inStockOnly={inStockOnly}
          onInStockChange={handleInStockChange}
          priceRange={priceRange}
          onPriceRangeChange={handlePriceChange}
        />

        {/* Results meta */}
        {!loading && filteredProducts.length > 0 && (
          <p className="th-products-page__meta">
            Showing {startIndex + 1}–{Math.min(startIndex + productsPerPage, filteredProducts.length)} of {filteredProducts.length}
          </p>
        )}

        {/* Grid */}
        
          <ProductGrid products={paginatedProducts} loading={loading} error={error} />
      
          
      

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="th-products-page__pagination">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;

