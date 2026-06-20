import ProductCard from './ProductCard';

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-img" />
    <div className="skeleton-body">
      <div className="skeleton-line short" />
      <div className="skeleton-line medium" />
      <div className="skeleton-line" />
      <div className="skeleton-line tall" />
    </div>
  </div>
);

const ProductGrid = ({
  products,
  loading,
  onAddToCart,
  onOpenModal,
  wishlist,
  onToggleWishlist,
  searchQuery,
  activeCategory,
}) => {
  if (loading) {
    return (
      <div className="loading-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  const categoryLabel =
    activeCategory === 'all'
      ? 'All Products'
      : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);

  return (
    <section className="products-section">
      <div className="section-header">
        <h2 className="section-title">{categoryLabel}</h2>
        <p className="results-count">
          Showing <span>{products.length}</span> product
          {products.length !== 1 ? 's' : ''}
          {searchQuery && (
            <> for &ldquo;<span>{searchQuery}</span>&rdquo;</>
          )}
        </p>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter to find what you&apos;re looking for.</p>
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpenModal={onOpenModal}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
