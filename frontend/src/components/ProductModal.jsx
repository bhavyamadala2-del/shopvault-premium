const StarRating = ({ rating }) => (
  <div className="stars">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`star ${s <= Math.round(rating) ? '' : 'empty'}`}>★</span>
    ))}
  </div>
);

const ProductModal = ({ product, onClose, onAddToCart, wishlist, onToggleWishlist }) => {
  if (!product) return null;
  const isWishlisted = wishlist.includes(product.id);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Image panel */}
        <div className="modal-image-panel">
          <img src={product.image} alt={product.title} />
        </div>

        {/* Content panel */}
        <div className="modal-content">
          <p className="modal-category">{product.category}</p>
          <h2 className="modal-title">{product.title}</h2>

          <div className="modal-rating">
            <StarRating rating={product.rating?.rate || 0} />
            <span className="modal-rating-count">
              {product.rating?.rate} out of 5 &nbsp;·&nbsp; {product.rating?.count} reviews
            </span>
          </div>

          <p className="modal-price">${product.price.toFixed(2)}</p>

          <hr className="modal-divider" />

          <p className="modal-description">{product.description}</p>

          <div className="modal-actions">
            <button
              className="modal-add-btn"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
            >
              🛒 Add to Cart
            </button>
            <button
              className={`modal-wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => onToggleWishlist(product.id)}
              aria-label="Toggle wishlist"
            >
              {isWishlisted ? '❤️' : '♡'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
