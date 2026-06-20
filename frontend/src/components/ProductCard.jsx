const StarRating = ({ rating }) => {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= Math.round(rating) ? '' : 'empty'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart, onOpenModal, wishlist, onToggleWishlist }) => {
  const isWishlisted = wishlist.includes(product.id);
  const discount = Math.floor(Math.random() * 30) + 5;

  return (
    <div className="product-card" onClick={() => onOpenModal(product)}>
      {/* Badge */}
      <span className="card-badge">-{discount}%</span>

      {/* Image */}
      <div className="card-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label="Toggle wishlist"
        >
          {isWishlisted ? '❤️' : '♡'}
        </button>
      </div>

      {/* Body */}
      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <h3 className="card-title">{product.title}</h3>

        <div className="card-rating">
          <StarRating rating={product.rating?.rate || 0} />
          <span className="rating-text">
            {product.rating?.rate} ({product.rating?.count})
          </span>
        </div>

        <div className="card-footer">
          <span className="card-price">${product.price.toFixed(2)}</span>
          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
